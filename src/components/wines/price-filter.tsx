"use client";

import { useState, useEffect, useCallback } from "react";

interface PriceFilterProps {
  onChange: (minPrice: number, maxPrice: number) => void; // 가격 범위 변경 시 부모로 전달하는 함수
}

export default function PriceFilter({ onChange }: PriceFilterProps) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);

  // onChange를 호출하는 핸들러를 useCallback으로 메모화
  const handleFilterChange = useCallback(() => {
    onChange(minPrice, maxPrice);
  }, [minPrice, maxPrice, onChange]);

  useEffect(() => {
    handleFilterChange(); // 가격 범위를 부모 컴포넌트로 전달
  }, [handleFilterChange]);

  // 최소값 변경 핸들러
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1000); // 최소값은 최대값보다 작아야 함
    setMinPrice(value);
    onChange(value, maxPrice); // 부모로 값 전달
  };

  // 최대값 변경 핸들러
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 1000); // 최대값은 최소값보다 커야 함
    setMaxPrice(value);
    onChange(minPrice, value); // 부모로 값 전달
  };

  return (
    <div className="flex flex-col w-auto">
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
        {/* 활성 범위 표시 */}
        <div
          className="absolute h-[0.6rem] bg-primary rounded-full"
          style={{
            left: `${(minPrice / 500000) * 100}%`,
            right: `${100 - (maxPrice / 500000) * 100}%`,
          }}
        />
        {/* 최소값 손잡이 */}
        <input
          type="range"
          min={0}
          max={500000}
          step={1000}
          value={minPrice}
          onChange={handleMinChange}
          className="absolute w-full h-[0.6rem] bg-transparent appearance-none pointer-events-auto z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[1.6rem] [&::-webkit-slider-thumb]:h-[1.6rem] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-[0.1rem] [&::-webkit-slider-thumb]:border-gray-300 [&::-webkit-slider-runnable-track]:bg-transparent"
        />
        {/* 최대값 손잡이 */}
        <input
          type="range"
          min={0}
          max={500000}
          step={1000}
          value={maxPrice}
          onChange={handleMaxChange}
          className="absolute w-full h-[0.6rem] bg-transparent appearance-none pointer-events-auto z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[1.6rem] [&::-webkit-slider-thumb]:h-[1.6rem] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-[0.1rem] [&::-webkit-slider-thumb]:border-gray-300 [&::-webkit-slider-runnable-track]:bg-transparent"
        />
      </div>
    </div>
  );
}
