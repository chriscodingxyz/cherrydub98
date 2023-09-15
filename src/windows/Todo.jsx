import React, { useState } from "react";
import TodoContent from "./TodoContent";
import WindowLayout from "../components/WindowLayout";

export default function Todo({ activeComponents, removeActiveComponent }) {
  const [taskTheme, setTaskTheme] = useState("bg-yellow-100");
  return (
    <div>
      <WindowLayout
        activeComponents={activeComponents}
        removeActiveComponent={removeActiveComponent}
        windowType={"Todo"}
        windowIcon={"https://win98icons.alexmeub.com/icons/png/notepad-3.png"}
      >
        <div className={taskTheme}>
          <TodoContent setTaskTheme={setTaskTheme} />
        </div>
      </WindowLayout>
    </div>
  );
}

// import React, { useState } from "react";
// import TodoContent from "./TodoContent";

// export default function Todo({ activeComponents, removeActiveComponent }) {
//   const [taskTheme, setTaskTheme] = useState("bg-yellow-100");
//   const handleLinkClick = (event) => {
//     //this prevents any background event clickers to work, such as removing and readding the active component
//     event.stopPropagation();
//     removeActiveComponent("Todo");
//   };

//   const isActive =
//     (activeComponents ?? []).length > 0 && activeComponents[0] === "Todo";
//   const titleBarClassName = `title-bar${isActive ? "" : " inactive"}`;

//   return (
//     <div className="">
//       <div className="window inline-flex flex-col">
//         <div className={titleBarClassName}>
//           <div className="title-bar-text flex cursor-default">
//             <img
//               className="btn pr-1"
//               src="https://win98icons.alexmeub.com/icons/png/notepad-3.png"
//               alt=""
//             />
//             Todo
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
//         {/* <div className="window-body"> */}
//         <div className={taskTheme}>
//           <TodoContent setTaskTheme={setTaskTheme} />
//         </div>
//         {/* </div> */}
//       </div>
//     </div>
//   );
// }
