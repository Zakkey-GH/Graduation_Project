import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const response = await fetch('https://2d1glvrmo7.execute-api.us-east-1.amazonaws.com/imagePost', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Lambda APIリクエストに失敗しました');
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('エラー:', error);
    return NextResponse.json(
      { message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
} 