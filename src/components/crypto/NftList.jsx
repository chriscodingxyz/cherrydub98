import React, { useState, useEffect } from "react";
import Bitcoin from "../icons/Bitcoin";
import Ethereum from "../icons/Ethereum";
import Solana from "../icons/Solana";

const apikey = import.meta.env.VITE_NFT_KEY;

const MAX_NAME_LENGTH = 15;

const handleImageError = (event) => {
  event.target.src =
    "https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-3.png";
};

const abbreviateNumber = (value) => {
  const suffixes = ["", "k", "M", "B", "T"];
  let tier = (Math.log10(Math.abs(value)) / 3) | 0;

  if (tier === 0) return value;

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);

  const scaledValue = value / scale;

  return scaledValue.toFixed(1) + suffix;
};

const getImageUrl = (slug) =>
  `https://s3.amazonaws.com/cdn.nftpricefloor/projects/v1/${slug}.png?version=6`;

const getOpenSeaUrl = (slug) =>
  `https://nft.chriscoding.xyz/collections/${slug}`.toLowerCase();

// Currency icon mapping function
const getCurrencyIcon = (currency) => {
  const iconProps = { className: "inline w-3 h-3 ml-1" };
  
  switch (currency?.toLowerCase()) {
    case 'btc':
    case 'bitcoin':
      return <Bitcoin {...iconProps} />;
    case 'eth':
    case 'ethereum':
      return <Ethereum {...iconProps} />;
    case 'sol':
    case 'solana':
      return <Solana {...iconProps} />;
    default:
      return <span className="text-xs ml-1">{currency?.toUpperCase()}</span>;
  }
};

// Get decimal precision based on currency
const getDecimalPrecision = (currency) => {
  switch (currency?.toLowerCase()) {
    case 'eth':
    case 'ethereum':
      return 1;
    case 'btc':
    case 'bitcoin':
    case 'sol':
    case 'solana':
      return 2;
    default:
      return 4;
  }
};

