import fetch from "node-fetch";

export default async function handler(req, res) {
  console.log("🔍 Запрос получен на /api/tokens");

  try {
    const response = await fetch("https://public-api.birdeye.so/defi/tokenlist?limit=500", {
      headers: {
        "X-API-KEY": "52985c7bd4aa4dc192419306c1caffde"
      }
    });

    console.log("📡 Ответ от Birdeye:", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.log("❌ Ответ с ошибкой:", text);
      return res.status(500).json({ error: "Birdeye API error", status: response.status, body: text });
    }

    const data = await response.json();
    console.log("✅ Успешный ответ, количество токенов:", data?.data?.tokens?.length);

    res.status(200).json(data);
  } catch (error) {
    console.error("💥 Ошибка на сервере:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
