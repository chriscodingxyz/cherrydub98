import React from "react";
import ContactContent from "./ContactContent";
import WindowLayout from "../components/WindowLayout";

export default function Projects({ activeComponents, removeActiveComponent }) {
  return (
    <div>
      <WindowLayout
        activeComponents={activeComponents}
        removeActiveComponent={removeActiveComponent}
        windowType={"Contact"}
        windowIcon={
          "https://win98icons.alexmeub.com/icons/png/outlook_express-2.png"
        }
      >
        <div className="window-body">
          <ContactContent removeActiveComponent={removeActiveComponent} />
        </div>
      </WindowLayout>
    </div>
  );
}
