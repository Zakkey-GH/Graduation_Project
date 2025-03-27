"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export default function BabypooCameraPage() {
const videoRef = useRef<HTMLVideoElement>(null);
const [capturedImage, setCapturedImage] = useState<string | null>(null);
const [stream, setStream] = useState<MediaStream | null>(null);
const frameRef = useRef<HTMLDivElement>(null);
const [apiResponse, setApiResponse] = useState<{
  message: string;
  result?: string;
  avgColor?: number[];
} | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [selectedFile, setSelectedFile] = useState<File | null>(null);

// カメラの初期設定
useEffect(() => {
    let mounted = true;

    const initCamera = async () => {
    try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (mounted && videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        }
    } catch (error) {
        console.error('カメラの起動エラー:', error);
    }
    };

    initCamera();

    return () => {
    mounted = false;
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

// ファイル選択処理
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setSelectedFile(e.target.files[0]);
    }
};

// 選択したファイルをAPIに送信する関数
const handleFileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    try {
        const formData = new FormData();
        formData.append('image', selectedFile);

        const response = await fetch('/api/measureDistanceColors', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('APIリクエストに失敗しました');
        }

        const data = await response.json();
        setApiResponse(data);
    } catch (error) {
        console.error('エラー:', error);
        setApiResponse({ message: 'エラーが発生しました' });
    } finally {
        setIsLoading(false);
    }
};

// 画像をAPIに送信する関数です
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!capturedImage) return;

    setIsLoading(true);
    try {
    // Base64形式の画像データからバイナリデータを作成
    const imageData = capturedImage.split(',')[1];
    const binaryData = atob(imageData);
    const bytes = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
        bytes[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'image/png' });

    // FormDataの作成
    const formData = new FormData();
    formData.append('image', blob, 'capture.png');

    const response = await fetch('/api/measureDistanceColors', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('APIリクエストに失敗しました');
    }

    const data = await response.json();
    setApiResponse(data);  // 完全なレスポンスオブジェクトを保存
    } catch (error) {
    console.error('エラー:', error);
    setApiResponse({ message: 'エラーが発生しました' });
    } finally {
    setIsLoading(false);
    }
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
            <div className="w-full aspect-video">
                <img
                src={capturedImage}
                alt="撮影した画像"
                className="w-full h-full object-cover rounded-lg"
                />
            </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Input
                type="file"
                accept="image/*"
                id="file-upload"
                onChange={handleFileChange}
                className="hidden"
                />
                <Button
                onClick={() => document.getElementById('file-upload')?.click()}
                type="button"
                variant="outline"
                className="w-full"
                >
                ファイルから選択
                </Button>
            </div>
            <Textarea
                placeholder="キャプションを入力"
                className="min-h-[100px]"
            />
            <div className="flex gap-4">
                <Button 
                type="button" 
                className="flex-1"
                onClick={handleSubmit}
                disabled={isLoading || !capturedImage}
                >
                {isLoading ? '送信中...' : '撮影した画像を投稿'}
                </Button>
                <Button 
                type="button" 
                className="flex-1"
                onClick={handleFileSubmit}
                disabled={isLoading || !selectedFile}
                >
                {isLoading ? '送信中...' : '選択したファイルを投稿'}
                </Button>
                <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                    setCapturedImage(null);
                    setSelectedFile(null);
                }}
                >
                キャンセル
                </Button>
            </div>
            </form>

            {apiResponse && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg space-y-2">
                <p className="text-sm">{apiResponse.message}</p>
                
                {apiResponse.result && (
                    <>
                        <p className="text-sm font-medium">{apiResponse.result}</p>
                        {apiResponse.result.startsWith("Value:") && (
                            <>
                                {(() => {
                                    const value = parseInt(apiResponse.result.split(":")[1].trim(), 10);
                                    let advice = '';
                                    console.log(value);
                                    console.log("テスト");
                                    if (value >= 1 && value <= 3) {
                                        advice = '１日も早く便を持参して、小児科を受診してください。';
                                    } else if (value === 4) {
                                        advice = '今後の変化に注視してください。';
                                    } else if (value >= 5 && value <= 7) {
                                        advice = '胆道閉鎖症の可能性は低いですがチェックを続けてください。';
                                    }

                                    return <p className="text-sm">{`babyの便は${value}番に近い色です。${advice}`}</p>;
                                })()}
                            </>
                        )}
                        {apiResponse.result === "out of range" && (
                            <p className="text-sm">便色カードから離れた色が検出されました。必要に応じて小児科を受診してください。</p>
                        )}
                    </>
                )}
                {apiResponse.avgColor && (
                <div className="flex items-center gap-2">
                    <div 
                    className="w-8 h-8 rounded-full border"
                    style={{
                        backgroundColor: `rgb(${apiResponse.avgColor[0]}, ${apiResponse.avgColor[1]}, ${apiResponse.avgColor[2]})`
                    }}
                    />
                    <p className="text-sm">AIが認識した色: RGB({Math.round(apiResponse.avgColor[0])}, {Math.round(apiResponse.avgColor[1])}, {Math.round(apiResponse.avgColor[2])})</p>
                </div>
                )}
            </div>
            )}
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
