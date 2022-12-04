
interface IPropType {
  // showPopover: boolean;
  popVal: {
    OBJEKT?: String;
    NAZEV?: String;
    ID_ZAST?: Number;
    ID_PMDP_GPS?: String;
    TYP?: String;
  };
}

export const Popover = ({ popVal }: IPropType): JSX.Element => {
  const mapArray = Object.values(popVal).map((item:any, i) => {
    return <p key={i}>{item}</p>;
  });
  return (
    <div
      role="tooltip"
      data-popover
      id="popup-container"
      className={`absolute inline-block w-64 h-32 -left-32 -top-[9.5rem] drop-shadow-lg bg-white rounded border-grey-100 my-2 px-4 py-1 transition-all 
      ease-in-out duration-150 text-sm hover:cursor-auto ${
        Object.keys(popVal).length !== 0 ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="px-3 py-2">
        {mapArray}
      </div>
    </div>
  );
};
