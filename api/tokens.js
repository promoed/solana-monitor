export default async function handler(req, res) {
  try {
    const response = await fetch("https://price.jup.ag/v4/price?ids=ALL");
    const data = await response.json();
    res.status(200).json({ data: data.data });
  } catch (error) {
    console.error("Ошибка прокси:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}