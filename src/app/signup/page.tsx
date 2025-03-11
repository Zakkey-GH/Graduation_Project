"use client"; 

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
<div className="container mx-auto max-w-md py-8">
    <Card>
    <CardHeader>
        <h1 className="text-2xl font-bold text-center">アカウント作成</h1>
    </CardHeader>
    <CardContent>
        <div className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
            id="email"
            type="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
        </div>
    </CardContent>
    <CardFooter>
        <Button onClick={handleSignUp} className="w-full">
        アカウントを作成
        </Button>
    </CardFooter>
    </Card>
    {message && (
    <Alert className="mt-4">
        <AlertDescription>{message}</AlertDescription>
    </Alert>
    )}
</div>
);
}
