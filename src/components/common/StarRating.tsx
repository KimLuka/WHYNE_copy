import { useState } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";

type StarRatingProps = {
  rating?: number;
  isInteractive?: boolean;
  onRatingChange?: (rating: number) => void;
  size?: "default" | "small";
};

function StarRating({
  rating = 0,
  isInteractive = false,
  onRatingChange,
  size = "default",
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState<number>(
    Math.round(rating), //초기값 정수로 변환
  );

  const handleStarClick = (newRating: number) => {
    if (isInteractive) {
      setCurrentRating(newRating);
      onRatingChange?.(newRating);
    }
  };

  const handleMouseEnter = (starIndex: number) => {
    if (isInteractive) {
      setHoverRating(starIndex);
    }
  };

  const handleMouseLeave = () => {
    if (isInteractive) {
      setHoverRating(null);
    }
  };

  const getStarFillPercentage = (starIndex: number, activeRating: number) => {
    if (starIndex <= activeRating) return 100;
    return 0; //2가지 상태로만 함수 단순화(부분채움 로직제거)
  };
  //d
  const starSize = size === "small" ? 24 : 30;

  const renderStars = () => {
    const stars = [];
    const effectiveRating = hoverRating ?? currentRating;

    for (let i = 1; i <= 5; i++) {
      const fillPercentage = getStarFillPercentage(i, effectiveRating);

      stars.push(
        <Button
          key={i}
          size="large"
          color="white"
          addClassName={`relative flex items-center justify-center border-none mr-[-0.8rem] hover:!bg-transparent ${
            isInteractive ? "cursor-pointer" : "cursor-default"
          } tablet:w-[3.5rem] tablet:h-[3.5rem] desktop:w-[3.3rem] desktop:h-[3rem]`}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleStarClick(i)}
          type="button"
        >
          <div className="relative flex h-full w-full items-center justify-center">
            <Image
              src="/icons/star.svg"
              alt="Empty star"
              width={starSize}
              height={starSize}
              className="object-contain"
            />
            <Image
              src="/icons/star_fill.svg"
              alt="Filled star"
              width={starSize}
              height={starSize}
              className="absolute inset-0 m-auto object-contain"
              style={{
                clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
              }}
            />
          </div>
        </Button>,
      );
    }
    return stars;
  };

  return (
    <div className="inline-flex items-center gap-[0.3rem]">{renderStars()}</div>
  );
}

export default StarRating;
