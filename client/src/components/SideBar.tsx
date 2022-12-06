import { useState } from "react";
import { EnumLayerName, ISideBarProps } from "../Types";

interface ICustomProps {
  layerProps: ISideBarProps[] | undefined;
  sendValue: (value: string) => void;
}

export const SideBar: React.FC<ICustomProps> = ({ layerProps, sendValue }) => {
  const [open, setOpen] = useState(true);
  // const [active, setActive] = useState(false);
  let vectorName = EnumLayerName.Name as string;

  const handleOnClick = (name: string) => {
    sendValue(name);
  };
  // absolute left-0 z-10
  return (
    <div
      className={` ${
        open ? "w-72" : "w-0"
      } bg-blue-100 h-screen p-5 relative pt-8  duration-300`}
    >
      <img
        src="./src/assets/location-pin.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 z-10
           border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src="./src/assets/location-pin.png"
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
        />
      </div>
      <ul className="pt-6">
        {layerProps?.map((item) => (
          <li
            key={item.name}
            className={`${
              !open && "hidden"
            }  flex  rounded-md p-2 cursor-pointer hover:bg-white text-gray-700 items-center gap-x-4 
              mt-2 bg-blue-50
               `}
            onClick={() => handleOnClick(item.name)}
          >
            <span className={`origin-left duration-200`}>{item.name}</span>
          </li>
        ))}
        <li
          key={vectorName}
          className={`${
            !open && "hidden"
          }  flex  rounded-md p-2 cursor-pointer hover:bg-white text-gray-700 items-center gap-x-4 
              mt-2 bg-blue-50
               `}
          onClick={() => handleOnClick(vectorName)}
        >
          <span className={`origin-left duration-200`}>{vectorName}</span>
        </li>
      </ul>
    </div>
  );
};
