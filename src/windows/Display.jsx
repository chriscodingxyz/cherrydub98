import React from "react";
import DisplayContent from "./DisplayContent";

import WindowLayout from "../components/WindowLayout";

export default function Display({
  activeComponents,
  removeActiveComponent,
  backgroundChoice,
  setBackgroundChoice,
}) {
  return (
    <div>
      <WindowLayout
        activeComponents={activeComponents}
        removeActiveComponent={removeActiveComponent}
        windowType={"Display"}
        windowIcon={
          "https://win98icons.alexmeub.com/icons/png/display_properties-1.png"
        }
      >
        <div>
          <div className="window-body">
            <DisplayContent
              backgroundChoice={backgroundChoice}
              setBackgroundChoice={setBackgroundChoice}
            />
          </div>
        </div>
      </WindowLayout>
    </div>
  );
}

// export default function Display({
//   activeComponents,
//   removeActiveComponent,
//   backgroundChoice,
//   setBackgroundChoice,
// }) {
//   const handleLinkClick = (event) => {
//     //this prevents any background event clickers to work, such as removing and readding the active component
//     event.stopPropagation();
//     removeActiveComponent("Display");
//   };

//   const handleSizeClick = () => {};

//   const isActive =
//     (activeComponents ?? []).length > 0 && activeComponents[0] === "Display";
//   const titleBarClassName = `title-bar${isActive ? "" : " inactive"}`;

//   return (
//     <div className="">
//       {/* <div className="flex justify-center"> */}
//       <div
//         className="window"
//         // style={{ minWidth: "85vw", maxWidth: "100%" }}
//       >
//         <div className={titleBarClassName}>
//           <div className="title-bar-text flex cursor-default">
//             <img
//               className="btn pr-1"
//               src="https://win98icons.alexmeub.com/icons/png/display_properties-1.png"
//               alt=""
//             />
//             Display
//           </div>
//           <div className="title-bar-controls">
//             {/* <button className="bg-gray-300" aria-label="Minimize"></button> */}
//             <button
//               onClick={handleSizeClick}
//               className="bg-gray-300"
//               aria-label="Help"
//             ></button>
//             <button
//               onClick={handleLinkClick}
//               className="bg-gray-300 btn hover:bg-gray-100"
//               aria-label="Close"
//             ></button>
//           </div>
//         </div>
//         <div className="window-body">
//           <DisplayContent
//             backgroundChoice={backgroundChoice}
//             setBackgroundChoice={setBackgroundChoice}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
