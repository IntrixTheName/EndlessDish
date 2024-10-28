import React, { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import "./Login.css"; // For additional styling

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [err, setErr] = useState("")

    const submit = async (e) => {
        e.preventDefault()
        setErr("")
        
    }
}