import React, { useState, useEffect } from "react";
import {
  fetchBitcoinPrice,
  fetchEthereumPrice,
} from "../components/cryptoPrices";
import LastGitPush from "../components/LastGitPush";
import ESTtime from "../components/ESTtime";

export default function WelcomeContent() {
  const [btcPrice, setBtcPrice] = useState(null);
  const [ethPrice, setEthPrice] = useState(null);
  const [lastPushTime, setLastPushTime] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const btcPrice = await fetchBitcoinPrice();
        const ethPrice = await fetchEthereumPrice();
        const pushTime = await LastGitPush();

        setBtcPrice(btcPrice);
        setEthPrice(ethPrice);
        setLastPushTime(pushTime);
      } catch (error) {
        setError("Error occurred while fetching data.", error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="text-whitefont-bold cursor-not-allowed">
      <pre className=" bg-black text-white text-center">
        <div className="preextra">
          <div className="flex">
            <div className="flex-initial">cherrydub©</div>

            <div className="flex-grow text-right">
              {/* <a href="https://crypto1.cherrydub.com/" target="_blank"> */}
              ₿: {btcPrice} Ξ: {ethPrice}
              {ethPrice > 1800 && btcPrice > 27000 ? " 🙂" : " 🙃"}
              {/* </a> */}
            </div>
          </div>
          <div className="text-left">
            <ESTtime />
          </div>
          <br />
          <div className="flex">
            <div className="flex-initial">Latest push:</div>
            <div className="flex-grow text-right">
              {lastPushTime
                ? `${lastPushTime.split("T")[0]} @ ${
                    lastPushTime.split("T")[1].substring(0, 5) + " UTC"
                  }`
                : "Loading..."}
            </div>
          </div>
        </div>

        {`
               .__                               
__  _  __ ____ |  |   ____  ____   _____   ____  
\\ \\/ \\/ // __ \\|  | _/ ___\\/  _ \\ /     \\_/ __ \\ 
 \\     /\\  ___/|  |_\\  \\__(  <_> )  Y Y  \\  ___/ 
  \\/\\_/  \\___  >____/\\___  >____/|__|_|  /\\___  >
             \\/          \\/            \\/     \\/
      `}

        <div className="preextra text-left">
          C:\WINDOWS{">"}
          <span className="animate-blink">_</span>
        </div>
      </pre>
    </div>
  );
}
