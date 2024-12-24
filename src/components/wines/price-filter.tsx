"use client";

import { useState, useEffect, useCallback } from "react";

interface PriceFilterProps {
  onChange: (minPrice: number, maxPrice: number) => void; // 가격 범위 변경 시 부모로 전달하는 함수
}

export default function PriceFilter({ onChange }: PriceFilterProps) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);

  // onChange를 호출하는 핸들러를 useCallback으로 메모화
  const handleFilterChange = useCallback(() => {
    onChange(minPrice, maxPrice);
  }, [minPrice, maxPrice, onChange]);

  useEffect(() => {
    handleFilterChange(); // 가격 범위를 부모 컴포넌트로 전달
  }, [handleFilterChange]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1000);
    setMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 1000);
    setMaxPrice(value);
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
      <div className="relative h-2 bg-gray-300 rounded-full">
        <div
          className="absolute h-2 bg-primary rounded-full"
          style={{
            left: `${(minPrice / 1000000) * 100}%`,
            right: `${100 - (maxPrice / 1000000) * 100}%`,
          }}
        />
        <input
          type="range"
          id="minPrice"
          min={0}
          max={1000000}
          step={1000}
          value={minPrice}
          onChange={handleMinChange}
          className="absolute price-range pointer-events-auto"
        />
        <input
          type="range"
          id="maxPrice"
          min={0}
          max={1000000}
          step={1000}
          value={maxPrice}
          onChange={handleMaxChange}
          className="absolute price-range pointer-events-auto"
        />
      </div>
    </div>
  );
}
