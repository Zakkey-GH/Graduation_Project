import json

def lambda_handler(event, context):
    # リクエストのデータを取得
    body = json.loads(event["body"]) if "body" in event else {}

    # 受け取ったデータを加工
    name = body.get("name", "Guest")
    message = f"Hello, {name}! Welcome to AWS Lambda."

    # レスポンスを返す
    return {
        "statusCode": 200,
        "body": json.dumps({"message": message}),
        "headers": {"Content-Type": "application/json"},
    }