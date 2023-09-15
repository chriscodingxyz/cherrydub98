import React from "react";

export default function IEContent() {
  return (
    <div
      className="bg-white p-0 text-black"
      style={{
        height: "75vh",

        overflow: "auto",
      }}
    >
      <iframe
        src="https://www.spacejam.com/1996/"
        frameborder="0"
        height={"100%"}
        width={"100%"}
      ></iframe>
    </div>
  );
}
