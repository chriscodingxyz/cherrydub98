import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [coins, setCoins] = useState([]);

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${displayAmount}&page=1&sparkline=false&locale=en`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setCoins(res.data);
        console.log("data:", res.data);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }, [url]);

  function currencyOnChange(e) {
    setCurrency(e.target.value);
  }

  function displayOnChange(e) {
    setDisplayAmount(e.target.value);
  }

  function sortOnChange(e) {
    setOrderSort(e.target.value);
  }

  return (
    <>
      <div className="flex">
        <div className="flex-1 text-center">
          Currency{" "}
          <select name="" id="" onChange={currencyOnChange} value={currency}>
            <option value="usd">$</option>
            <option value="gbp">£</option>
            <option value="eur">€</option>
          </select>
        </div>
        <div className="flex-1">
          Display Amount
          <select name="" id="" onChange={displayOnChange}>
            <option value="25">25</option>
            <option value="100">100</option>
            <option value="250">250</option>
          </select>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr>
            <th>#</th>
            <th className="col-span-2">Coin</th>{" "}
            {/* Use col-span-2 to span two columns */}
            <th>Price</th>
            <th>Market Cap</th>
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
                    className="w-4 h-4 rounded-full "
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
    </>
  );
}
