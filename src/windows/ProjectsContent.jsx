import React from "react";

import { siteObj } from "../lib/data";

export default function ProjectsContent({ setSite, addActiveComponent }) {
  const handleClick = (site) => {
    setSite(site);
    setTimeout(() => {
      addActiveComponent("IE");
    }, 100);
  };

  return (
    <div className="flex flex-wrap p-4 gap-4" style={{ color: "#0000ff" }}>
      {Object.entries(siteObj).map(([key, url]) => (
        <div
          key={key}
          onClick={() => handleClick(url)}
          className="flex flex-col items-center overflow-auto hover:cursor-pointer"
        >
          <img
            src="https://win98icons.alexmeub.com/icons/png/html-5.png"
            alt={key}
          />
          <div className="text-center">{key}</div>
        </div>
      ))}
      <a
        target="_blank"
        href="https://northcoders.com/projects/may-2023/blocklist"
        className="flex flex-col items-center"
      >
        <img
          src="https://win98icons.alexmeub.com/icons/png/html2_new-4.png"
          alt="Blocklist"
        />
        <div className="text-center">Blocklist</div>
      </a>
    </div>
  );
}
