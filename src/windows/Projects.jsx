import React from "react";
import { siteObj } from "../lib/data";
import WindowLayout from "../components/WindowLayout";

export default function Projects() {

  const handleClick = (site) => {
    window.open(site, "_blank");
  };

  return (
    <div>
      <WindowLayout
        windowType={"Projects"}
        windowIcon={
          "https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-3.png"
        }
      >
        <div className="window-body">
          <div className="bg-white">
            <div className="bg-white border-l border-t border-gray-500">
              <div className="flex flex-wrap p-4 gap-4 max-w-xs sm:max-w-none" style={{ color: "#0000ff" }}>
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
            </div>
          </div>
        </div>
      </WindowLayout>
    </div>
  );
}
