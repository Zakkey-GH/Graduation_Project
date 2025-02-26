import { useState } from "react";
import { supabase } from "src/app/lib/supabase";

export default function SignUp() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");

const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
    email,
    password,
    });

    if (error) {
    setMessage(`Error: ${error.message}`);
    } else {
    setMessage(`User signed up: ${data.user?.email}`);
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
