"use client";

import { useState } from "react";

export default function PriceFilter() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);

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
