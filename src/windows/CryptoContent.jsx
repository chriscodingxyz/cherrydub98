import React, { useState, useEffect } from "react";
import TwitterEmbed from "../components/TwitterEmbed";
import axios from "axios";
import CryptoList from "../components/crypto/CryptoList";
import NftList from "../components/crypto/NftList";

export default function CryptoContent({}) {
  // const [displayAmount, setDisplayAmount] = useState(25);
  // const [currency, setCurrency] = useState("usd");

  // const currencySymbol = {
  //   usd: "$",
  //   gbp: "£",
  //   eur: "€",
  // };

  // const [coins, setCoins] = useState([]);

  // const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${displayAmount}&page=1&sparkline=false&locale=en`;

  // useEffect(() => {
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       setCoins(res.data);
  //       console.log("data:", res.data);
  //     })
  //     .catch((err) => {
  //       console.log("error:", err);
  //     });
  // }, [url]);
  const [choice, setChoice] = useState("nft");

  return (
    <div
      className="flex flex-col p-0 gap-4"
      // style={{ maxHeightheight: "75vh", minWidth: "300px" }}
    >
      <div className="flex justify-center">
        <button
          className={choice === "nft" && "active font-bold"}
          onClick={() => setChoice("nft")}
        >
          NFT
        </button>
        <button
          className={choice === "crypto" && "active font-bold"}
          onClick={() => setChoice("crypto")}
        >
          Crypto
        </button>
      </div>

      <div className="flex justify-around">
        {choice === "nft" && (
          <img
            className="rounded-full"
            src="https://i.seadn.io/gae/0gdZ45HaU-bK930OyA9Lu5g5YpQ1Yady6vpd441zbjUBELN4hzI8FeIY99MItiVJXw1-l3o210uu67sTM9nkGiG8?auto=format&dpr=1&w=1000"
            alt=""
            width={"50px"}
          />
        )}
        {choice === "crypto" && (
          <img
            className="rounded-full"
            src="https://cdn-icons-png.flaticon.com/512/2473/2473354.png"
            alt=""
            width={"50px"}
          />
        )}
      </div>
      <section>
        {/* crypto prices */}

        {choice === "crypto" && (
          <CryptoList
          // currency={currency}
          // coins={coins}
          // setDisplayAmount={setDisplayAmount}
          // setCurrency={setCurrency}
          />
        )}

        {choice === "nft" && <NftList />}
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
