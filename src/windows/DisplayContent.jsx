import React, { useState, useEffect } from "react";

export default function DisplayContent({
  backgroundChoice,
  setBackgroundChoice,
  flicker,
  setFlicker,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const backgroundMobileArray = [
    "background-default",
    "background-cryptopunk-mobile",
    "background-cryptoadz-mobile",
    "background-pepe1",
    "background-pepe3",
    "background-circuitpepe-mobile",
    "background-numbers-mobile",
    // "background-ashpika",
    // "background-dbz1",
    // "background-tron",
    // "background-nyan",
  ];

  const backgroundDesktopArray = [
    "background-default",
    "background-cryptopunk",
    "background-cryptoadz",
    "background-pepe1",
    "background-pepe3",

    // "background-tron",
    // "background-nyan",
    // "background-future",
  ];

  // Retrieve the stored background choice from localStorage
  const storedBackgroundChoice = JSON.parse(
    localStorage.getItem("backgroundChoice")
  );

  const handleBackgroundChange = (event) => {
    event.preventDefault();
    setBackgroundChoice(event.target.value);
  };

  const toggleFlicker = () => {
    setFlicker(!flicker);
  };

  // const formatOptionText = (text) => {
  //   // Remove "background" and "-mobile" strings from the text
  //   return text.replace("background-", "").replace("-mobile", "");
  // };
  const formatOptionText = (text) => {
    if (text) {
      // Remove "background" and "-mobile" strings from the text
      return text.replace("background-", "").replace("-mobile", "");
    } else {
      return ""; // or handle the null case appropriately
    }
  };

  return (
    <div>
      <p>{isMobile ? "Mobile" : "Desktop"} wallpapers:</p>
      <select
        className="pr-5 pl-2"
        value={backgroundChoice}
        onChange={handleBackgroundChange}
        style={{ width: "100px" }}
      >
        {/* Use a new Set to remove duplicates and keep storedBackgroundChoice at the top */}
        {[
          ...new Set([
            storedBackgroundChoice,
            ...(isMobile ? backgroundMobileArray : backgroundDesktopArray),
          ]),
        ].map((choice) => (
          <option key={choice} value={choice}>
            {formatOptionText(choice)}
          </option>
        ))}
      </select>
      <br />
      <input
        type="checkbox"
        id="flicker"
        checked={flicker}
        onChange={toggleFlicker}
      />
      <label htmlFor="flicker">CRT screen effect</label>
    </div>
  );
}
