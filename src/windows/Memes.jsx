import React, { useState } from "react";
import WindowLayout from "../components/WindowLayout";

const siteObj = {
  Portfolio: "https://portfolio.cherrydub.com",
  Smartbrain: "https://smartbrain.cherrydub.com",
  Crypto: "https://crypto1.cherrydub.com/",
  JSON: "https://json.cherrydub.com",
  // BlockList: "https://northcoders.com/projects/may-2023/blocklist",
  // GitHub: "https://github.com/chriscodingxyz",
};

export default function Memes({ activeComponents, removeActiveComponent }) {
  const [site, setSite] = useState(siteObj.Portfolio);

  const openNewWindow = () => {
    window.open(site, "_blank");
  };

  return (
    <div>
      <WindowLayout
        activeComponents={activeComponents}
        removeActiveComponent={removeActiveComponent}
        windowType={"Memes"}
      >
        <input
          className="cursor-pointer hover:text-blue-700"
          onClick={openNewWindow}
          type="text"
          value={site}
          // readOnly
        />
        <div>
          {Object.keys(siteObj).map((key) => (
            <button
              key={key}
              className={site === siteObj[key] ? "active" : ""}
              onClick={() => setSite(siteObj[key])}
            >
              {key}
            </button>
          ))}
        </div>

        <iframe
          src={site}
          width={"500px"}
          height={"500px"}
          frameBorder="0"
        ></iframe>
        <input
          className="cursor-pointer hover:text-blue-700"
          onClick={openNewWindow}
          type="text"
          value={site}
          readOnly
        />
      </WindowLayout>
    </div>
  );
}
