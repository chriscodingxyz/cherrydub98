import React from "react";

export default function NavIconHrefLayout({
  iconSrc,
  alt,
  title,
  linkTo,
  target,
}) {
  return (
    <div className="mb-2 text-center flex flex-col items-center hover:bg-white hover:bg-opacity-25 p-1 cursor-pointer">
      <a href={linkTo} target={target}>
        <img src={iconSrc} alt={alt} width={"28px"} title={title} />
        <p className="text-white text-shadow-black">{title}</p>
      </a>
    </div>
  );
}
