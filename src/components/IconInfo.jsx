import React from "react";

export default function IconInfo({ iconInfo, techObject }) {
  return (
    <div className="right-column border">
      <h5 className="font-bold">{iconInfo.title}</h5>
      <p>{iconInfo.description}</p>

      <div className="flex">
        {iconInfo.techStack.map((tech, index) => {
          return (
            <img
              key={index}
              src={techObject[tech]}
              alt={tech}
              title={tech}
              style={{
                width: "16px",
                height: "16px",
              }}
            />
          );
        })}
      </div>

      {/* Add any other information you want to display */}
    </div>
  );
}
