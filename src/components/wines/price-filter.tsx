"use client";

import { useState, useEffect, useCallback } from "react";
import { Price } from "./wine";

interface PriceApp {
  onChange: (minPrice: number, maxPrice: number) => void; // 가격 범위 변경 시 부모로 전달하는 함수
  filters: Price;
  resetValues?: { minPrice: number; maxPrice: number }; // 초기화 값은 옵셔널로 설정
}

export default function PriceFilter({
  onChange,
  filters,
  resetValues,
}: PriceApp) {
  const [minPrice, setMinPrice] = useState(filters.minPrice); // 초기값을 filters의 minPrice로 설정
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice); // 초기값을 filters의 maxPrice로 설정

  // 가격 범위 변경을 부모에게 전달하는 함수
  const handleFilterChange = useCallback(() => {
    onChange(minPrice, maxPrice);
    console.log("가격 범위 변경", onChange);
  }, [minPrice, maxPrice, onChange]);

  useEffect(() => {
    handleFilterChange(); // 가격 범위를 부모 컴포넌트로 전달
    console.log("handleFilter", handleFilterChange);
  }, [minPrice, maxPrice, handleFilterChange]);

  // resetValues가 변경되면 가격 초기화, 제일 마지막에 찍히는 값
  useEffect(() => {
    if (resetValues) {
      setMinPrice(resetValues.minPrice); // 초기화된 minPrice로 설정
      setMaxPrice(resetValues.maxPrice); // 초기화된 maxPrice로 설정
      console.log("초기화", resetValues);
    }
  }, [resetValues]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1000); // 최소값은 최대값보다 작아야 함
    setMinPrice(value);
    handleFilterChange(); // 부모로 값 전달
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 1000); // 최대값은 최소값보다 커야 함
    setMaxPrice(value);
    handleFilterChange(); // 부모로 값 전달
  };

  return (
    <div className="flex flex-col w-auto desktop:border-none desktop:p-0 mobile:pb-[3.2rem] mobile:border-solid mobile:border-b-[0.1rem] mobile:border-b-gray-100">
      <h3 className="font-bold text-xl text-gray-800 mb-[2rem]">PRICE</h3>
      <div className="flex justify-between mb-[0.5rem]">
        <label htmlFor="minPrice">
          <span className="font-medium text-lg text-primary">
            ₩ {minPrice.toLocaleString()}
          </span>
        </label>
        <label htmlFor="maxPrice">
          <span className="font-medium text-lg text-primary">
            ₩ {maxPrice.toLocaleString()}
          </span>
        </label>
      </div>
      <div className="relative h-[0.6rem] bg-gray-300 rounded-full">
        <div
          className="absolute h-[0.6rem] bg-primary rounded-full"
          style={{
            left: `${(minPrice / 500000) * 100}%`,
            right: `${100 - (maxPrice / 500000) * 100}%`,
          }}
        />
        <input
          type="range"
          min={0}
          max={500000}
          step={1000}
          value={minPrice}
          onChange={handleMinChange}
          className="absolute price-range pointer-events-auto"
        />
        <input
          type="range"
          min={0}
          max={500000}
          step={1000}
          value={maxPrice}
          onChange={handleMaxChange}
          className="absolute price-range pointer-events-auto"
        />
      </div>
    </div>
  );
}
