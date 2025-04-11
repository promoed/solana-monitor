import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch("https://public-api.birdeye.so/defi/tokenlist?limit=500", {
      headers: {
        "X-API-KEY": "52985c7bd4aa4dc192419306c1caffde"
      }
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Birdeye API error" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("API Proxy Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}