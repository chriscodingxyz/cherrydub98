import React from "react";

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

export default function CryptoList({ coins }) {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex justify-between bg-gray-200 p-1">
        <div className="flex items-center space-x-2">
          <div>#</div>
          <div className="hidden">Logo</div>
          <div>Symbol</div>
        </div>
        <div>Price</div>
        <div>Market Cap</div>
      </div>
      {coins.map((coin, index) => (
        <div
          key={coin.id}
          className="flex items-center justify-between border rounded-md shadow-md p-1"
        >
          <div className="flex items-center space-x-2">
            <div className="text-gray-600">{index + 1}</div>
            <img
              src={coin.image}
              alt={coin.name}
              className="w-4 h-4 rounded-full"
            />
            <span className="text-md ">{coin.symbol}</span>
          </div>

          <div className="text-md text-left ">
            $
            {coin.current_price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>

          <div className="text-md text-left">
            {abbreviateNumber(coin.market_cap)}
          </div>
        </div>
      ))}
    </div>
  );
}
