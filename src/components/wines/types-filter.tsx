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
    <div className="flex flex-col desktop:gap-[1.2rem] mobile:gap-[1.8rem] desktop:border-none desktop:p-0 mobile:pb-[3.2rem] mobile:border-solid mobile:border-b-[0.1rem] mobile:border-b-gray-100">
      <h3 className="text-gray-800 desktop:font-bold desktop:text-xl mobile:font-semiBold mobile:text-lg">
        WINE TYPES
      </h3>
      <div className="flex desktop:gap-[1.5rem] mobile:gap-[1rem]">
        {wineTypes.map((type) => (
          <Button
            key={type}
            type="button"
            size="small"
            color="white"
            addClassName={
              "rounded-[10rem] p-[1.4rem] text-center flex items-center font-medium text-lg focus:bg-primary focus:text-white"
            }
            onClick={() => handleTypeClick(type)} // 클릭 이벤트
          >
            {type}
          </Button>
        ))}
      </div>
    </div>
  );
}
