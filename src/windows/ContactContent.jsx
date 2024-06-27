import { useState } from "react";
import ContactForm from "../components/ContactForm";

export default function ContactContent({ removeActiveComponent }) {
  return (
    <div className="flex flex-col">
      <ContactForm removeActiveComponent={removeActiveComponent} />
    </div>
  );
}
