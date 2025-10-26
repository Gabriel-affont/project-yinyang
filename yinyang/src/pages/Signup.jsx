import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError("");



        const newUser = {
            name: form.name,
            email: form.email,
        };

        localStorage.setItem("user", JSON.stringify(newUser));
        login(form.email);
        navigate("/");
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
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mt-1"
                        required
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
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Sign Up
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
