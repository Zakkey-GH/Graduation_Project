import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = await fetch("https://your-lambda-url.amazonaws.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Alice" }),
    });

    if (!response.ok) {
      throw new Error("API エラーが発生しました");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("エラー:", error);
    return NextResponse.json({ error: "API リクエストに失敗しました" }, { status: 500 });
  }
} 