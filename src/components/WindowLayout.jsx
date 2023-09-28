import React from "react";

export default function WindowLayout({
  activeComponents,
  removeActiveComponent,
  windowType,
  windowIcon,
  windowTitle,
  buttonLayout,
  hyperlink,
  children,
}) {
  const handleLinkClick = (event) => {
    // This prevents any background event clickers to work, such as removing and readding the active component
    event.stopPropagation();
    removeActiveComponent(windowType);
  };

  const isActive =
    (activeComponents ?? []).length > 0 && activeComponents[0] === windowType;
  const titleBarClassName = `title-bar${isActive ? "" : " inactive"}`;

  return (
    <div className="">
      {/* <div className="flex justify-center"> */}
      <div className="window inline-flex flex-col">
        <div className={titleBarClassName}>
          <div className="title-bar-text flex cursor-default">
            <img className="btn pr-1" src={windowIcon} alt={windowType} />
            {windowTitle ? windowTitle : windowType}
          </div>
          <div className="title-bar-controls">
            {buttonLayout === "?x" ? (
              <>
                {" "}
                <a href={hyperlink} target="_blank">
                  <button className="bg-gray-300" aria-label="Help"></button>
                </a>
                <button
                  onClick={handleLinkClick}
                  className="bg-gray-300 btn hover:bg-gray-100"
                  aria-label="Close"
                ></button>
              </>
            ) : (
              <>
                {" "}
                <button
                  onClick={handleLinkClick}
                  className="bg-gray-300 btn hover:bg-gray-100"
                  aria-label="Minimize"
                ></button>
                <button className="bg-gray-300" aria-label="Maximize"></button>
                <button
                  onClick={handleLinkClick}
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
