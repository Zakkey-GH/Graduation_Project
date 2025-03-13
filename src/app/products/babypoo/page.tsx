"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface CameraProps {
  width: number;
  height: number;
}

export default function BabypooCameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  // カメラの初期設定
  useEffect(() => {
    const initCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
      } catch (error) {
        console.error('カメラの起動エラー:', error);
      }
    };

    initCamera();

    // クリーンアップ関数
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // 撮影処理
  const handleCapture = () => {
    if (!videoRef.current || !frameRef.current) return;

    const canvas = document.createElement('canvas');
    const frameWidth = frameRef.current.offsetWidth;
    const frameHeight = frameRef.current.offsetHeight;
    canvas.width = frameWidth;
    canvas.height = frameHeight;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    const scale = videoRef.current.videoWidth / videoRef.current.offsetWidth;
    const frameRect = frameRef.current.getBoundingClientRect();
    const videoRect = videoRef.current.getBoundingClientRect();

    ctx.drawImage(
      videoRef.current,
      (frameRect.left - videoRect.left) * scale,
      (frameRect.top - videoRect.top) * scale,
      frameWidth * scale,
      frameHeight * scale,
      0,
      0,
      frameWidth,
      frameHeight
    );

    setCapturedImage(canvas.toDataURL('image/png'));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">カメラで撮影し、画像認識を実行</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-4">
          <div className="relative w-full aspect-video">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover rounded-lg"
            />
            <div
              ref={frameRef}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 border-2 border-white rounded-lg"
            />
          </div>
          <Button 
            onClick={handleCapture}
            className="w-full mt-4"
          >
            撮影する
          </Button>
        </Card>

        <Card className="p-4">
          <div className="space-y-4">
            {capturedImage && (
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full rounded-lg"
              />
            )}
            <form className="space-y-4">
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  id="upload"
                  className="hidden"
                />
                <Button
                  onClick={() => document.getElementById('upload')?.click()}
                  type="button"
                  variant="outline"
                  className="w-full"
                >
                  画像を選択
                </Button>
              </div>
              <Textarea
                placeholder="キャプションを入力"
                className="min-h-[100px]"
              />
              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  投稿
                </Button>
                <Button variant="outline" className="flex-1">
                  閉じる
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}



// "use client";
// import { useState } from "react";

// export default function Home() {
// const [message, setMessage] = useState("");

// // Lambda API を呼び出す関数
// const callLambdaAPI = async () => {
//     try {
//     const response = await fetch("/api/measureDistanceColors", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ path: "./public/images/Ben_4.png" }),
//     });

//     if (!response.ok) {
//         throw new Error("API エラーが発生しました");
//     }

//     const data = await response.json();
//     setMessage(data.message); // Lambda からのレスポンスをセット
//     } catch (error) {
//     console.error("エラー:", error);
//     setMessage("API リクエストに失敗しました");
//     }
// };

// return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//     <h1>AWS Lambda API 実行テスト</h1>
//     <button onClick={callLambdaAPI} style={{ padding: "10px 20px", fontSize: "16px" }}>
//         Lambda API を実行
//     </button>
//     <p>レスポンス: {message}</p>
//     </div>
// );
// }
