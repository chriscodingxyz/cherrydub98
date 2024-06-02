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
        <div
          className="relative flex hover:text-blue-700"
          title="Open in new window/tab"
        >
          <input
            className="cursor-pointer  pr-10 w-full" // Add padding for the icon
            onClick={openNewWindow}
            type="text"
            value={site}
            // readOnly
          ></input>
          <i
            onClick={openNewWindow}
            style={{ fontSize: "1rem" }}
            className="cursor-pointer absolute right-0 top-1 bottom-0 m-auto mr-1 las la-external-link-square-alt "
          ></i>
        </div>

        <div>
          {/* <select
            value={site}
            onChange={(e) => setSite(e.target.value)}
            className="border border-gray-300 px-3 py-1 w-full"
          >
            {Object.keys(siteObj).map((key) => (
              <option key={key} value={siteObj[key]}>
                {siteObj[key]}
              </option>
            ))}
          </select> */}

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
          title="Open in new window/tab"
          onClick={openNewWindow}
          type="text"
          value={site}
          readOnly
        />
      </WindowLayout>
    </div>
  );
}
