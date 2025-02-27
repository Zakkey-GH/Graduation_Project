"use client"; 

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function SignUp() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");

const handleSignUp = async () => {
    try {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        setMessage(`Error: ${error.message}`);
        console.error('Signup error:', error);
    } else {
        setMessage(`User signed up: ${data.user?.email}`);
    }
    } catch (e) {
    console.error('Unexpected error:', e);
    setMessage('サインアップ中に予期せぬエラーが発生しました。');
    }
};

return (
    <div style={{ padding: 20 }}>
    <h1>Sign Up</h1>
    <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
    />
    <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
    />
    <button onClick={handleSignUp}>Sign Up</button>
    <p>{message}</p>
    </div>
);
}
