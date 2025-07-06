import React from 'react'
import WelcomeContent from './WelcomeContent'

import WindowLayout from '../components/WindowLayout'

const titleString = 'C:\\WINDOWS\\System32.cmd.exe'

export default function Welcome ({ activeComponents, removeActiveComponent }) {
  return (
    <div>
      <WindowLayout
        activeComponents={activeComponents}
        removeActiveComponent={removeActiveComponent}
        windowType={'Welcome'}
        windowTitle={titleString}
        windowIcon={
          'https://win98icons.alexmeub.com/icons/png/console_prompt-1.png'
        }
        buttonLayout={'?x'}
        hyperlink={'https://chriswiz.vercel.app/'}
      >
        <div>
          <WelcomeContent />
        </div>
      </WindowLayout>
    </div>
  )
}

// export default function Welcome({ activeComponents, removeActiveComponent }) {
//   const handleLinkClick = (event) => {
//     //this prevents any background event clickers to work, such as removing and readding the active component
//     event.stopPropagation();
//     removeActiveComponent("Welcome");
//   };

//   const isActive =
//     (activeComponents ?? []).length > 0 && activeComponents[0] === "Welcome";
//   const titleBarClassName = `title-bar${isActive ? "" : " inactive"}`;

//   return (
//     <div className="">
//       {/* <div className="flex justify-center"> */}
//       <div className="inline-flex flex-col window">
//         <div className={titleBarClassName}>
//           <div className="flex cursor-default title-bar-text">
//             <img
//               className="pr-1 btn"
//               src="https://win98icons.alexmeub.com/icons/png/console_prompt-1.png"
//               alt="welcome"
//             />
//             C:\WINDOWS\System32.cmd.exe
//           </div>
//           <div className="title-bar-controls">
//             <a href="https://crypto1.cherrydub.com/" target="_blank">
//               <button
//                 className="bg-gray-300 btn hover:bg-gray-100"
//                 aria-label="Help"
//               ></button>
//             </a>

//             <button
//               onClick={handleLinkClick}
//               className="bg-gray-300 btn hover:bg-gray-100"
//               aria-label="Close"
//             ></button>
//           </div>
//         </div>
//         {/* <div className="window-body"> */}
//         <div className="bg-transparent">
//           <WelcomeContent />
//           {/* </div> */}
//         </div>
//       </div>
//     </div>
//   );
// }
