import React from "react";
import { useAppContext } from "../context/AppContext";

export default function WindowLayout({
  windowType,
  windowIcon,
  windowTitle,
  buttonLayout,
  hyperlink,
  children,
}) {
  const { activeComponents, removeActiveComponent, isWindowSelected, minimizeWindow } = useAppContext();

  const handleCloseClick = (event) => {
    // This prevents any background event clickers to work, such as removing and readding the active component
    event.stopPropagation();
    removeActiveComponent(windowType);
  };

  const handleMinimizeClick = (event) => {
    event.stopPropagation();
    minimizeWindow(windowType);
  };

  const isSelected = isWindowSelected(windowType);
  const titleBarClassName = `title-bar${isSelected ? "" : " inactive"}`;

  return (
    <div className="">
      {/* <div className="flex justify-center"> */}
      <div className="window inline-flex flex-col">
        <div className={titleBarClassName}>
          <div className="title-bar-text flex cursor-default">
            <img
              className="btn pr-1"
              src={windowIcon}
              alt={windowType}
              width={"20px"}
            />
            {windowTitle ? windowTitle : windowType}
          </div>
          <div className="title-bar-controls">
            {buttonLayout === "?x" ? (
              <>
                {" "}
                <a href={hyperlink} target="_blank">
                  <button className="bg-gray-300 btn" aria-label="Help"></button>
                </a>
                <button
                  onClick={handleCloseClick}
                  className="bg-gray-300 btn hover:bg-gray-100"
                  aria-label="Close"
                ></button>
              </>
            ) : (
              <>
                {" "}
                <button
                  onClick={handleMinimizeClick}
                  className="bg-gray-300 btn hover:bg-gray-100"
                  aria-label="Minimize"
                ></button>
                <button className="bg-gray-300 btn" aria-label="Maximize"></button>
                <button
                  onClick={handleCloseClick}
                  className="bg-gray-300 btn hover:bg-gray-100"
                  aria-label="Close"
                ></button>
              </>
            )}

            {/* <button
              onClick={handleLinkClick}
              className="bg-gray-300 btn hover:bg-gray-100"
              aria-label="Minimize"
            ></button>
            <button className="bg-gray-300" aria-label="Maximize"></button>
            <button
              onClick={handleLinkClick}
              className="bg-gray-300 btn hover:bg-gray-100"
              aria-label="Close"
            ></button> */}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
