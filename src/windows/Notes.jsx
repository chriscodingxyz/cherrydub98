import React from "react";
import NotesContent from "./NotesContent";
import WindowLayout from "../components/WindowLayout";

export default function Projects({ activeComponents, removeActiveComponent }) {
  return (
    <div>
      <WindowLayout
        activeComponents={activeComponents}
        removeActiveComponent={removeActiveComponent}
        windowType={"Notes"}
        windowIcon={
          "https://win98icons.alexmeub.com/icons/png/notepad_file-1.png"
        }
      >
        <div className="window-body">
          <div className="bg-white">
            <div className="bg-white border-l border-t border-gray-500">
              <NotesContent />
            </div>
          </div>
        </div>
      </WindowLayout>
    </div>
  );
}

// import React, { useState } from "react";
// import ProjectsContent from "./ProjectsContent";

// export default function Projects({ activeComponents, removeActiveComponent }) {
//   const [windowSize, setWindowSize] = useState(null);

//   const handleLinkClick = (event) => {
//     event.stopPropagation();
//     removeActiveComponent("Projects");
//   };

//   const isActive =
//     (activeComponents ?? []).length > 0 && activeComponents[0] === "Projects";
//   const titleBarClassName = `title-bar${isActive ? "" : " inactive"}`;

//   return (
//     <div className="">
//       <div className="window inline-flex flex-col" style={windowSize}>
//         <div className={titleBarClassName}>
//           <div className="title-bar-text flex cursor-default">
//             <img
//               className="btn pr-1"
//               src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-3.png"
//               alt=""
//             />
//             Projects
//           </div>
//           <div className="title-bar-controls">
//             <button
//               onClick={handleLinkClick}
//               className="bg-gray-300 btn hover:bg-gray-100"
//               aria-label="Minimize"
//             ></button>
//             <button
//               // onClick={handleMaxRestore}
//               className="bg-gray-300"
//               aria-label="Maximize"
//             ></button>
//             <button
//               onClick={handleLinkClick}
//               className="bg-gray-300 btn hover:bg-gray-100"
//               aria-label="Close"
//             ></button>
//           </div>
//         </div>
//         <div className="window-body">
//           <div className="bg-white border-l border-t border-gray-500">
//             <ProjectsContent />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
