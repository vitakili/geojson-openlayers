import React, { useRef, useState } from "react";

// interface PopoverProps {
//   showPopover: boolean;
//   hoverText: string;
// }

export const Popover= (): JSX.Element => {
  //   const PopoverStyle = `absolute w-max bg-white rounded border-grey-100 my-2 px-4 py-1 transition-all ease-in-out duration-150 text-sm hover:cursor-auto ${
  //     showPopover ? "opacity-100" : "opacity-0"
  //   }`;

  return (
    <div
      // data-popover
      // id="popover-click"
      // role="Popover"
      className="absolute z-10 inline-block w-64 text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
    >
      <div className="px-3 py-2">
        {/* {hoverText} */}
        <p>And here's some amazing content. It's very engaging. Right?</p>
      </div>
      <div data-popper-arrow></div>
    </div>
  );
};
