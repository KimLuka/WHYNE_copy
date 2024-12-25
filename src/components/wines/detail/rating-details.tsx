import Button from "@/components/common/Button";
import Image from "next/image";
import defaultStar from "../../../../public/icons/star.svg";
import purpleStar from "../../../../public/icons/purple_star.svg";

interface RatingDetailsProps {
  avgRating?: number;
  reviewCount?: number;
}

export default function RatingDetails({
  avgRating = 0,
  reviewCount = 0,
}: RatingDetailsProps) {
  return (
    <div className="flex flex-col aspect-[280/311] w-[28rem] gap-[3rem]">
      <div className="flex flex-col gap-[2rem]">
        <div className="flex gap-[2rem]">
          <h2 className="text-[5.4rem] font-extrabold">{avgRating}</h2>
          <div className="flex flex-col gap-[0.5rem]">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Image
                  key={index}
                  width={24}
                  height={24}
                  src={index < Math.round(avgRating) ? purpleStar : defaultStar} // 별점에 따라 채운 별 or 빈 별
                  alt={`별 ${index + 1}`}
                  className="w-[2.4rem] h-[2.4rem]"
                />
              ))}
            </div>
            <p className="text-gray-500 text-[1.4rem]">
              {reviewCount}개의 후기
            </p>
          </div>
        </div>
        <div className="flex gap-[1.5rem]">
          <p className="text-[1.6rem] text-gray-500">5점</p>
          프로그레스 바
        </div>
      </div>
      <Button
        size="small"
        color="primary"
        type="button"
        addClassName="text-[1.6rem] aspect-[113/42] max-w-[11.3rem] h-[4.2rem] font-semibold text-center"
      >
        리뷰 남기기
      </Button>
    </div>
  );
}
