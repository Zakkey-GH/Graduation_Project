import { NextResponse } from 'next/server';

export async function POST() {
    const response = await fetch("https://hq3d4xbkh9.execute-api.us-east-1.amazonaws.com/testPy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "山崎" }),
    });

    const data = await response.json();
    return NextResponse.json(data);
} 