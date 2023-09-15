import React from "react";
import WindowLayout from "../components/WindowLayout";

export default function Memes({ activeComponents, removeActiveComponent }) {
  return (
    <div>
      <WindowLayout
        activeComponents={activeComponents}
        removeActiveComponent={removeActiveComponent}
        windowType={"Memes"}
      >
        Memes here buddy
      </WindowLayout>
    </div>
  );
}
