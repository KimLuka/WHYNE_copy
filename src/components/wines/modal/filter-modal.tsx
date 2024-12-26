"use client";

import { useState } from "react";
import PriceFilter from "../price-filter";
import RatingFilter from "../rating-filter";
import TypesFilter from "../types-filter";
import Button from "@/components/common/Button";
import Modal from "@/components/common/modal-container";
import Image from "next/image";
import XButton from "../../../../public/icons/x_button.svg";
import { Filters } from "../wine";

interface Filter {
  isOpen: boolean;
  onToggle: () => void;
  onFilterApply: () => void;
  onFilterReset: () => void;
  onTypeChange: (type: string) => void;
  onPriceChange: (minPrice: number, maxPrice: number) => void;
  onRatingChange: (rating: number) => void;
  filters: Filters;
}

export default function FilterModal({
  isOpen,
  onToggle,
  onFilterApply,
  onFilterReset,
  onTypeChange,
  onPriceChange,
  onRatingChange,
  filters,
}: Filter) {
  const [resetPrice, setResetPrice] = useState<{
    minPrice: number;
    maxPrice: number;
  }>({
    minPrice: filters.minPrice ?? 0, // filters에서 minPrice가 있으면 사용, 없으면 0
    maxPrice: filters.maxPrice ?? 500000, // filters에서 maxPrice가 있으면 사용, 없으면 500000
  });

  const [resetRating, setResetRating] = useState<number>(filters.rating || 0);

  const handleReset = () => {
    setResetPrice({ minPrice: 0, maxPrice: 500000 });
    setResetRating(0);
    onFilterReset(); // 필터 초기화
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onToggle}
      className="tablet:mt-0 mobile:mt-[8rem] mobile:mb-0 rounded-t-[1.6rem] tablet:rounded-[1.6rem]  mobile:w-[37.5rem] mobile:p-[2.4rem]"
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
            <TypesFilter onChange={onTypeChange} />
            <PriceFilter
              onChange={onPriceChange}
              filters={{
                minPrice: filters.minPrice,
                maxPrice: filters.maxPrice,
              }}
              resetValues={resetPrice}
            />
            <RatingFilter
              onChange={onRatingChange}
              filters={{ rating: filters.rating }}
              resetRating={resetRating}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            size="small"
            color="secondary"
            type="reset"
            onClick={handleReset}
            addClassName="w-[9.6rem] h-[5.4rem] py-[1rem] px-[1.6rem] font-bold text-bold text-lg text-center"
          >
            초기화
          </Button>
          <Button
            size="small"
            color="primary"
            type="submit"
            onClick={onFilterApply}
            addClassName="w-[21rem] h-[5.4rem] py-[1rem] px-[1.6rem] font-bold text-bold text-lg"
          >
            필터 적용하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