export default function NftList() {
  const [nftStuff, setNftStuff] = useState(null);
  const [inNative, setInNative] = useState(true);
  const [updatedTime, setUpdatedTime] = useState(null);

  useEffect(() => {
    console.log("🚀 Starting NFT fetch with API key:", apikey);
    console.log("📡 Fetching from URL:", `https://api.nftpricefloor.com/api/projects?qapikey=${apikey}`);
    
    // Check if API key exists
    if (!apikey) {
      console.error("❌ No API key found in environment variables");
      setNftStuff([]);
      return;
    }
    
    // Use CORS proxy to bypass browser restrictions
    const apiUrl = `https://api.nftpricefloor.com/api/projects?qapikey=${apikey}`;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;
    
    console.log("🔄 Using CORS proxy:", proxyUrl);
    
    fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
      .then((response) => {
        console.log("✅ NFT API Response received:", response);
        console.log("📊 Response status:", response.status);
        console.log("📊 Response statusText:", response.statusText);
        console.log("📊 Response ok:", response.ok);
        console.log("🌐 Response headers:", Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
          return response.text().then(text => {
            console.error("❌ Response body:", text);
            throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
          });
        }
        
        return response.json();
      })
      .then((data) => {
        console.log("📦 Response data length:", data?.length);
        console.log("🔍 First item structure:", data?.[0]);
        
        if (!Array.isArray(data) || data.length === 0) {
          console.warn("⚠️ API returned empty or invalid data");
          setNftStuff([]);
          return;
        }
        
        // Filter for supported currencies first
        const supportedCurrencies = ['btc', 'eth', 'sol'];
        const filteredData = data.filter(item => 
          supportedCurrencies.includes(item.nativeCurrency?.toLowerCase())
        );
        
        console.log(`🔍 Filtered from ${data.length} to ${filteredData.length} NFTs (BTC/ETH/SOL only)`);

        const extractedData = filteredData.map((item) => ({
          name: item.name,
          ranking: item.ranking,
          totalSupply: item.stats.totalSupply,
          floorNative: item.stats.floorInfo.currentFloorNative,
          floorUsd: item.stats.floorInfo.currentFloorUsd,
          nativeCurrency: item.nativeCurrency,
          blockchain: item.blockchain,
          count: item.stats.count,
          image: getImageUrl(item.slug),
          slug: item.slug,
          OSURL: getOpenSeaUrl(item.slug),
        }));

        const sortedData = extractedData.sort((a, b) => a.ranking - b.ranking);
        const nftData = sortedData.slice(0, 100);

        console.log("🎯 Processed NFT data:", nftData.slice(0, 3));
        setNftStuff(nftData);
      })
      .catch((error) => {
        console.error("❌ Error fetching NFT data:", error);
        console.error("🔍 Error type:", error.constructor.name);
        console.error("🔍 Error message:", error.message);
        
        // Check if it's a CORS error
        if (error.message.includes('CORS') || error.message.includes('Access-Control')) {
          console.error("🚫 CORS error detected - the API is blocking browser requests");
        }
        
        // Fallback: Show a message instead of infinite loading
        setNftStuff([]);
      });
  }, []);

  return (
    <>
      {/* <div> */}
      <div className="selected-div">
        {/* <button
          className={inEth ? "selected" : ""}
          onClick={() => setInEth(true)}
        >
          ETH
        </button>
        <button
          className={!inEth ? "selected" : ""}
          onClick={() => setInEth(false)}
        >
          USD
        </button> */}
      </div>
      {/* </div> */}

      {nftStuff && nftStuff.length > 0 ? (
        // Render your nft data here
        <div>
          {/* <div></div> */}
          <h4 className="text-left">Top NFTs (BTC/ETH/SOL)</h4>
          {/* currency{" "}
          <select
            name=""
            id=""
            //  onChange={currencyOnChange} value={currency}
          >
            <option value="usd">$</option>
            <option value="gbp">£</option>
            <option value="eur">€</option>
          </select> */}
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th className="">Name</th>
                <th
                  onClick={() => setInNative((curr) => !curr)}
                  className="text-right cursor-pointer"
                >
                  Floor{" "}
                  {!inNative && <i class="las la-dollar-sign"></i>}
                </th>
                <th className="text-right">Supply</th>
                {/* <th>MCap {inEth ? "ETH" : "USD"}</th> */}
              </tr>
            </thead>
            <tbody>
              {nftStuff.map((item) => (
                <tr key={item.ranking}>
                  <td className="border">{item.ranking}</td>
                  <td className="border">
                    <div className="flex">
                      <div>
                        <img
                          style={{
                            border: "1px solid black",
                            width: "20px",
                            height: "20px",
                            padding: "0px",
                            margin: "1px",
                            objectFit: "cover",
                          }}
                          onError={handleImageError}
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <div className="font-bold ml-1">
                        {item.name.length > MAX_NAME_LENGTH ? (
                          <a
                            href={item.OSURL}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {`${item.name.slice(0, MAX_NAME_LENGTH)}...`}
                          </a>
                        ) : (
                          <a
                            href={item.OSURL}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.name}
                          </a>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="text-right border">
                    {inNative ? (
                      <>
                        {item.floorNative 
                          ? item.floorNative.toFixed(getDecimalPrecision(item.nativeCurrency))
                          : '0.' + '0'.repeat(getDecimalPrecision(item.nativeCurrency))
                        }
                        {getCurrencyIcon(item.nativeCurrency)}
                      </>
                    ) : (
                      <>
                        ${item.floorUsd ? item.floorUsd.toLocaleString() : '0'}
                      </>
                    )}
                  </td>
                  <td className="text-right border">
                    {item.totalSupply.toLocaleString()}
                  </td>
                  {/* {inEth ? (
                    <td>
                      {Number(
                        (item.floorEth * item.totalSupply).toFixed(0)
                      ).toLocaleString()}{" "}
                      E
                    </td>
                  ) : (
                    <td>
                      $
                      {abbreviateNumber(
                        item.floorUsd * item.totalSupply
                      ).toLocaleString()}
                    </td>
                  )} */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : nftStuff === null ? (
        <div className="flex flex-col items-center justify-center">
          <p>
            <img
              src="https://win98icons.alexmeub.com/icons/png/world_network_directories-4.png"
              alt=""
            />
          </p>

          <br></br>
          <p className="flex">
            Fetching from{" "}
            <a href="https://nftpricefloor.com/" target="_blank">
              <img
                style={{
                  width: "20px",
                  border: "1px solid black",
                  marginLeft: "2px",
                }}
                src="https://pbs.twimg.com/profile_images/1671145224565841920/LLJEyIe__400x400.jpg"
              ></img>
            </a>
          </p>
          <br></br>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-4">
          <img
            src="https://win98icons.alexmeub.com/icons/png/error-0.png"
            alt="Error"
            width="48"
          />
          <p className="text-center mt-2">
            NFT data temporarily unavailable
          </p>
          <p className="text-xs text-gray-600 text-center">
            API connection failed
          </p>
        </div>
      )}
    </>
  );
}
