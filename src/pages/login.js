import React, { useState } from "react";
//import { IoArrowForward } from "react-icons/io5";
//import "./Login.css"; // For additional styling

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const submit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password, email})
            })
            if(!response.ok) throw new Error("Invalid Credentials");
            const token = await response.json()
            localStorage.setItem("auth")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="background">
            <div className="login-box">
                <form onSubmit={submit}>
                {isLogin ? <h1>Endless Dish Login</h1> : <h1>Endless Dish Signup</h1>}

                <input
                    className="login-input"
                    id="username"
                    placeholder="Username"
                    type="text"
                    aria-label="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                {!isLogin && (
                    <>
                    <input
                        className="login-input"
                        id="email"
                        placeholder="Email (optional)"
                        type="text"
                        aria-label="Email (optional)"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    </>
                )}
                <input
                    className="login-input"
                    id="password"
                    placeholder="Password"
                    type="password"
                    aria-label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button id="login-button" className="login-button" type="submit">
                    {isLogin ? "Login" : "Sign Up"}
                </button>
                <button
                    id="toggle-form-button"
                    className="toggle-form-button"
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? "But I want to sign up!" : "But I want to log in!"} 
                </button>
                </form>
            </div>
            </div>
    )
}

//<IoArrowForward />