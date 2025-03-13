# lambda_function.py
import json
import base64

def lambda_handler(event, context):
    try:
        content_type = event['headers']['content-type']
        body = base64.b64decode(event['body'])

        if 'multipart/form-data' in content_type:
            boundary = content_type.split('boundary=')[1]
            parts = body.split(bytes('--' + boundary, 'utf-8'))
            for part in parts:
                if b'Content-Disposition: form-data; name="image"' in part:
                    # 画像データが存在することを確認
                    if part.split(b'\r\n\r\n')[1].rsplit(b'\r\n', 1)[0]:
                        return {
                            'statusCode': 200,
                            'body': json.dumps({'message': '画像を受け取りました'})
                        }
        else:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': '無効なコンテンツタイプです'})
            }

        return {
            'statusCode': 400,
            'body': json.dumps({'message': '画像データが見つかりませんでした'})
        }

    except Exception as e:
        print(f'エラーが発生しました: {e}')
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'サーバーエラー'})
        }