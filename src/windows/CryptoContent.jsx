import React, { useState, useEffect } from "react";
import TwitterEmbed from "../components/TwitterEmbed";
import axios from "axios";
import CryptoList from "../components/CryptoList";

export default function CryptoContent({}) {
  const [displayAmount, setDisplayAmount] = useState(25);
  const [currency, setCurrency] = useState("usd");

  const currencySymbol = {
    usd: "$",
    gbp: "£",
    eur: "€",
  };

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

  return (
    <div
      className="flex flex-col p-4 gap-4"
      // style={{ maxHeightheight: "75vh", minWidth: "300px" }}
    >
      <section>
        {/* crypto prices */}
        <CryptoList
          currency={currency}
          coins={coins}
          setDisplayAmount={setDisplayAmount}
          setCurrency={setCurrency}
        />
      </section>
      {/* <section>nft</section> */}
      {/* <section> */}
      {/* twitter */}
      {/* {windowSize.width > 600 && <TwitterEmbed />} */}
      {/* <TwitterEmbed /> */}
      {/* </section> */}
    </div>
  );
}
