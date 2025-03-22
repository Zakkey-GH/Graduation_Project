# lambda_function.py
import json
import base64

def lambda_handler(event, context):
    try:
        # リクエストヘッダーからContent-Typeを取得
        content_type = event['headers']['content-type']
        # Base64でエンコードされたリクエストボディをデコード
        body = base64.b64decode(event['body'])

        # マルチパートフォームデータの場合の処理
        if 'multipart/form-data' in content_type:
            # Content-Typeからバウンダリー文字列を抽出
            boundary = content_type.split('boundary=')[1]
            # バウンダリーで区切られたパートに分割
            parts = body.split(bytes('--' + boundary, 'utf-8'))
            
            # 各パートを処理
            for part in parts:
                # 'image'という名前のフォームフィールドを探す
                if b'Content-Disposition: form-data; name="image"' in part:
                    # パートから実際の画像データを抽出し、存在確認
                    if part.split(b'\r\n\r\n')[1].rsplit(b'\r\n', 1)[0]:
                        # 画像データが存在する場合は成功レスポンスを返す
                        return {
                            'statusCode': 200,
                            'body': json.dumps({'message': '画像を受け取りました'})
                        }
        else:
            # Content-Typeがmultipart/form-dataでない場合はエラー
            return {
                'statusCode': 400,
                'body': json.dumps({'message': '無効なコンテンツタイプです'})
            }

        # 画像データが見つからなかった場合のエラー
        return {
            'statusCode': 400,
            'body': json.dumps({'message': '画像データが見つかりませんでした'})
        }

    except Exception as e:
        # 予期せぬエラーが発生した場合のエラーハンドリング
        print(f'エラーが発生しました: {e}')
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'サーバーエラー'})
        }