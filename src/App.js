import React, { useEffect, useState } from "react";

export default function App() {
  const [tokens, setTokens] = useState([]);
  const [prevVolumes, setPrevVolumes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const VOLUME_THRESHOLD = 2.0;

  const fetchTokens = async () => {
    try {
      const response = await fetch("/api/tokens");

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const result = await response.json();
      const tokensData = result.data.tokens.map(token => {
        const prevVolume = prevVolumes[token.address] || token.volume24h;
        const currentVolume = token.volume24h;
        const volumeChange = ((currentVolume - prevVolume) / prevVolume) || 0;
        const spike = volumeChange > VOLUME_THRESHOLD;

        return {
          ...token,
          volumeChange,
          spike
        };
      });

      setTokens(tokensData);
      const updatedVolumes = {};
      tokensData.forEach(token => {
        updatedVolumes[token.address] = token.volume24h;
      });
      setPrevVolumes(updatedVolumes);
      setLoading(false);
    } catch (err) {
      console.error("Ошибка при получении токенов:", err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
    const interval = setInterval(fetchTokens, 60000);
    return () => clearInterval(interval);
  }, []);

  const sortedTokens = tokens.sort((a, b) => b.volumeChange - a.volumeChange);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Solana Volume Monitor</h1>
      {loading && <p>Загрузка данных...</p>}
      {error && <p style={{ color: 'red' }}>Ошибка при загрузке токенов. Проверь API ключ и CORS.</p>}
      {!loading && !error && tokens.length === 0 && <p>Нет токенов для отображения.</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {sortedTokens.map(token => (
          <div key={token.address} style={{
            border: token.spike ? '2px solid red' : '1px solid #ccc',
            borderRadius: '8px',
            padding: '12px'
          }}>
            <h2 style={{ marginBottom: '8px' }}>{token.name}</h2>
            {token.spike && <p style={{ color: 'red', fontWeight: 'bold' }}>🚀 Объём +{(token.volumeChange * 100).toFixed(0)}%</p>}
            <p>Цена: ${token.price?.toFixed(6)}</p>
            <p>Объём (24ч): ${Number(token.volume24h).toLocaleString()}</p>
            <p>Ликвидность: ${Number(token.liquidity).toLocaleString()}</p>
            <a href={`https://birdeye.so/token/${token.address}?chain=solana`} target="_blank" rel="noreferrer">
              Подробнее на Birdeye
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}