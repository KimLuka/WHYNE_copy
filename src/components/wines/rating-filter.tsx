"use client";

import { useState } from "react";

interface RatingFilterProps {
  onChange: (rating: number) => void; // 범위 중 하나의 값을 부모로 전달
}

export default function RatingFilter({ onChange }: RatingFilterProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const ratings: { id: string; label: string; value: number }[] = [
    { id: "all", label: "전체", value: 0 },
    { id: "highest", label: "4.5 - 5.0", value: 5 },
    { id: "muchHigher", label: "4.0 - 4.5", value: 4.5 },
    { id: "higher", label: "3.5 - 4.0", value: 4 },
    { id: "littleHigher", label: "3.0 - 3.5", value: 3.5 },
  ];

  const handleSelection = (rating: number) => {
    setSelectedRating(rating); // 선택된 평점 상태 업데이트
    onChange(rating); // 부모 컴포넌트로 선택된 평점을 전달
  };

  return (
    <div className="flex flex-col gap-[1.6rem] w-auto">
      <h3 className="font-bold text-[1.8rem] text-gray-800">RATING</h3>
      <form>
        <fieldset className="flex flex-col gap-[1.2rem]">
          {ratings.map(({ id, label, value }) => (
            <label
              key={id}
              htmlFor={id}
              className="flex items-center gap-[1.2rem] cursor-pointer"
            >
              <input
                type="radio" // 라디오 버튼으로 변경
                id={id}
                name="rating" // 같은 그룹으로 설정
                checked={selectedRating === value} // 선택된 평점과 비교
                onChange={() => handleSelection(value)} // 평점 선택 시 해당 값 전달
              />
              <span className="font-medium text-[1.6rem] text-gray-800">
                {label}
              </span>
            </label>
          ))}
        </fieldset>
      </form>
    </div>
  );
}
