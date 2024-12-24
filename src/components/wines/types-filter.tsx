import Button from "../common/Button";

interface TypesFilterProps {
  onChange: (type: string) => void; // 선택된 타입을 전달하는 콜백
}

export default function TypesFilter({ onChange }: TypesFilterProps) {
  const wineTypes = ["RED", "WHITE", "SPARKLING"];

  // 타입 클릭 핸들러
  const handleTypeClick = (type: string) => {
    onChange(type); // 부모 컴포넌트로 선택된 타입 전달
  };

  return (
    <div className="flex flex-col gap-[1.2rem] w-auto">
      <h3 className="font-bold text-xl text-gray-800">WINE TYPES</h3>
      <div className="flex gap-[1.5rem]">
        {wineTypes.map((type) => (
          <Button
            key={type}
            type="button"
            size="small"
            color="white"
            addClassName="rounded-[10rem] py-[1rem] px-[1.8rem] flex items-center font-medium text-lg text-gray-800 hover:text-white hover:bg-primary"
            onClick={() => handleTypeClick(type)} // 클릭 이벤트
          >
            {type}
          </Button>
        ))}
      </div>
    </div>
  );
}
