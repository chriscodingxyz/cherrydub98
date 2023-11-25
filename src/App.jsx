import { useState } from "react";
import BottomDesktopBar from "./BottomDesktopBar";
import LeftDesktopNav from "./LeftDesktopNav";
import MainDesktop from "./MainDesktop";
import { useLocalStorage, useWindowSize } from "@uidotdev/usehooks";
import "./flicker.css";

const siteObj = {
  Portfolio: "https://portfolio.cherrydub.com",

  Crypto: "https://crypto1.cherrydub.com/",
  JSON: "https://json.cherrydub.com",
  Smartbrain: "https://smartbrain.cherrydub.com",
  // BlockList: "https://northcoders.com/projects/may-2023/blocklist",
  // GitHub: "https://github.com/cherrydub",
};

export default function App() {
  const [activeComponents, setActiveComponents] = useState([
    "Welcome",
    "Display",
  ]);
  const [backgroundChoice, setBackgroundChoice] = useLocalStorage(
    "backgroundChoice",
    "background-pepe1"
  );
  const [flicker, setFlicker] = useState(true);
  const windowSize = useWindowSize();

  const [site, setSite] = useState(siteObj.Portfolio);

  // const handleContactFormClose = (componentName) => {
  //   setActiveComponents((prevActiveComponents) =>
  //     prevActiveComponents.filter((name) => name !== componentName)
  //   );
  // };

  const addActiveComponent = (componentName) => {
    setActiveComponents((prevActiveComponents) => [
      componentName,
      ...prevActiveComponents.filter((name) => name !== componentName),
    ]);
  };

  const removeActiveComponent = (componentName) => {
    setActiveComponents((prevActiveComponents) =>
      prevActiveComponents.filter((name) => name !== componentName)
    );
  };

  return (
    <div
      className={`${backgroundChoice} ${flicker ? "crt" : ""}`}
      style={{ height: "100vh" }}
    >
      <LeftDesktopNav
        activeComponents={activeComponents}
        addActiveComponent={addActiveComponent}
        removeActiveComponent={removeActiveComponent}
      />
      <MainDesktop
        activeComponents={activeComponents}
        addActiveComponent={addActiveComponent}
        removeActiveComponent={removeActiveComponent}
        setBackgroundChoice={setBackgroundChoice}
        flicker={flicker}
        setFlicker={setFlicker}
        site={site}
        setSite={setSite}
        windowSize={windowSize}
        siteObj={siteObj}
      />
      <BottomDesktopBar
        activeComponents={activeComponents}
        setActiveComponents={setActiveComponents}
        addActiveComponent={addActiveComponent}
        backgroundChoice={backgroundChoice}
        removeActiveComponent={removeActiveComponent}
      />
    </div>
  );
}
