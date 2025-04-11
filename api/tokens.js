export default async function handler(req, res) {
  console.log("🔍 /api/tokens получен");

  try {
    const fetch = (await import("node-fetch")).default;

    const response = await fetch("https://public-api.birdeye.so/defi/tokenlist?limit=500", {
      headers: {
        "X-API-KEY": "52985c7bd4aa4dc192419306c1caffde"
      }
    });

    if (!response.ok) {
      const text = await response.text();
      console.log("❌ Ошибка от Birdeye:", text);
      return res.status(500).json({ error: "Birdeye API error", status: response.status, body: text });
    }

    const data = await response.json();
    console.log("✅ Получено токенов:", data?.data?.tokens?.length);

    res.status(200).json(data);
  } catch (error) {
    console.error("💥 Ошибка сервера:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
