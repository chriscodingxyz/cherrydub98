import { useState } from "react";
import ContactForm from "../components/ContactForm";

export default function ContactContent({ removeActiveComponent }) {
  return (
    <div className="flex flex-col">
      <ContactForm removeActiveComponent={removeActiveComponent} />
      {/* <p className="text-center font-bold flex justify-center">
        <a href="mailto:chriscoding@icloud.com">
          {" "}
          <img
            src="https://win98icons.alexmeub.com/icons/png/outlook_express-2.png"
            alt=""
          />
        </a>
      </p> */}
    </div>
  );
}
