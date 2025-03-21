import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const image = formData.get('image') as File;
        
        if (!image) {
            return NextResponse.json(
                { error: '画像が見つかりません' },
                { status: 400 }
            );
        }

        const supabase = createRouteHandlerClient({ cookies });
        
        // Supabaseのストレージにアップロード
        const { data, error } = await supabase.storage
            .from('babypoo-images')
            .upload(`uploads/${Date.now()}-${image.name}`, image, {
                contentType: image.type,
                upsert: false
            });

        if (error) {
            console.error('Supabaseアップロードエラー:', error);
            return NextResponse.json(
                { error: 'アップロードに失敗しました' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: '画像が正常にアップロードされました',
            path: data.path
        });

    } catch (error) {
        console.error('エラー:', error);
        return NextResponse.json(
            { error: '予期せぬエラーが発生しました' },
            { status: 500 }
        );
    }
} 