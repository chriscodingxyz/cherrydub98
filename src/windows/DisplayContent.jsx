import React, { useState, useEffect } from "react";

export default function DisplayContent({
  backgroundChoice,
  setBackgroundChoice,
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
    "background-pepe1",
    "background-pepe3",
    "background-ashpika",
    "background-dbz1",
    "background-tron",
    "background-nyan",
    "background-default",
  ];

  const backgroundDesktopArray = [
    "background-pepe1",
    "background-pepe3",
    "background-tron",
    "background-nyan",
    "background-future",
    "background-default",
  ];

  // Retrieve the stored background choice from localStorage
  const storedBackgroundChoice = JSON.parse(
    localStorage.getItem("backgroundChoice")
  );

  const handleBackgroundChange = (event) => {
    event.preventDefault();
    setBackgroundChoice(event.target.value);
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
            {choice ? choice.substring(11) : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
