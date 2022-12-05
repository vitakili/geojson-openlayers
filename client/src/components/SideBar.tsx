import { useState } from "react";
import { ISideBarProps } from "../Types";

interface ICustomProps {
  layerProps: ISideBarProps[] | undefined;
  sendValue: (value: string) => void;
}

export const SideBar: React.FC<ICustomProps> = ({layerProps, sendValue}) => {
  const [open, setOpen] = useState(true);


  const handleOnClick = (name: string) => {
    sendValue(name)
  }
  return (
    <div
      className={` ${
        open ? "w-72" : "w-0"
      } bg-blue-100 h-screen p-5  pt-8 absolute left-0 z-10 duration-300`}
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
            key={item.id}
            className={`${
              !open && "hidden"
            }  flex  rounded-md p-2 cursor-pointer hover:bg-white text-gray-700 items-center gap-x-4 
              mt-2 bg-blue-50
               `}
          >
            <span onClick={()=> handleOnClick(item.name)} className={`origin-left duration-200`}>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
