import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ConsoleCrypto() {
  const [coins, setCoins] = useState([]);

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en`;

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

  return (
    <div>
      {coins.length ? (
        coins.map((coin, index) => (
          <div key={coin.id} className="flex items-center p-1 border">
            <div className="flex items-center space-x-2  flex-1">
              <div className="text-gray-600">{index + 1}</div>
              <img
                src={coin.image}
                alt={coin.name}
                className="w-4 h-4 rounded-full"
              />
              <span className="text-md font-bold">{coin.symbol}</span>
            </div>

            <div className="flex-1 text-md text-right">
              {coin.current_price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              <span className="font-bold">{" " + "$"}</span>
            </div>
          </div>
        ))
      ) : (
        <>fetching prices...</>
      )}
    </div>
  );
}
