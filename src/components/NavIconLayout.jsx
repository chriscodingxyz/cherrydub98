import React, { useState, useEffect, useRef } from "react";

export default function NavIconLayout({
  iconSrc,
  alt,
  title,
  linkTo,
  activeComponents,
  handleLinkClick,
}) {
  const [blueActive, setBlueActive] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the clicked element is not part of the component
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setBlueActive(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [componentRef]);

  return (
    <div
      ref={componentRef}
      className={`mb-2 text-center flex flex-col items-center hover:bg-white hover:bg-opacity-25 p-1 cursor-pointer ${
        blueActive ? "active" : ""
      }`}
      onClick={() => {
        handleLinkClick(linkTo);
        setBlueActive(true);
      }}
    >
      <img
        src={iconSrc}
        alt={alt}
        width={"28px"}
        title={title}
        className={blueActive ? "active-img" : ""}
      />
      <p
        className={`text-white text-shadow-black ${
          blueActive ? "active-text" : ""
        }`}
      >
        {title}
      </p>
    </div>
  );
}
