import { Suspense } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Mail, History } from "lucide-react"

interface ActionButtonProps {
  icon: React.ReactNode
  label: string
  onClick?: () => Promise<void>
}

function ActionButton({ icon, label, onClick }: ActionButtonProps) {
  return (
    <Button 
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-3 text-lg font-medium transition-all hover:scale-105"
      variant="default"
    >
      {icon}
      <span>{label}</span>
    </Button>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 md:py-24">
        {/* ヒーローセクション */}
        <section className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
            お便り管理システム
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            簡単・便利なお便り管理で、コミュニケーションをもっとスムーズに
          </p>
        </section>

        {/* アクションボタンセクション */}
        <section className="mx-auto max-w-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Suspense fallback={<div>Loading...</div>}>
              <ActionButton
                icon={<Mail className="h-5 w-5" />}
                label="お便りCheck!"
              />
              <ActionButton
                icon={<History className="h-5 w-5" />}
                label="お便り履歴"
              />
            </Suspense>
          </div>
        </section>

        {/* フィーチャーセクション */}
        <section className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl"
            >
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}

const features = [
  {
    title: "簡単操作",
    description: "直感的なインターフェースで、誰でも簡単にお便りを管理できます。",
  },
  {
    title: "リアルタイム更新",
    description: "お便りの状態をリアルタイムで確認・更新することができます。",
  },
  {
    title: "安全な管理",
    description: "セキュアな環境で大切なお便りを安全に保管します。",
  },
] 