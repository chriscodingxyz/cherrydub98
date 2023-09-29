import React, { useState } from "react";
import IconInfo from "../components/IconInfo"; // Import the IconInfo component

const techObject = {
  css: "https://github.com/get-icon/geticon/raw/master/icons/css-3.svg",
  html: "https://github.com/get-icon/geticon/raw/master/icons/html-5.svg",
  node: "https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg",
  javascript:
    "https://github.com/get-icon/geticon/raw/master/icons/javascript.svg",
  react: "https://github.com/get-icon/geticon/raw/master/icons/react.svg",
  postgresql:
    "https://github.com/get-icon/geticon/raw/master/icons/postgresql.svg",
  vite: "https://github.com/get-icon/geticon/raw/master/icons/vite.svg",
  vscode:
    "https://github.com/get-icon/geticon/raw/master/icons/visual-studio-code.svg",
};

const icons = [
  {
    title: "JSON formatter",
    description:
      "Automatically fixes and formats JSON. Also has a handy path view with clickable keys to show the user path to their fetch URL",
    imageUrl: "https://win98icons.alexmeub.com/icons/png/html-4.png",
    link: "https://json.cherrydub.com/",
    techStack: ["javascript", "react"],
  },
  {
    title: "Smart Brain",
    description:
      "Automatically fixes and formats JSON. Also has a handy path view with clickable keys to show the user path to their fetch URL",
    imageUrl: "https://win98icons.alexmeub.com/icons/png/html-4.png",
    link: "https://smartbrain.cherrydub.com/",
    techStack: ["javascript", "react"],
  },
  {
    title: "Crypto App",
    description:
      "Automatically fixes and formats JSON. Also has a handy path view with clickable keys to show the user path to their fetch URL",
    imageUrl: "https://win98icons.alexmeub.com/icons/png/html-4.png",
    link: "https://crypto1.cherrydub.com/",
    techStack: ["javascript", "react"],
  },
  {
    title: "Popcorn Time",
    description:
      "Automatically fixes and formats JSON. Also has a handy path view with clickable keys to show the user path to their fetch URL",
    imageUrl: "https://win98icons.alexmeub.com/icons/png/html-4.png",
    link: "https://popcorntime.cherrydub.com/",
    techStack: ["javascript", "react"],
  },
  {
    title: "Blocklist",
    description:
      "Automatically fixes and formats JSON. Also has a handy path view with clickable keys to show the user path to their fetch URL",
    imageUrl: "https://win98icons.alexmeub.com/icons/png/html-4.png",
    link: "https://northcoders.com/projects/may-2023/blocklist",
    techStack: ["javascript", "react"],
  },
  {
    title: "NC Games",
    description:
      "Automatically fixes and formats JSON. Also has a handy path view with clickable keys to show the user path to their fetch URL",
    imageUrl: "https://win98icons.alexmeub.com/icons/png/html-4.png",
    link: "https://ncgames.cherrydub.com/",
    techStack: ["javascript", "react"],
  },
  // Add data for other icons
];

export default function ProjectsContent() {
  const [hoveredIcon, setHoveredIcon] = useState(icons[0]);

  const handleIconHover = (index) => {
    setHoveredIcon(icons[index]);
  };

  return (
    <div style={{ display: "flex", width: "50vw" }}>
      {/* Left Column */}
      <div className="left-column p-4 gap-4">
        {icons.map((icon, index) => (
          <a
            key={index}
            target="_blank"
            href={icon.link}
            onMouseEnter={() => handleIconHover(index)}
            style={{ textDecoration: "none" }} // Remove text decoration for links
          >
            <div className="icon-container flex">
              <img
                src={icon.imageUrl}
                alt={icon.title}
                style={{
                  width: "16px",
                  height: "16px",
                  marginRight: "0px", // Add some margin between icon and text
                }}
              />
              <span
                className="text-center ml-2"
                style={{ whiteSpace: "nowrap" }}
              >
                {icon.title}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Right Column */}
      {hoveredIcon && (
        <div className="p-4">
          <IconInfo iconInfo={hoveredIcon} techObject={techObject} />
        </div>
      )}
    </div>
  );
}
