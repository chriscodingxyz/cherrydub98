import { useEffect, useState } from "react";
import BottomDesktopBar from "./BottomDesktopBar";
import LeftDesktopNav from "./LeftDesktopNav";
import MainDesktop from "./MainDesktop";
import { useLocalStorage } from "@uidotdev/usehooks";
import "./flicker.css";
import { flicker, activeComponents } from "./signals";

export default function App() {
  useEffect(() => {
    console.log(activeComponents.value);
  }, [activeComponents.value]);

  // const [activeComponents, setActiveComponents] = useState([
  //   "Welcome",
  //   "Display",
  // ]);
  const [backgroundChoice, setBackgroundChoice] = useLocalStorage(
    "backgroundChoice",
    "background-pepe1"
  );
  // const [flicker, setFlicker] = useState(true);
  // const handleContactFormClose = (componentName) => {
  //   setActiveComponents((prevActiveComponents) =>
  //     prevActiveComponents.filter((name) => name !== componentName)
  //   );
  // };

  const addActiveComponent = (componentName) => {
    activeComponents.value = [
      componentName,
      ...activeComponents.value.filter((name) => name !== componentName),
    ];
    // setActiveComponents((prevActiveComponents) => [
    //   componentName,
    //   ...prevActiveComponents.filter((name) => name !== componentName),
    // ]);
  };

  const removeActiveComponent = (componentName) => {
    setActiveComponents((prevActiveComponents) =>
      prevActiveComponents.filter((name) => name !== componentName)
    );
  };

  return (
    <div
      className={`${backgroundChoice} ${flicker.value ? "crt" : ""}`}
      style={{ height: "100vh" }}
    >
      <LeftDesktopNav
        // activeComponents={activeComponents}
        addActiveComponent={addActiveComponent}
        removeActiveComponent={removeActiveComponent}
      />
      <MainDesktop
        // activeComponents={activeComponents}
        addActiveComponent={addActiveComponent}
        removeActiveComponent={removeActiveComponent}
        setBackgroundChoice={setBackgroundChoice}
      />
      <BottomDesktopBar
        // activeComponents={activeComponents}
        // setActiveComponents={setActiveComponents}
        addActiveComponent={addActiveComponent}
        backgroundChoice={backgroundChoice}
        removeActiveComponent={removeActiveComponent}
      />
    </div>
  );
}
