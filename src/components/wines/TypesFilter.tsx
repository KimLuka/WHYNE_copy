import Button from "../common/Button";

export default function TypesFilter() {
  return (
    <div className="flex flex-col gap-[1.2rem] w-auto">
      <h3 className="font-bold text-xl text-gray-800">WINE TYPES</h3>
      <div className="flex gap-[1.5rem]">
        <Button
          type="button"
          size="small"
          color="white"
          addClassName="rounded-[10rem] py-[1rem] px-[1.8rem] flex items-center font-medium text-lg text-gray-800 hover:text-white hover:bg-primary"
        >
          Red
        </Button>
        <Button
          type="button"
          size="small"
          color="white"
          addClassName="rounded-[10rem] py-[1rem] px-[1.8rem] flex items-center font-medium text-lg text-gray-800 hover:text-white hover:bg-primary"
        >
          White
        </Button>
        <Button
          type="button"
          size="small"
          color="white"
          addClassName="rounded-[10rem] py-[1rem] px-[1.8rem] flex items-center font-medium text-lg text-gray-800 hover:text-white hover:bg-primary"
        >
          Sparkling
        </Button>
      </div>
    </div>
  );
}
