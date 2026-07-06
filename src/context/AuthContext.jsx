import React, { useState } from 'react'
import { createContext, useContext } from "react";

const AuthContext = createContext(null)

function AuthProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem("currentLoggedInUser") ? { email: localStorage.getItem("currentLoggedInUser") } : null)
    
    function signUp(email, password) {
        const users = JSON.parse(localStorage.getItem("users")) || []
        const newUser = { email, password }
       if(users.find((user)=> user.email === email)){
        return {success:false,error:"Email already exists"}
       }
        users.push(newUser)
        localStorage.setItem("users", JSON.stringify(users))
        localStorage.setItem("currentLoggedInUser", email)
        setUser({ email })
        return { success: true }
    }
    function login(email, password) {
        const users = JSON.parse(localStorage.getItem("users")) || []
        const user = JSON.parse(localStorage.getItem("users")).find((user) => {
            return user.email === email && user.password === password
        })
        if(!user){
            return { success :false ,error:" Invalid email or password "}
        }
        localStorage.setItem("currentLoggedInUser", email)
        setUser({ email })
        return { success :true }
    }
    function logout() {
        localStorage.removeItem("currentLoggedInUser")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, signUp, logout,login }}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider

export function useAuth(){
    const context = useContext(AuthContext)
    return context
}