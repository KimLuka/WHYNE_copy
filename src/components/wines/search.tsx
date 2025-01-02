"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Image from "next/image";
import search from "../../../public/icons/small_search.svg";

interface SearchProps {
  onChange: (search: string) => void; // 부모로 검색어를 전달하는 콜백
}

export default function Search({ onChange }: SearchProps) {
  return <SearchBar onChange={onChange} />;
}

function SearchBar({ onChange }: { onChange: (search: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced 콜백 설정: onChange 호출을 500ms 지연
  const debouncedOnChange = useDebouncedCallback((value: string) => {
    onChange(value); // 부모로 검색어 전달
    console.log("검색어 전달됨:", value);
  }, 500);

  const handleInputChange = (value: string) => {
    setSearchTerm(value); // 입력값 즉시 반영
    debouncedOnChange(value); // debounce 처리된 콜백 호출
  };

  return (
    <div className="flex desktop:justify-end relative gap-[1rem] items-center desktop:w-[80rem] desktop:h-[4.8rem] tablet:w-[39.6rem] tablet:h-[4.8rem] mobile:w-[34.3rem] mobile:h-[3.8rem]">
      <Image
        width={20}
        src={search}
        alt="검색하기"
        className="absolute z-10 desktop:left-[2.5rem] tablet:right-[35rem] mobile:left-[1.7rem]"
      />
      <label htmlFor="search">
        <input
          type="search"
          value={searchTerm}
          placeholder="와인명을 검색해 보세요"
          className="w-full rounded-[5rem] text-gray-500 placeholder-gray-300 border dark:focus:placeholder-dark-primary focus:placeholder-primary desktop:w-[80rem] tablet:w-[39.6rem] mobile:w-[34.3rem] tablet:h-[4.8rem] mobile:h-[3.8rem] tablet:font-regular mobile:font-medium tablet:text-lg mobile:text-md tablet:pl-[5.5rem] mobile:pl-[4.5rem] py-[1.4rem] tablet:px-[2rem] mobile:px-[1.5rem]"
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </label>
    </div>
  );
}
