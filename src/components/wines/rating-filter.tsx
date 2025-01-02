"use client";

import { useState, useEffect } from "react";

interface RatingApp {
  onChange: (rating: number) => void;
  resetRating?: number; // 초기화된 평점 값
}

export default function RatingFliter({
  onChange,
  resetRating = 5, // 초기값 설정
}: RatingApp) {
  const [selectedRating, setSelectedRating] = useState<number | null>(
    resetRating,
  );

  const ratings: { id: string; label: string; value: number }[] = [
    { id: "all", label: "전체", value: 5 },
    { id: "highest", label: "4.5 - 5.0", value: 4.5 },
    { id: "muchHigher", label: "4.0 - 4.5", value: 4 },
    { id: "higher", label: "3.5 - 4.0", value: 3.5 },
    { id: "littleHigher", label: "3.0 - 3.5", value: 3 },
  ];

  // resetRating이 변경되면 selectedRating을 업데이트
  useEffect(() => {
    setSelectedRating(resetRating);
  }, [resetRating]);

  const handleSelection = (rating: number) => {
    setSelectedRating(rating);
    onChange(rating); // 부모 컴포넌트로 선택된 평점 전달
  };

  return (
    <div className="flex flex-col desktop:gap-[1.6rem] mobile:gap-[1rem] w-auto">
      <h3 className="font-bold text-xl dark:text-[#EDEDED] text-gray-800">
        RATING
      </h3>
      <form>
        <fieldset className="flex flex-col desktop:gap-[1.2rem] mobile:gap-[1rem]">
          {ratings.map(({ id, label, value }) => (
            <label
              key={id}
              htmlFor={id}
              className="flex items-center cursor-pointer"
            >
              <input
                type="radio"
                id={id}
                name="rating"
                checked={selectedRating === value}
                onChange={() => handleSelection(value)}
                className="appearance-none"
              />
              <span
                className={
                  "bg-gray-100 w-[1.8rem] h-[1.8rem] border-solid border-[0.1rem] rounded-[0.6rem] flex items-center justify-center border-gray-300"
                }
              >
                {selectedRating === value && (
                  <span className="w-[1rem] h-[1rem] rounded-[0.3rem] bg-primary" />
                )}
              </span>
              <span
                className={`font-medium text-[1.6rem] desktop:ml-[1.2rem] mobile:ml-[1.5rem] ${
                  selectedRating === value
                    ? "text-primary"
                    : "dark:text-[#4A4266] text-gray-800"
                }`}
              >
                {label}
              </span>
            </label>
          ))}
        </fieldset>
      </form>
    </div>
  );
}
