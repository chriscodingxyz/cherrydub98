import React from "react";
import CvContent from "./CvContent";
import floppy from "/icons/floppy-disk-dark.svg";
import printer from "/icons/16x16/printer-1.png";
import WindowLayout from "../components/WindowLayout";

export default function Cv({ activeComponents, removeActiveComponent }) {
  const handlePrintClick = () => {
    window.open(
      "https://raw.githubusercontent.com/cherrydub/cherrydub/main/ChrisWisniewskiCV.pdf",
      "_blank"
    );
  };
  return (
    <div>
      <WindowLayout
        activeComponents={activeComponents}
        removeActiveComponent={removeActiveComponent}
        windowType={"Cv"}
        windowIcon={
          "https://win98icons.alexmeub.com/icons/png/message_file-1.png"
        }
      >
        <div className="window-body">
          <CvContent />
        </div>
        <div className="status-bar -mt-2 ">
          <span className="status-bar-field text-center">
            <a href="https://raw.githubusercontent.com/cherrydub/cherrydub/main/ChrisWisniewskiCV.pdf">
              <img className="inline" src={floppy} width={"14px"} alt="" />
            </a>
          </span>
          <span className="status-bar-field text-center">
            <img
              onClick={handlePrintClick}
              className="inline hover:cursor-pointer"
              src={printer}
              alt=""
            />
          </span>
          <span className="status-bar-field text-center">
            <a
              target="_blank"
              href="https://github.com/cherrydub/cherrydub/blob/main/ChrisWisniewskiCV.pdf"
            >
              <img
                className="inline"
                src="https://win98icons.alexmeub.com/icons/png/directory_e-3.png"
                alt=""
              />
            </a>
          </span>
        </div>
      </WindowLayout>
    </div>
  );
}

// export default function Cv({ activeComponents, removeActiveComponent }) {
//   const handleLinkClick = (event) => {
//     //this prevents any background event clickers to work, such as removing and readding the active component
//     event.stopPropagation();
//     removeActiveComponent("Cv");
//   };

//   const handleSizeClick = () => {};

//   const handlePrintClick = () => {
//     window.open(
//       "https://raw.githubusercontent.com/cherrydub/cherrydub/main/ChrisWisniewskiCV.pdf",
//       "_blank"
//     );
//   };

//   const isActive =
//     (activeComponents ?? []).length > 0 && activeComponents[0] === "Cv";
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
//               src="https://win98icons.alexmeub.com/icons/png/message_file-1.png"
//               alt=""
//             />
//             CV
//           </div>
//           <div className="title-bar-controls">
//             <button
//               onClick={handleLinkClick}
//               className="bg-gray-300 btn hover:bg-gray-100"
//               aria-label="Minimize"
//             ></button>
//             <button className="bg-gray-300" aria-label="Maximize"></button>
//             <button
//               onClick={handleLinkClick}
//               className="bg-gray-300 btn hover:bg-gray-100"
//               aria-label="Close"
//             ></button>
//           </div>
//         </div>

//         <div className="window-body">
//           <CvContent />
//         </div>
//         <div className="status-bar -mt-2 ">
//           <span className="status-bar-field text-center">
//             <a href="https://raw.githubusercontent.com/cherrydub/cherrydub/main/ChrisWisniewskiCV.pdf">
//               <img className="inline" src={floppy} width={"14px"} alt="" />
//             </a>
//           </span>
//           <span className="status-bar-field text-center">
//             <img
//               onClick={handlePrintClick}
//               className="inline hover:cursor-pointer"
//               src={printer}
//               alt=""
//             />
//           </span>
//           <span className="status-bar-field text-center">
//             <a
//               target="_blank"
//               href="https://github.com/cherrydub/cherrydub/blob/main/ChrisWisniewskiCV.pdf"
//             >
//               <img
//                 className="inline"
//                 src="https://win98icons.alexmeub.com/icons/png/directory_e-3.png"
//                 alt=""
//               />
//             </a>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }
