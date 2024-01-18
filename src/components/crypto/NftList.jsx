import React, { useState, useEffect } from "react";
import axios from "axios";

const apikey = import.meta.env.VITE_NFT_KEY;

const MAX_NAME_LENGTH = 15;

const handleImageError = (event) => {
  event.target.src =
    "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png";
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
  `https://nftpricefloor.com/_next/image?url=https%3A%2F%2Fs3.amazonaws.com%2Fcdn.nftpricefloor%2Fprojects%2Fv1%2F${slug}.png%3Fversion%3D6&w=256&q=75`;

const getOpenSeaUrl = (slug) =>
  `https://nftpricefloor.com/${slug}`.toLowerCase();

export default function NftList() {
  const [nftStuff, setNftStuff] = useState(null);
  const [inEth, setInEth] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.nftpricefloor.com/api/projects?qapikey=${apikey}`)
      .then((res) => {
        const nftArr = res.data;

        console.log(res.data);

        const extractedData = nftArr.map((item) => ({
          name: item.name,
          ranking: item.ranking,
          totalSupply: item.stats.totalSupply,
          floorEth: item.stats.floorInfo.currentFloorEth,
          floorUsd: item.stats.floorInfo.currentFloorUsd,
          count: item.stats.count,
          image: getImageUrl(item.slug),
          slug: item.slug,
          OSURL: getOpenSeaUrl(item.slug),
        }));

        const sortedData = extractedData.sort((a, b) => a.ranking - b.ranking);

        const nftData = sortedData.slice(0, 100);

        setNftStuff(nftData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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

      {nftStuff ? (
        // Render your nft data here
        <div>
          {/* <div></div> */}
          <h4 className="text-left">Top 100 NFTs</h4>
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
                  onClick={() => setInEth((curr) => !curr)}
                  className="text-right cursor-pointer"
                >
                  Floor{" "}
                  {inEth ? (
                    <i class="lab la-ethereum"></i>
                  ) : (
                    <i class="las la-dollar-sign"></i>
                  )}
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
                            // border: "3px solid white",
                            border: "1px solid black",

                            width: "20px",
                            height: "20px",
                            padding: "0px",
                            margin: "1px",
                            // borderRadius: "50%",
                          }}
                          onError={handleImageError}
                          src={item.image}
                          //  alt={item.image}
                        ></img>
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
                  {inEth ? (
                    <td className="text-right border">
                      {item.floorEth.toFixed(2)}
                      <i class="lab la-ethereum"></i>
                    </td>
                  ) : (
                    <td className="text-right border">
                      {abbreviateNumber(item.floorUsd.toFixed(0))}{" "}
                      <i class="las la-dollar-sign"></i>
                    </td>
                  )}

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
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
