export const fetchStats = async () => {
  const res = await fetch(
    "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
  );

  const data = await res.json();

  return {
    raw: data,
    priceUSD: parseFloat(data.price),
  };
};
