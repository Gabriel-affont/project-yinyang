import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";

export default function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        location: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (form.password !== form.confirmPassword) {
        setError("Passwords do not match");
        return;
    }
    
    if (form.password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
    }

    setError("");
    setLoading(true);

    try {
        // Step 1: Register the user - FIXED: Use PasswordHash instead of password
        const registerResponse = await api.post("/Users", {
            name: form.name,
            email: form.email,
            PasswordHash: form.password, // CHANGED: Match backend property name
           Location: form.location
        });
        
        console.log("User created:", registerResponse.data);

        // Step 2: Automatically log the user in after successful registration
        const loginResponse = await api.post("/users/login", {
            email: form.email,
            password: form.password
        });

        // Store token and user data
        localStorage.setItem("token", loginResponse.data.token);
        localStorage.setItem("user", JSON.stringify(loginResponse.data.user));
        
        login(form.email);
        alert("Signup successful!");
        navigate("/");
        
    } catch (error) {
        console.error("Signup error:", error);
        if (error.response?.status === 409) {
            setError("User with this email already exists");
        } else if (error.response?.data) {
            setError(error.response.data);
        } else {
            setError("Signup failed. Please try again.");
        }
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="max-w-sm mx-auto mt-12 p-6 border rounded shadow bg-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                    Full Name:
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mt-1"
                        required
                    />
                </label>

                <label className="block">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mt-1"
                        required
                    />
                </label>
                <label className="block">
                    Loocation:
                    <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mt-1"
                    required
                    placeholder="Enter your city or region"/>
                </label>

                <label className="block">
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mt-1"
                        required
                        minLength={6}
                    />
                </label>
                
                <label className="block">
                    Confirm Password:
                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mt-1"
                        required
                    />
                </label>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
                >
                    {loading ? "Creating Account..." : "Sign Up"}
                </button>
            </form>

            <p className="text-center text-sm mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                    Log in
                </Link>
            </p>
        </div>
    );
}