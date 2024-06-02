import { useState } from "react";
import { siteObj } from "./lib/data";
import BottomDesktopBar from "./BottomDesktopBar";
import LeftDesktopNav from "./LeftDesktopNav";
import MainDesktop from "./MainDesktop";
import { useLocalStorage, useWindowSize } from "@uidotdev/usehooks";
import "./flicker.css";
import Landing from "./components/Landing";

export default function App() {
  const [activeComponents, setActiveComponents] = useState([
    "Welcome",
    "Display",
  ]);
  const [backgroundChoice, setBackgroundChoice] = useLocalStorage(
    "backgroundChoice",
    "background-default"
  );
  const [flicker, setFlicker] = useLocalStorage("flicker", false);

  // const [flicker, setFlicker] = useState(true);
  const windowSize = useWindowSize();
  const [site, setSite] = useState(siteObj.Portfolio);
  const [isLoading, setIsLoading] = useState(true);

  // const handleContactFormClose = (componentName) => {
  //   setActiveComponents((prevActiveComponents) =>
  //     prevActiveComponents.filter((name) => name !== componentName)
  //   );
  // };

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  console.log(new Date());

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
      {isLoading && <Landing />}
      <div className="main-app">
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
    </div>
  );
}
