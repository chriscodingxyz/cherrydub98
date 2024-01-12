import React, { useState, useEffect } from "react";
import axios from "axios";
import { nftArr, nftData } from "./nftData";

const apikey = import.meta.env.VITE_FORM_KEY;

const MAX_NAME_LENGTH = 15; // Set your desired maximum length for the name

const handleImageError = (event) => {
  // Replace the broken image with an alternate image or a white background
  event.target.src =
    "https://www.stoneykins.com/Patterns/product_images/e/031/Dead_Smiley_MOCK__15194_zoom.png";
  // Replace with the path to your alternate image or use a white background
  // Alternatively, you can set a background color for the broken image
  // event.target.style.backgroundColor = 'white';
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

export default function NftList() {
  const [nftStuff, setNftStuff] = useState(null);
  const [inEth, setInEth] = useState(true);

  // useEffect(() => {
  //     axios
  //       .get(`https://api.nftpricefloor.com/api/projects?qapikey=${apikey}`)
  //       .then((res) => {
  //         setNftStuff(res.data);
  //         console.log("data here:", res.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   }, []);

  // Render your nfts here using the nftStuff state
  // For example:
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

      {nftArr ? (
        // Render your nft data here
        <div>
          {/* <div></div> */}
          <h4 className="text-center">Top 100 NFTs</h4>
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
                <th>Name</th>
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
              {nftData.map((item) => (
                <tr key={item.ranking}>
                  <td className="border">{item.ranking}</td>
                  <td className="border">
                    <div className="flex">
                      <div>
                        <img
                          style={{
                            // border: "3px solid white",
                            // borderRadius: "10%",
                            width: "20px",
                            height: "20px",
                            padding: "1px",
                          }}
                          onError={handleImageError}
                          src={item.image}
                          //  alt={item.image}
                        ></img>
                      </div>
                      <div>
                        {" "}
                        {item.name.length > MAX_NAME_LENGTH
                          ? `${item.name.slice(0, MAX_NAME_LENGTH)}...`
                          : item.name}
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
        // Show a loading message or spinner while fetching data
        <p>Loading...</p>
      )}
    </>
  );
}
