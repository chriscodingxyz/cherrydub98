import React from "react";
import WindowLayout from "../components/WindowLayout";

export default function IE({
  activeComponents,
  removeActiveComponent,
  windowSize,
  siteObj,
  site,
  setSite,
}) {
  const openNewWindow = () => {
    window.open(site, "_blank");
  };

  return (
    <div>
      <WindowLayout
        activeComponents={activeComponents}
        removeActiveComponent={removeActiveComponent}
        windowType={"IE"}
        windowTitle={"Internet Explorer"}
        windowIcon={"https://win98icons.alexmeub.com/icons/png/msie1-4.png"}
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
              className={site === siteObj[key] ? "active font-bold" : ""}
              onClick={() => setSite(siteObj[key])}
            >
              {key}
            </button>
          ))}
        </div>

        <iframe
          src={site}
          style={{ backgroundColor: "white" }}
          width={windowSize.width - 62 < 700 ? windowSize.width - 62 : 700}
          height={windowSize.height - 150}
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
