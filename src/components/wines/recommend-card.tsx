import Image from "next/image";
import defaultImage from "../../../public/icons/wine.svg";
import defaultStar from "../../../public/icons/star.svg";
import purpleStar from "../../../public/icons/purple_star.svg";

interface SingleCardData {
  image: string;
  avgRating: number;
  name: string;
}

interface RecommendedCardProp {
  data?: SingleCardData;
}

export default function RecommendCard({ data }: RecommendedCardProp) {
  if (!data) {
    return <p>추천 와인을 고르는 중입니다</p>;
  }

  const { image = "", avgRating = 0, name = "" } = data || {};

  return (
    <div className="card-container flex justify-center items-end shadow-mdr tablet:mt-[3rem] mobile:mt-[2rem] tablet:w-[23.2rem] tablet:h-[18.5rem] mobile:w-[19.3rem] mobile:h-[16rem]">
      <div className="flex tablet:gap-[2.8rem] mobile:gap-[2.5rem] tablet:w-[17.2rem] tablet:h-[16.1rem] mobile:w-[14.3rem] mobile:h-[13.6rem]">
        <Image
          width={44}
          height={161}
          src={image || defaultImage}
          alt="추천와인"
        />
        <div className="flex flex-col gap-[0.5rem] tablet:w-[10rem] mobile:w-fill">
          <span
            className="font-extrabold tablet:w-[10rem] mobile:w-fill text-gray-800 tablet:text-[3.6rem]/[4.3rem] mobile:text-[2.8rem]/[3.3rem]" /* avgRating */
          >
            {avgRating}
          </span>
          <div className="flex gap-[0.2rem]" /*별점 보여주기*/>
            {[...Array(5)].map((_, index) => (
              <Image
                key={index}
                width={16}
                height={16}
                src={index < Math.round(avgRating) ? purpleStar : defaultStar} // 별점에 따라 채운 별 or 빈 별
                alt={`별 ${index + 1}`}
              />
            ))}
          </div>
          <h3 className="font-regular text-gray-500 tablet:text-xs-tight mobile:text-[1rem]/[1.4rem]">
            {name}
          </h3>
        </div>
      </div>
    </div>
  );
}
