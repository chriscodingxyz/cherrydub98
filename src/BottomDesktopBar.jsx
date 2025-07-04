import React, { useState, useEffect } from "react";
import { useAppContext } from "./context/AppContext";
import LocalTime from "./components/LocalTime";

export default function BottomDesktopBar() {
  const {
    activeComponents,
    openWindows,
    setActiveComponents,
    addActiveComponent,
    removeActiveComponent,
    selectWindow,
    isWindowSelected,
    restoreWindow,
    isWindowMinimized,
  } = useAppContext();

  const handleTaskbarClick = (componentName) => {
    if (isWindowMinimized(componentName)) {
      // If window is minimized, restore it
      restoreWindow(componentName);
    } else {
      // If window is visible, bring it to front (same as clicking on window)
      addActiveComponent(componentName);
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const icons = {
    Welcome: "https://win98icons.alexmeub.com/icons/png/console_prompt-1.png",
    Contact: "https://win98icons.alexmeub.com/icons/png/outlook_express-2.png",
    Cv: "https://win98icons.alexmeub.com/icons/png/message_file-1.png",
    IE: "https://win98icons.alexmeub.com/icons/png/msie1-4.png",
    Memes: "https://win98icons.alexmeub.com/icons/png/briefcase-1.png",
    Projects:
      "https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-3.png",
    Timer: "https://win98icons.alexmeub.com/icons/png/clock-0.png",
    Todo: "https://win98icons.alexmeub.com/icons/png/notepad-3.png",
    Display:
      "https://win98icons.alexmeub.com/icons/png/display_properties-1.png",
    Links: "https://win98icons.alexmeub.com/icons/png/message_file-1.png",
    Notes: "https://win98icons.alexmeub.com/icons/png/notepad_file-1.png",
    Crypto:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1024px-Bitcoin.svg.png",
  };

  const [switchOn, setSwitchOn] = useState(false);

  const toggleSwitch = () => {
    setSwitchOn((prevState) => !prevState);
    if (switchOn) {
      setActiveComponents([]);
    } else {
      addActiveComponent("IE");
      addActiveComponent("Cv");
      addActiveComponent("Projects");
      addActiveComponent("Contact");
      addActiveComponent("Todo");
      addActiveComponent("Display");
      addActiveComponent("Welcome");
    }
  };

  return (
    <div className="start-bar flex">
      <div className="flex-initial start-button-wrapper text-center justify-center items-center self-center ">
        <img
          onClick={toggleSwitch}
          className="hover:opacity-50"
          src="https://win98icons.alexmeub.com/images/start-button.png"
          width={"35px"}
          alt=""
        />
      </div>
      <div className="flex-auto mx-1 flex">
        {/* <div
          className={` ${activeComponents.includes("Display") ? "active" : ""}`}
          onClick={() => handleLinkClick("Display")}
        >
          <img
            className="hover:cursor-pointer"
            src={displayicon.src}
            alt="displayicon"
            width={"14px"}
            style={{ marginRight: "5px" }}
            title="Display Settings"
          />
        </div> */}

        {openWindows.map((window) => {
          const isSelected = isWindowSelected(window);
          const isMinimized = isWindowMinimized(window);
          
          return (
            <div
              className={`${
                isSelected 
                  ? "bg-gray-300 start-bar-tabs-active" 
                  : "start-bar-tabs-inactive"
              } flex-auto text-center justify-center items-center inline cursor-pointer`}
              key={window}
              onClick={() => handleTaskbarClick(window)}
            >
              <img
                className="inline"
                src={icons[window]}
                alt=""
                width={"14px"}
              />{" "}
              {(!isMobile && (
                <span className={isSelected ? "font-bold" : ""}>
                  {window}
                </span>
              )) ||
                (openWindows.length <= 3 && (
                  <span className={isSelected ? "font-bold" : ""}>
                    {window}
                  </span>
                ))}
            </div>
          );
        })}
      </div>

      <div className="start-bar-time flex-initial text-center justify-center items-center">
        <div className="flex">
          <div className="flex flex-row justify-center items-start self-center">
            <div className="flex items-start">
              <img
                className="inline mr-1 hover:opacity-50"
                onClick={() => addActiveComponent("Welcome")}
                src="https://win98icons.alexmeub.com/icons/png/console_prompt-1.png"
                alt=""
                width="14px"
              />
              <img
                className="inline mr-1 hover:opacity-50"
                onClick={() => addActiveComponent("Display")}
                src="https://win98icons.alexmeub.com/icons/png/display_properties-1.png"
                alt=""
                width="14px"
              />
              <img
                className="inline mr-1 hover:opacity-50"
                onClick={() => addActiveComponent("IE")}
                src="https://win98icons.alexmeub.com/icons/png/msie1-4.png"
                alt=""
                width="14px"
              />
              {/* <img
                className="inline mr-1 hover:opacity-50"
                // onClick={() => handleLinkClick("Timer")}
                src="https://win98icons.alexmeub.com/icons/png/time_and_date-1.png"
                alt=""
                width="14px"
              /> */}
            </div>
          </div>
          <LocalTime />
        </div>
      </div>
    </div>
  );
}
