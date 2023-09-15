import React from "react";
//before hover/active
import computericon from "/icons/48x48/computer_explorer_cool-0copy.png";

export default function LeftDesktopNav({
  activeComponents,
  addActiveComponent,
  removeActiveComponent,
}) {
  const handleLinkClick = (componentName) => {
    if (activeComponents.includes(componentName)) {
      removeActiveComponent(componentName);
      addActiveComponent(componentName);
    } else {
      addActiveComponent(componentName);
    }
  };
  return (
    <div className="navigation-desktop fixed left-2 top-3 text-white">
      <div className="mb-2 text-center flex flex-col items-center hover:bg-white hover:bg-opacity-25 p-1 cursor-pointer">
        <a href="">
          <img
            // src="https://win98icons.alexmeub.com/icons/png/computer_explorer_cool-0.png"
            src={computericon}
            alt="home"
            width={"28px"}
            title="Welcome"
          />
          <p className="text-white text-shadow-black">Home</p>
        </a>
      </div>
      <div
        className={`mb-2 text-center flex flex-col items-center hover:bg-white hover:bg-opacity-25 p-1 cursor-pointer ${
          activeComponents.includes("Projects") ? "active" : ""
        }`}
        onClick={() => handleLinkClick("Projects")}
      >
        <img
          src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png"
          alt="projects"
          width={"28px"}
          title="Projects"
        />
        <p className="text-white text-shadow-black">Projects</p>
      </div>

      {/* CV Link */}
      <div
        className={`mb-2 text-center flex flex-col items-center hover:bg-white hover:bg-opacity-25 p-1 cursor-pointer ${
          activeComponents.includes("Cv") ? "active" : ""
        }`}
        onClick={() => handleLinkClick("Cv")}
      >
        <img
          src="https://win98icons.alexmeub.com/icons/png/message_file-0.png"
          alt="cv"
          width={"28px"}
          title="Resume"
        />
        <p className="text-white text-shadow-black">CV</p>
      </div>

      <div
        className={`mb-2 text-center flex flex-col items-center hover:bg-white hover:bg-opacity-25 p-1 cursor-pointer ${
          activeComponents.includes("Todo") ? "active" : ""
        }`}
        onClick={() => handleLinkClick("Todo")}
      >
        <img
          src="https://win98icons.alexmeub.com/icons/png/notepad-5.png"
          // src="https://win98icons.alexmeub.com/icons/png/template_empty-5.png"
          alt="todo"
          width={"28px"}
          title="Todo List"
        />
        <p className="text-white text-shadow-black">Todo</p>
      </div>

      {/* <div
        className={`mb-2 text-center flex flex-col items-center ${
          activeComponents.includes("Timer") ? "active" : ""
        }`}
        onClick={() => handleLinkClick("Timer")}
      >
        <img
          src="https://win98icons.alexmeub.com/icons/png/clock-1.png"
          alt="timer"
          width={"28px"}
        />
        <p className="">Timer</p>
      </div> */}

      {/* <div
        className={`mb-2 text-center flex flex-col items-center hover:bg-white hover:bg-opacity-25 p-1 cursor-pointer ${
          activeComponents.includes("IE") ? "active" : ""
        }`}
        onClick={() => handleLinkClick("IE")}
      >
        <img
          src="https://win98icons.alexmeub.com/icons/png/msie1-2.png"
          alt="IE"
          width={"28px"}
        />
        <p className="">IE</p>
      </div> */}

      <div className="mb-2 text-center flex flex-col items-center hover:bg-white hover:bg-opacity-25 p-1 cursor-pointer ">
        <a href="https://github.com/cherrydub" target="_blank">
          <img
            className="mx-auto"
            src="https://win98icons.alexmeub.com/icons/png/msie1-2.png"
            alt="GitHub"
            width={"28px"}
            title="Cherrydub GitHub"
          />
          <p className="text-white text-shadow-black">GitHub</p>
        </a>
      </div>

      {/* <div className="mb-2 text-center flex flex-col items-center ">
        <img
          src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs_2k-4.png"
          alt="other"
          width={"28px"}
        />
        <p className="">Other</p>
      </div>
      <div className="mb-2 text-center flex flex-col items-center">
        <img
          src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png"
          alt="misc"
          width={"28px"}
        />
        <p className="">Misc</p>
      </div> */}

      <div
        className={`mb-2 text-center flex flex-col items-center hover:bg-white hover:bg-opacity-25 p-1 cursor-pointer ${
          activeComponents.includes("Contact") ? "active" : ""
        }`}
        onClick={() => handleLinkClick("Contact")}
      >
        <img
          src="https://win98icons.alexmeub.com/icons/png/outlook_express-4.png"
          alt="email"
          width={"28px"}
          title="Contact"
        />
        <p className="">Contact</p>
      </div>

      {/* <div className=" mb-2 text-center flex flex-col items-center hover:bg-white hover:bg-opacity-25 p-1 cursor-pointer ">
        <a href="mailto:chriscoding@icloud.com">
          <img
            className="mx-auto"
            src="https://win98icons.alexmeub.com/icons/png/outlook_express-4.png"
            alt="chriscoding@icloud.com"
            width={"28px"}
            title="chriscoding@icloud.com"
          />
          <p className="text-white text-shadow-black">Contact</p>
        </a>
      </div> */}

      {/* <div
        className={`mb-2 text-center flex flex-col items-center hover:bg-white hover:bg-opacity-25 p-1 cursor-pointer ${
          activeComponents.includes("Memes") ? "active" : ""
        }`}
        onClick={() => handleLinkClick("Memes")}
      >
        <img
          className="mx-auto"
          src="https://win98icons.alexmeub.com/icons/png/briefcase-2.png"
          alt="memes"
          width={"28px"}
          title="Lulz"
        />
        <p className="text-white text-shadow-black">Memes</p>
      </div> */}
    </div>
  );
}
