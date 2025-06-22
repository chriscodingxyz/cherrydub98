import React from "react";
import { useAppContext } from "../context/AppContext";
import DisplayContent from "./DisplayContent";
import WindowLayout from "../components/WindowLayout";

export default function Display() {
  const {
    backgroundChoice,
    setBackgroundChoice,
    flicker,
    setFlicker,
  } = useAppContext();

  return (
    <div>
      <WindowLayout
        windowType={"Display"}
        windowIcon={
          "https://win98icons.alexmeub.com/icons/png/display_properties-1.png"
        }
        buttonLayout={"?x"}
      >
        <div>
          <div className="window-body">
            <DisplayContent
              backgroundChoice={backgroundChoice}
              setBackgroundChoice={setBackgroundChoice}
              flicker={flicker}
              setFlicker={setFlicker}
            />
          </div>
        </div>
      </WindowLayout>
    </div>
  );
}
