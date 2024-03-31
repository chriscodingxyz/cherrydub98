import { useEffect, useState } from "react";
import BottomDesktopBar from "./BottomDesktopBar";
import LeftDesktopNav from "./LeftDesktopNav";
import MainDesktop from "./MainDesktop";
import { useLocalStorage } from "@uidotdev/usehooks";
import "./flicker.css";
import { useSignal } from "@preact/signals-react"; // Import useSignal hook

export default function App() {
  const flicker = useSignal(true); // Use useSignal hook to create flicker signal
  const activeComponents = useSignal(["Welcome", "Display"]); // Use useSignal hook to create activeComponents signal
  const count = useSignal(0);
  useEffect(() => {
    console.log(activeComponents.value);
  }, [activeComponents.value]);

  const [backgroundChoice, setBackgroundChoice] = useLocalStorage(
    "backgroundChoice",
    "background-pepe1"
  );

  const addActiveComponent = (componentName) => {
    activeComponents.value = [
      componentName,
      ...activeComponents.value.filter((name) => name !== componentName),
    ];
  };

  const removeActiveComponent = (componentName) => {
    activeComponents.value = activeComponents.value.filter(
      (name) => name !== componentName
    );
  };

  return (
    <div
      className={`${backgroundChoice} ${flicker.value ? "crt" : ""}`}
      style={{ height: "100vh" }}
    >
      <LeftDesktopNav
        activeComponents={activeComponents}
        addActiveComponent={addActiveComponent}
        removeActiveComponent={removeActiveComponent}
      />
      <MainDesktop
        flicker={flicker}
        activeComponents={activeComponents}
        addActiveComponent={addActiveComponent}
        removeActiveComponent={removeActiveComponent}
        setBackgroundChoice={setBackgroundChoice}
      />
      <BottomDesktopBar
        activeComponents={activeComponents}
        addActiveComponent={addActiveComponent}
        backgroundChoice={backgroundChoice}
        removeActiveComponent={removeActiveComponent}
      />
    </div>
  );
}
