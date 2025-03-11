import cv2
import numpy as np
import sys
import json


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
        dist = np.linalg.norm(color - entry["color"])  # ユークリッド距離を計算
        if dist < min_distance:
            min_distance = dist
            closest = entry
    return closest, min_distance


# 画像ファイルのアップロード
image_path  = "./public/images/Ben_3.png" #input("画像ファイルのパスを入力してください: ")
def lambda_handler(event, context):
    try:
        # リクエストボディからJSONデータを取得
        body = json.loads(event["body"]) if "body" in event else {}
        
        # フロントエンドから送られてきたデータを取得
        received_path = body.get("path", image_path)
        
        # 画像処理のロジックをここに移動
        image = cv2.imread(received_path)
        result_text = ""
        
        if image is None:
            result_text = "画像を読み込めませんでした。ファイルパスを確認してください。"
        else:
            # フレームの中心部分を対象領域として抽出
            h, w, _ = image.shape
            frame_size = 100
            start_x, start_y = w // 2 - frame_size // 2, h // 2 - frame_size // 2
            end_x, end_y = w // 2 + frame_size // 2, h // 2 + frame_size // 2
            roi = image[start_y:end_y, start_x:end_x]

            # ROIの平均色を計算
            avg_color = cv2.mean(roi)[:3]
            avg_color = np.array(avg_color[::-1])

            # データベース内で最も近い色を計算
            closest_entry, distance = find_closest_color(avg_color)

            # 結果を判定
            threshold = 50
            if distance > threshold:
                result_text = "out of range"
            else:
                result_text = f"Value: {closest_entry['value']} (distance: {distance:.2f})"

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "message": "データを受け取りました",
                "received_path": received_path,
                "result": result_text
            })
        }
    except Exception as e:
        return {
            "statusCode": 400,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "error": str(e)
            })
        }









image = cv2.imread(image_path)

if image is None:
    print("画像を読み込めませんでした。ファイルパスを確認してください。")
else:
    # フレームの中心部分を対象領域として抽出
    h, w, _ = image.shape
    frame_size = 100
    start_x, start_y = w // 2 - frame_size // 2, h // 2 - frame_size // 2
    end_x, end_y = w // 2 + frame_size // 2, h // 2 + frame_size // 2
    roi = image[start_y:end_y, start_x:end_x]

    # ROIの平均色を計算
    avg_color = cv2.mean(roi)[:3]
    avg_color = np.array(avg_color[::-1])  # OpenCVはBGRなのでRGBに変換

    # データベース内で最も近い色を計算
    closest_entry, distance = find_closest_color(avg_color)

    # 結果を判定
    threshold = 50  # 距離が大きい場合は対象範囲外。※cv2は日本語不可
    if distance > threshold:
        text = "out of range"
    else:
        text = f"Value: {closest_entry['value']} (distance: {distance:.2f})"
    print(text)
