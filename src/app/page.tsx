import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/home'); // ホームディレクトリに遷移
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">PeLeChe へようこそ</h1>
      <p className="text-lg text-gray-600 text-center">
        お子様の成長記録をサポートするアプリケーションです
      </p>
      <Button onClick={handleStart} className="mt-4">
        はじめる
      </Button>
    </div>
  );
}