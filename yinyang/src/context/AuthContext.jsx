import {createContext, useContext, useState} from "react";
const AuthContext = createContext();

export function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const login = (email, password) =>{
        const clone = {email};
        localStorage.setItem("user",JSON.stringify(clone));
        setUser(clone);
    };
    const signup = (email, password) =>{
        const clone = {email};
        localStorage.setItem("user",JSON.stringify(clone));
        setUser(clone);
    };
    const logout = () =>{
        localStorage.removeItem("user");
        setUser(null);
    };
    return(
        <AuthContext.Provider value={{user, login, signup, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth(){
    return useContext(AuthContext);
}
