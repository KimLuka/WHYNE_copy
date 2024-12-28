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

export default function FilterModal({
  isOpen,
  onToggle,
  onFilterApply,
  onFilterReset,
  onTypeChange,
  onPriceChange,
  onRatingChange,
  initialPrice = { minPrice: 0, maxPrice: 500000 },
  initialRating = 0,
}: Filter) {
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<{ minPrice: number; maxPrice: number }>(
    initialPrice,
  );
  const [rating, setRating] = useState<number>(initialRating);

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
      className="tablet:mt-0 mobile:mt-[8rem] mobile:mb-0 rounded-t-[1.6rem] tablet:rounded-[1.6rem] mobile:w-[37.5rem] mobile:p-[2.4rem]"
    >
      <div className="flex flex-col h-full mobile:gap-[4rem]">
        <div className="flex flex-col mobile:gap-[3.2rem]">
          <div className="flex justify-between">
            <h2 className="text-gray-800 text-bold text-xl">필터</h2>
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
            addClassName="w-[10rem] h-[5.5rem] rounded-[1.2rem] font-bold text-lg text-center flex items-center justify-center"
          >
            초기화
          </Button>
          <Button
            size="large"
            color="primary"
            type="submit"
            onClick={handleApply}
            addClassName="w-[21rem] h-[5.4rem] py-[1rem] px-[1.6rem] font-bold text-bold text-lg"
          >
            필터 적용하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
