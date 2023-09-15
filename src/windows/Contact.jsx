import React from "react";
import ContactContent from "./ContactContent";
import WindowLayout from "../components/WindowLayout";

export default function Projects({ activeComponents, removeActiveComponent }) {
  return (
    <div>
      <WindowLayout
        activeComponents={activeComponents}
        removeActiveComponent={removeActiveComponent}
        windowType={"Contact"}
        windowIcon={
          "https://win98icons.alexmeub.com/icons/png/outlook_express-2.png"
        }
      >
        <div className="window-body">
          <ContactContent removeActiveComponent={removeActiveComponent} />
        </div>
      </WindowLayout>
    </div>
  );
}

// export default function Contact({ activeComponents, removeActiveComponent }) {
//   const handleLinkClick = (event) => {
//     //this prevents any background event clickers to work, such as removing and readding the active component
//     event.stopPropagation();
//     removeActiveComponent("Contact");
//   };

//   const handleSizeClick = () => {};

//   const isActive =
//     (activeComponents ?? []).length > 0 && activeComponents[0] === "Contact";
//   const titleBarClassName = `title-bar${isActive ? "" : " inactive"}`;

//   return (
//     <div className="">
//       {/* <div className="flex justify-center"> */}
//       <div
//         className="window "
//         // style={{ minWidth: "85vw", maxWidth: "100%" }}
//       >
//         <div className={titleBarClassName}>
//           <div className="title-bar-text flex cursor-default">
//             <img
//               className="btn pr-1"
//               src="https://win98icons.alexmeub.com/icons/png/outlook_express-2.png"
//               alt=""
//             />
//             Contact
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
//           <div className="">
//             <ContactContent removeActiveComponent={removeActiveComponent} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
