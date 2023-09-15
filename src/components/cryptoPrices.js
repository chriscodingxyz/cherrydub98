const fetchBitcoinPrice = async () => {
  const response = await fetch(
    "https://api.coindesk.com/v1/bpi/currentprice.json"
  );
  const data = await response.json();
  return data.bpi.USD.rate_float.toFixed(0);
};

const fetchEthereumPrice = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  );
  const data = await response.json();
  return data.ethereum.usd.toFixed(0);
};

export { fetchBitcoinPrice, fetchEthereumPrice };
