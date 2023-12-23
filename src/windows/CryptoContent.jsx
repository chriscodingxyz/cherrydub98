import React, { useState, useEffect } from "react";
import TwitterEmbed from "../components/TwitterEmbed";
import axios from "axios";
import CryptoList from "../components/CryptoList";

export default function CryptoContent({
  site,
  setSite,
  siteObj,
  addActiveComponent,
  windowSize,
}) {
  const [displayAmount, setDisplayAmount] = useState(10);
  const [currency, setCurrency] = useState("usd");
  const [orderSort, setOrderSort] = useState("desc");

  const currencySymbol = {
    usd: "$",
    gbp: "£",
    eur: "€",
  };

  const [coins, setCoins] = useState([]);

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_${orderSort}&per_page=${displayAmount}&page=1&sparkline=false&locale=en`;

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
        <CryptoList coins={coins} />
        <CryptoList coins={coins} />
        <CryptoList coins={coins} />
      </section>
      {/* <section>nft</section> */}
      <section>
        {/* twitter */}
        {windowSize.width > 600 && <TwitterEmbed />}
      </section>
    </div>
  );
}
