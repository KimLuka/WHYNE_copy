import Image from "next/image";
import filter from "../../../public/icons/filter.svg";
import { JSX } from "react";

export default function FilterButton(): JSX.Element {
  return (
    <>
      <button
        /* 필터 모달창 띄우기 */
        className="desktop:hidden tablet:w-[4.8rem] tablet:h-[4.8rem] mobile:w-[3.8rem] mobile:h-[3.8rem] rounded-[0.8rem] border-solid border-[0.1rem] border-gray-300 hover:bg-[#7b52f1] transition-all duration-300 ease-in-out"
      >
        <Image width={48} src={filter} alt="필터 선택" />
      </button>
    </>
  );
}
