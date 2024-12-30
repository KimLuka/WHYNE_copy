"use client";

import { useState, useCallback } from "react";

interface PriceApp {
  onChange: (minPrice: number, maxPrice: number) => void; // 가격 범위 변경 시 부모로 전달하는 함수
  resetValues?: { minPrice: number; maxPrice: number }; // 초기화 값은 옵셔널로 설정
}

export default function PriceFilter({ onChange, resetValues }: PriceApp) {
  const [minPrice, setMinPrice] = useState(resetValues?.minPrice || 0);
  const [maxPrice, setMaxPrice] = useState(resetValues?.maxPrice || 500000);

  // 가격 범위가 변경될 때만 부모에게 전달하는 함수
  const handlePriceChange = useCallback(() => {
    onChange(minPrice, maxPrice);
  }, [minPrice, maxPrice, onChange]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1000);
    setMinPrice(value);
    handlePriceChange();
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 1000);
    setMaxPrice(value);
    handlePriceChange();
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
      <div className="relative h-[0.6rem] bg-gray-100 rounded-full">
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
  className="absolute w-full h-0 top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:ring-1 [&::-webkit-slider-thumb]:ring-gray-300 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-[0.1rem] [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:ring-1 [&::-moz-range-thumb]:ring-white [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto"
/>

<input
  type="range"
  min={0}
  max={500000}
  step={1000}
  value={maxPrice}
  onChange={handleMaxChange}
  className="absolute w-full h-0 top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:ring-1 [&::-webkit-slider-thumb]:ring-gray-300 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-[0.1rem] [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:ring-1 [&::-moz-range-thumb]:ring-white [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto"
/>


      </div>
    </div>
  );
}
