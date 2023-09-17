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
      >
        <option value="background-pepe3">Pepe 2</option>

        {isMobile ? (
          <>
            <option value="background-pepe1">Pepe 1</option>
            {/* <option value="background-pepe3">Pepe 2</option> */}
            <option value="background-ashpika">Pokemon</option>
            <option value="background-dbz1">DragonBall Z</option>
            <option value="background-tron">Tron</option>
            <option value="background-nyan">Nyan</option>
            {/* <option value="background-robocop">Robocop</option> */}
            <option value="background-default">Classic: Green</option>
          </>
        ) : (
          <>
            <option value="background-pepe1">Pepe 1</option>
            <option value="background-tron">Tron</option>
            <option value="background-nyan">Nyan</option>
            {/* <option value="background-pepe3">Pepe 2</option> */}
            <option value="background-default">Classic: Green</option>

            {/* <option value="background-98-sky-logo">98-Sky</option> */}
            {/* <option value="background-98-cougar">98-Cougar</option> */}
            {/* <option value="background-98-leopard">98-Leopard</option>
            <option value="background-98-space">98-Space</option>
            <option value="background-98-ocean">98-Ocean</option>
            <option value="background-98-computer">98-Computer</option> */}
            {/* <option value="background-xp-classic">XP-Classic</option> */}
          </>
        )}
      </select>
    </div>
  );
}
