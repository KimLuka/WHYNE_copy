"use client";

import { useState, useEffect } from "react";
import PriceFilter from "../price-filter";
import RatingFilter from "../rating-filter";
import TypesFilter from "../types-filter";
import Button from "@/components/common/Button";
import Modal from "@/components/common/modal-container";
import Image from "next/image";
import XButton from "../../../../public/icons/x_button.svg";

interface Filter {
  isOpen: boolean;
  onToggle: () => void;
  onFilterApply: (filters: {
    type: string;
    price: { minPrice: number; maxPrice: number };
    rating: number;
  }) => void;
  onFilterReset: () => void;
  onTypeChange: (type: string) => void;
  onPriceChange: (minPrice: number, maxPrice: number) => void;
  onRatingChange: (rating: number) => void;
  initialPrice?: { minPrice: number; maxPrice: number };
  initialRating?: number;
}

const useResponsiveMargin = () => {
  const [marginClass, setMarginClass] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;
      console.log("Window size:", { width, height });

      // 태블릿 (744px 이상)
      if (width >= 744) {
        setMarginClass("h-screen flex items-center"); // 화면 중앙 정렬
      }
      // 모바일 (744px 미만)
      else {
        if (height >= 916) {
          setMarginClass("mt-[25rem]");
        } else if (height >= 900) {
          setMarginClass("mt-[23rem]");
        } else if (height >= 896) {
          setMarginClass("mt-[22rem]");
        } else if (height >= 844) {
          setMarginClass("mt-[17rem]");
        } else if (height >= 812) {
          setMarginClass("mt-[13rem]");
        } else if (height >= 740) {
          setMarginClass("mt-[7rem]");
        } else if (height >= 720) {
          setMarginClass("mt-[3rem]");
        } else if (height <= 667) {
          setMarginClass("mt-0");
        } else {
          setMarginClass("mt-[9rem]");
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { marginClass };
};

export default function FilterModal({
  isOpen,
  onToggle,
  onFilterApply,
  onFilterReset,
  onTypeChange,
  onPriceChange,
  onRatingChange,
  initialPrice = { minPrice: 0, maxPrice: 500000 },
  initialRating = 5,
}: Filter) {
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<{ minPrice: number; maxPrice: number }>(
    initialPrice,
  );
  const [rating, setRating] = useState<number>(initialRating);

  const { marginClass } = useResponsiveMargin();

  // 필터 초기화
  const handleReset = () => {
    setPrice(initialPrice);
    setRating(initialRating);
    setType(""); // Type도 초기화
    onFilterReset(); // 부모로 초기화된 값 알림
  };

  // 필터 적용
  const handleApply = () => {
    const filters = {
      type,
      price,
      rating,
    };
    onFilterApply(filters); // 필터 값 부모로 전달
  };

  useEffect(() => {
    // 값 변경 시, 부모 컴포넌트로 전달하는 콜백 실행
    onTypeChange(type);
    onPriceChange(price.minPrice, price.maxPrice);
    onRatingChange(rating);
  }, [type, price, rating, onTypeChange, onPriceChange, onRatingChange]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onToggle}
      className={`w-full  tablet:w-[37.5rem]
        h-full
        rounded-t-[1.6rem] tablet:rounded-[1.6rem]
        flex flex-col px-[2.4rem] tablet:px-0 py-[2.4rem]
        ${marginClass}`}
    >
      <div className="flex flex-col w-full tablet:w-[33rem] h-full mobile:gap-[4rem]">
        <div className="flex flex-col mobile:gap-[3.2rem]">
          <div className="flex justify-between">
            <h2 className="dark:text-[#E0E6EE] text-gray-800 text-bold text-xl">
              필터
            </h2>
            <button onClick={onToggle}>
              <Image src={XButton} width={24} height={24} alt="필터 닫기" />
            </button>
          </div>
          <div className="flex flex-col gap-[3.2rem]">
            <TypesFilter onChange={setType} />
            <PriceFilter
              onChange={(minPrice, maxPrice) =>
                setPrice({ minPrice, maxPrice })
              }
              resetValues={initialPrice}
            />
            <RatingFilter onChange={setRating} resetRating={initialRating} />
          </div>
        </div>
        <div className="flex justify-between gap-[1rem]">
          <Button
            size="large"
            color="secondary"
            type="reset"
            onClick={handleReset}
            addClassName="w-full min-w-[9.6rem] max-w-[20rem] h-[5.5rem] rounded-[1.2rem] font-bold text-lg"
          >
            초기화
          </Button>
          <Button
            size="large"
            color="primary"
            type="submit"
            onClick={handleApply}
            addClassName="w-full min-w-[23rem] max-w-[30rem] h-[5.4rem] rounded-[1.2rem] font-bold text-bold text-lg "
          >
            필터 적용하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
