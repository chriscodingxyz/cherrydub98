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
  const suffixes = ["", "K", "M", "B", "T"];
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
        <button
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
        </button>
      </div>
      {/* </div> */}

      {nftArr ? (
        // Render your nft data here
        <div>
          <h4>Top 100 NFTs by Ranking</h4>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Floor {inEth ? "ETH" : "USD"}</th>
                <th>Supply</th>
                {/* <th>MCap {inEth ? "ETH" : "USD"}</th> */}
              </tr>
            </thead>
            <tbody>
              {nftData.map((item) => (
                <tr key={item.ranking}>
                  <td>{item.ranking}</td>
                  <td>
                    <div className="flex">
                      <div>
                        <img
                          style={{
                            // border: "3px solid white",
                            // borderRadius: "10%",
                            width: "20px",
                            height: "auto",
                            padding: "2px",
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
                    <td>{item.floorEth.toFixed(2)} E</td>
                  ) : (
                    <td className="text-right">
                      {item.floorUsd.toLocaleString()} $
                    </td>
                  )}

                  <td className="text-right">
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
