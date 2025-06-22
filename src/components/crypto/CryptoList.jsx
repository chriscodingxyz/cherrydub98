import React, { useState } from "react";
import { useMarketData } from "../../hooks/useCrypto";

// Function to abbreviate numbers (e.g., 10K, 1M, 1.3M)
const abbreviateNumber = (value) => {
  const suffixes = ["", "K", "M", "B", "T"];
  let tier = (Math.log10(Math.abs(value)) / 3) | 0;

  if (tier === 0) return value;

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);

  const scaledValue = value / scale;

  return scaledValue.toFixed(1) + suffix;
};

const currencyObj = {
  usd: "$",
  eur: "€",
  gbp: "£",
};

export default function CryptoList() {
  const [displayAmount, setDisplayAmount] = useState(25);
  const [currency, setCurrency] = useState("usd");
  
  // Use TanStack Query hook instead of manual state management
  const { 
    data: coins = [], 
    isLoading: loading, 
    isError: error,
    isFetching,
    refetch
  } = useMarketData(currency, displayAmount, 1);

  function currencyOnChange(e) {
    setCurrency(e.target.value);
  }

  function displayOnChange(e) {
    setDisplayAmount(e.target.value);
  }


  if (error) {
    return (
      <div className="text-center p-4">
        <div className="text-sm text-gray-600 mb-2">📡 Crypto data temporarily unavailable</div>
        <button 
          onClick={() => refetch()} 
          className="text-blue-600 hover:underline text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex">
        <h4 className="text-center">Top {displayAmount} Crypto</h4>
        <div className="flex-1 text-center">
          Currency{" "}
          <select name="" id="" onChange={currencyOnChange} value={currency}>
            <option value="usd">$</option>
            <option value="gbp">£</option>
            <option value="eur">€</option>
          </select>
        </div>
        <div className="flex-1">
          Display
          <select name="" id="" onChange={displayOnChange}>
            <option value="25">25</option>
            <option value="100">100</option>
            <option value="250">250</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-4 text-gray-600">
          Loading crypto data...
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th>#</th>
              <th className="col-span-2">Coin</th>
              <th className="text-right">Price</th>
              <th className="text-right">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <tr key={coin.id}>
                <td className="border">{index + 1}</td>
                <td className="border col-span-2">
                  <div className="flex items-center space-x-2">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-4 h-4 rounded-full"
                      style={{ margin: "1px" }}
                    />
                    <span className="text-md font-bold">{coin.symbol}</span>
                  </div>
                </td>
                <td className="border text-right">
                  {coin.current_price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  <span className="font-bold">{" " + currencyObj[currency]}</span>
                </td>
                <td className="border text-right">
                  {abbreviateNumber(coin.market_cap)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
