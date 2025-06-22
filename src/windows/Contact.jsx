import React from "react";
import { useAppContext } from "../context/AppContext";
import ContactContent from "./ContactContent";
import WindowLayout from "../components/WindowLayout";

export default function Contact() {
  return (
    <div>
      <WindowLayout
        windowType={"Contact"}
        windowIcon={
          "https://win98icons.alexmeub.com/icons/png/outlook_express-2.png"
        }
      >
        <div className="window-body">
          <ContactContent />
        </div>
      </WindowLayout>
    </div>
  );
}
