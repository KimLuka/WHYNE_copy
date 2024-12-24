"use client";

import { useState, useEffect, useRef } from "react";
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
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null); // ref로 debounceTimeout 관리

  // Debounce 구현
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current); // 이전 타이머 취소
    }

    // 타이머 설정
    if (searchTerm) {
      debounceTimeoutRef.current = setTimeout(() => {
        onChange(searchTerm); // 검색어가 변경되면 부모 컴포넌트에 전달
        console.log("검색어:", searchTerm); // 검색어 로그 출력
      }, 500); // 500ms 동안 입력이 없으면 검색 실행
    }

    // 컴포넌트 언마운트 시 타이머 취소
    return () => {
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current); // 타이머 취소
    };
  }, [searchTerm, onChange]); // searchTerm만 의존성 배열에 추가
  return (
    <>
      <div className="flex desktop:justify-end relative gap-[1rem] items-center desktop:w-[76rem] desktop:h-[4.8rem] tablet:w-[39.6rem] tablet:h-[4.8rem] mobile:w-full mobile:h-[3.8rem]">
        <Image
          width={20}
          src={search}
          alt="검색하기"
          className="absolute z-10 desktop:right-[24.5rem] tablet:right-[35rem] mobile:right-[39rem]"
        />
        <label htmlFor="search">
          <input
            type="search"
            placeholder="와인명을 검색해 보세요"
            className="w-full rounded-[5rem] text-gray-500 border-solid border-[0.1rem] border-gray-300 tablet:h-[4.8rem] mobile:h-[3.8rem] tablet:font-regular mobile:font-medium tablet:text-lg mobile:text-md tablet:pl-[5.5rem] mobile:pl-[4.5rem] py-[1.4rem] tablet:px-[2rem] mobile:px-[1.5rem]"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>
    </>
  );
}
