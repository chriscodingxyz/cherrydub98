import React from "react";
import TimerContent from "./TimerContent";

export default function Timer({ activeComponents, removeActiveComponent }) {
  const handleLinkClick = (event) => {
    //this prevents any background event clickers to work, such as removing and readding the active component
    event.stopPropagation();
    removeActiveComponent("Timer");
  };

  const isActive =
    (activeComponents ?? []).length > 0 && activeComponents[0] === "Timer";
  const titleBarClassName = `title-bar${isActive ? "" : " inactive"}`;

  return (
    <div className="">
      <div className="window inline-flex flex-col">
        <div className={titleBarClassName}>
          <div className="title-bar-text flex cursor-default">
            <img
              className="btn pr-1"
              src="https://win98icons.alexmeub.com/icons/png/clock-0.png"
              alt=""
            />
            Timer
          </div>
          <div className="title-bar-controls">
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
          </div>
        </div>
        <div className="window-body">
          <div className="bg-white p-4 border-l border-t border-gray-500">
            {/* <div className="flex justify-center items-center h-screen"> */}
            <div className="text-center">
              {/* <h1 className="">Timer</h1> */}
              <div className="mb-4">
                <TimerContent duration={120} beepIntervals={[90, 0]} />
              </div>
              <div>
                <TimerContent duration={110} beepIntervals={[75, 0]} />
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
