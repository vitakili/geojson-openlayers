import React, { useRef, useState } from "react";

interface PopoverProps {
  // showPopover: boolean;
  // hoverText: string;
  popVal: {
    OBJEKT?: String;
    NAZEV?: String;
  };
}

export const Popover = ({ popVal }: PopoverProps): JSX.Element => {
    // const PopoverStyle = `absolute w-max bg-white rounded border-grey-100 my-2 px-4 py-1 transition-all ease-in-out duration-150 text-sm hover:cursor-auto ${
    //   showPopover ? "opacity-100" : "opacity-0"
    // }`;
  console.log(popVal);
  return (
    <div
      // data-popover
      id="popup-container"
      // role="Popover"
      className={`absolute w-max bg-white rounded border-grey-100 my-2 px-4 py-1 transition-all ease-in-out duration-150 text-sm hover:cursor-auto ${
        Object.keys(popVal).length !== 0 ? "opacity-100" : "opacity-0"
      }`}
      >
      <div className="px-3 py-2">
        {Object.values(popVal).map((item) => {
          return `<p>${item}</p>`
        })}
      </div>
      <div data-popper-arrow></div>
    </div>
  );
};
