import React, { useState, useEffect } from "react";
import { cryptoService } from "../services/cryptoService";

export default function ConsoleCrypto() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      
      try {
        const data = await cryptoService.getMarketData('usd', 10, page);
        setCoins(data);
        setLoading(false);
        console.log("ConsoleCrypto data loaded successfully");
      } catch (err) {
        console.warn("ConsoleCrypto failed to load:", err);
        setError(true);
        setLoading(false);
        setCoins([]);
      }
    };

    fetchData();
  }, [page]);

  const goToPrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (error) {
    return (
      <div className="text-center p-2">
        <div className="text-xs text-gray-400">📡 crypto data offline</div>
        <div className="text-xs mt-1">
          <span 
            onClick={() => window.location.reload()} 
            className="cursor-pointer text-blue-400 hover:underline"
          >
            retry
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {coins.length ? (
        coins.map((coin, index) => (
          <div key={coin.id} className="flex items-center p-1">
            <div className="flex items-center space-x-2  flex-1  ">
              <div className="text-gray-600">{coin.market_cap_rank}</div>
              <img
                src={coin.image}
                alt={coin.name}
                className="w-4 h-4 rounded-full"
              />
              <span className="text-md font-bold">{coin.symbol}</span>
            </div>
            <div></div>

            <div className="flex-1 text-md text-right border border-dotted border-x-0 border-t-0">
              {coin.current_price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              <span className="font-bold">{" " + "$"}</span>
            </div>
          </div>
        ))
      ) : loading ? (
        <div className="text-center text-xs text-gray-400 p-2">
          fetching crypto prices...
        </div>
      ) : (
        <div className="text-center text-xs text-gray-400 p-2">
          no data available
        </div>
      )}

      {coins.length > 0 && !error && (
        <div className="mt-2 text-right">
          {page > 1 && (
            <span onClick={goToPrevPage} className="cursor-pointer">
              {"<< "}
            </span>
          )}

          <span>page {page}</span>
          <span onClick={goToNextPage} className="cursor-pointer">
            {" >>"}
          </span>
        </div>
      )}

      <br />
    </div>
  );
}
