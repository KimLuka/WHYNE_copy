import Image from "next/image";
import search from "../../../public/icons/small_search.svg";

export default function SearchBar() {
  return (
    <>
      <div className="desktop:flex desktop:justify-end ">
        <div className="flex relative gap-[1rem] items-center desktop:w-[76rem] desktop:h-[4.8rem] tablet:w-[39.6rem] tablet:h-[4.8rem] mobile:w-full mobile:h-[3.8rem]">
          <Image
            width={20}
            src={search}
            alt="검색하기"
            className="absolute z-10 tablet:left-[2.5rem] mobile:left-[1.5rem]"
          />
          <input
            placeholder="와인을 검색해 보세요"
            className="w-full rounded-[5rem] text-gray-500 border-solid border-[0.1rem] border-gray-300 tablet:h-[4.8rem] mobile:h-[3.8rem] tablet:font-regular mobile:font-medium tablet:text-lg mobile:text-md tablet:pl-[5.5rem] mobile:pl-[4.5rem] py-[1.4rem] tablet:px-[2rem] mobile:px-[1.5rem]"
          />
        </div>
      </div>
    </>
  );
}
