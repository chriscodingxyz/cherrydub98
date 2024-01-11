import React from "react";
import CryptoContent from "./CryptoContent";
import WindowLayout from "../components/WindowLayout";

export default function Crypto({
  activeComponents,
  removeActiveComponent,
  site,
  setSite,
  addActiveComponent,
  siteObj,
  windowSize,
}) {
  return (
    <div>
      <WindowLayout
        activeComponents={activeComponents}
        removeActiveComponent={removeActiveComponent}
        windowType={"Crypto"}
        windowIcon={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1024px-Bitcoin.svg.png"
        }
      >
        <div className="window-body">
          <div
            className="bg-white border-l border-t border-gray-500"
            style={{
              overflow: "auto",
              height: "50vh",
              minWidth: "300px",
            }}
          >
            <CryptoContent />
          </div>
        </div>
      </WindowLayout>
    </div>
  );
}
