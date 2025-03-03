export default async function handler(req, res) {
    const response = await fetch("https://hq3d4xbkh9.execute-api.us-east-1.amazonaws.com/testPy", {
        "method": "POST",
        "headers": { "Content-Type": "application/json" },
        "body": "{\"name\": \"yamazaki\"}"
        // method: "POST",
        // headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ name: "山崎" }),
    });


    const data = await response.json();
    res.status(200).json(data);
    }
