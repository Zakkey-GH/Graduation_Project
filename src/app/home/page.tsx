'use client'

import { Suspense, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, History } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "../lib/supabase"

interface ActionButtonProps {
icon: React.ReactNode
label: string
onClick?: () => Promise<void>
href?: string
}

function ActionButton({ icon, label, onClick, href }: ActionButtonProps) {
const router = useRouter()

const handleClick = () => {
    if (href) router.push(href)
    if (onClick) onClick()
}

return (
    <Button 
    onClick={handleClick}
    className="flex items-center gap-2 px-6 py-3 text-lg font-medium transition-all hover:scale-105"
    variant="default"
    >
    {icon}
    <span>{label}</span>
    </Button>
)
}

export default function HomePage() {
const router = useRouter()
const searchParams = useSearchParams()
const email = searchParams.get('email') // クエリパラメータからメールアドレスを取得
const [user, setUser] = useState<any>(null)

useEffect(() => {
    // 現在のユーザー情報を取得
    const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    }

    getCurrentUser()
}, [])

// DBの操作例
const handleDatabaseOperation = async () => {
    const { data, error } = await supabase
    .from('your_table')
    .insert([
        { user_id: user?.id, /* その他のデータ */ }
    ])
}

return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <div className="container mx-auto px-4 py-12 md:py-24">
        {/* ヘッダーセクション */}
        <header className="mb-6 text-center">
            <h1 className="text-2xl font-bold">ようこそ、{email}さん！</h1>
        </header>

        {/* ヒーローセクション */}
        <section className="mb-16 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
            PeLeChe
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            お便り管理で、ベビュニケーションをもっと手軽に
        </p>
        </section>

        {/* アクションボタンセクション */}
        <section className="mx-auto max-w-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Suspense fallback={<div>Loading...</div>}>
            <ActionButton
                icon={<Mail className="h-5 w-5" />}
                label="お便りCheck!"
                href="/products/babypoo"
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
    description: "誰でも簡単にお便りCheck!",
},
{
    title: "助かる日記",
    description: "お便りの履歴を管理",
},
{
    title: "安全な管理",
    description: "ベビの大切なお便りを安全管理。",
},
] 