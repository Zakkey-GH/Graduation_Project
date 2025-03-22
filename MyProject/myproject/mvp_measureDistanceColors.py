import cv2
import numpy as np
import json
import base64

# ベクトルデータベース (カラーコードをRGB形式に変換)
database = [
    {"color": np.array([200, 200, 175]), "value": 1},
    {"color": np.array([191, 190, 135]), "value": 2},
    {"color": np.array([198, 194, 116]), "value": 3},
    {"color": np.array([207, 201, 71]), "value": 4},
    {"color": np.array([184, 159, 55]), "value": 5},
    {"color": np.array([173, 133, 61]), "value": 6},
    {"color": np.array([125, 118, 58]), "value": 7},
]

def find_closest_color(color):
    """データベース内で最も近い色を見つける"""
    closest = None
    min_distance = float('inf')
    for entry in database:
        dist = np.linalg.norm(color - entry["color"])
        if dist < min_distance:
            min_distance = dist
            closest = entry
    return closest, min_distance

def lambda_handler(event, context):
    try:
        # リクエストヘッダーからContent-Typeを取得
        content_type = event['headers']['content-type']
        # Base64でエンコードされたリクエストボディをデコード
        body = base64.b64decode(event['body'])

        if 'multipart/form-data' in content_type:
            # バウンダリー文字列を抽出
            boundary = content_type.split('boundary=')[1]
            parts = body.split(bytes('--' + boundary, 'utf-8'))
            
            image_data = None
            for part in parts:
                if b'Content-Disposition: form-data; name="image"' in part:
                    # 画像データを抽出
                    image_data = part.split(b'\r\n\r\n')[1].rsplit(b'\r\n', 1)[0]
                    if image_data:
                        # 画像データをnumpy配列に変換
                        nparr = np.frombuffer(image_data, np.uint8)
                        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                        
                        if image is None:
                            return {
                                'statusCode': 400,
                                'body': json.dumps({'message': '画像の解析に失敗しました'})
                            }

                        # フレームの中心部分を対象領域として抽出
                        h, w, _ = image.shape
                        frame_size = 100
                        start_x = w // 2 - frame_size // 2
                        start_y = h // 2 - frame_size // 2
                        end_x = w // 2 + frame_size // 2
                        end_y = h // 2 + frame_size // 2
                        roi = image[start_y:end_y, start_x:end_x]

                        # ROIの平均色を計算
                        avg_color = cv2.mean(roi)[:3]
                        avg_color = np.array(avg_color[::-1])  # BGRからRGBに変換

                        # データベース内で最も近い色を計算
                        closest_entry, distance = find_closest_color(avg_color)

                        # 結果を判定
                        threshold = 50
                        if distance > threshold:
                            result_text = "out of range"
                        else:
                            result_text = f"Value: {closest_entry['value']} (distance: {distance:.2f})"

                        return {
                            'statusCode': 200,
                            'headers': {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*'
                            },
                            'body': json.dumps({
                                'message': '画像を解析しました',
                                'result': result_text
                            })
                        }

            return {
                'statusCode': 400,
                'body': json.dumps({'message': '画像データが見つかりませんでした'})
            }
        else:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': '無効なコンテンツタイプです'})
            }

    except Exception as e:
        print(f'エラーが発生しました: {e}')
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'サーバーエラー'})
        }
