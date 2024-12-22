"use client";

import React from "react";

export default function Slider({
  value = 50, //기본값 수정
  mode = "interactive",
  onChange,
  width = "200px",
}: {
  value: number;
  mode: "interactive" | "readonly";
  onChange?: (sliderValue: number) => void;
  width?: string;
  height?: string;
  trackStyle?: React.CSSProperties;
  railStyle?: React.CSSProperties;
  handleStyle?: React.CSSProperties;
}): React.ReactElement {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(event.target.value));
  };

  return (
    <div style={{ width }} className="relative">
      <input
        type="range"
        min={0}
        max={100} //최대값 수정
        value={value} //범위 직접 사용 가능
        onChange={handleChange}
        disabled={mode === "readonly"}
        className={`
            w-[23rem]
            h-[0.6rem] 
            bg-gray-200 
            rounded-full
            appearance-none
            cursor-pointer
            focus:outline-none
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-[1.6rem]
            [&::-webkit-slider-thumb]:h-[1.6rem]
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:border-[0.1rem]
            [&::-webkit-slider-thumb]:border-[#D1D5DB]
            [&::-webkit-slider-thumb]:mt-[-0.6rem]
            [&::-webkit-slider-runnable-track]:bg-gray-100
            [&::-webkit-slider-runnable-track]:h-[0.6rem]
            [&::-webkit-slider-runnable-track]:rounded-full
            [&::-webkit-slider-runnable-track]:border-[0.1rem]
            [&::-webkit-slider-runnable-track]:border-solid
                        [&::-webkit-slider-runnable-track]:border-gray-300

            focus:[&::-webkit-slider-thumb]:outline-none
            focus:[&::-webkit-slider-thumb]:ring-2
            focus:[&::-webkit-slider-thumb]:ring-purple-300
            disabled:opacity-50
            disabled:cursor-not-allowed
          `}
      />
    </div>
  );
}
