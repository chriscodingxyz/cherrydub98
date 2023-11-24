import React from "react";
import { activeComponents } from "../signals";

export default function NavIconLayout({
  iconSrc,
  alt,
  title,
  linkTo,
  // activeComponents,
  handleLinkClick,
}) {
  return (
    <div
      className={`mb-2 text-center flex flex-col items-center hover:bg-white hover:bg-opacity-25 p-1 cursor-pointer ${
        activeComponents.value.includes(linkTo) ? "active" : ""
      }`}
      onClick={() => handleLinkClick(linkTo)}
    >
      {/* <a href={linkTo}> */}
      <img
        // src="https://win98icons.alexmeub.com/icons/png/computer_explorer_cool-0.png"
        src={iconSrc}
        alt={alt}
        width={"28px"}
        title={title}
      />
      <p className="text-white text-shadow-black">{title}</p>
      {/* </a> */}
    </div>
  );
}
