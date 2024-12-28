import Image from "next/image";
import Link from "next/link";
import defaultImage from "../../../public/icons/wine.svg";
import defaultStar from "../../../public/icons/star.svg";
import purpleStar from "../../../public/icons/purple_star.svg";
import arrow from "../../../public/icons/right.svg";

interface RecentReview {
  content?: string | null;
}

interface SingleCardData {
  id: number;
  image: string;
  name: string;
  region: string;
  price: number;
  avgRating: number;
  reviewCount: number;
  recentReview?: RecentReview | null;
}

interface EntireCardProp {
  data: SingleCardData;
}

export default function EntireCard({ data }: EntireCardProp) {
  const {
    id = 0,
    image = "",
    name = "",
    region = "",
    price = 0,
    avgRating = 0,
    reviewCount = 0,
    recentReview = {},
  } = data || {};

  return (
    <div className="tablet:mt-[6.2rem] mobile:mt-[3rem] overflow-hidden tablet:h-[37.5rem] mobile:h-[36rem] desktop:w-[80rem] tablet:w-[70rem] mobile:w-[34.3rem] border-solid border-[0.1rem] border-gray-300 rounded-[1.6rem] shadow-md">
      <div className="flex desktop:gap-[8rem] tablet:gap-[4.7rem] mobile:gap-[3.6rem] border-b-[0.1rem] border-gray-300 border-solid desktop:pt-[4rem] desktop:pl-[6rem] tablet:pt-[4rem] tablet:pl-[4rem] mobile:pt-[3rem] mobile:pl-[2rem] desktop:pr-[5rem] tablet:pr-[4rem] mobile:pr-[3rem]">
        <Image
          width={60}
          height={228}
          src={image || defaultImage}
          alt="와인 목록"
        />
        <div className="flex justify-between w-auto tablet:flex-row mobile:flex-col tablet:gap-[9.1rem]">
          <div className="tablet:w-[30rem] mobile:w-[18.7rem] flex flex-col tablet:gap-[1.8rem] mobile:gap-[0.8rem]">
            <h2 className="font-semiBold text-gray-800 desktop:text-3xl tablet:text-[3rem]/[3.6rem] mobile:text-xl">
              {name}
            </h2>
            <p className="font-regular text-gray-500 tablet:text-lg mobile:text-md">
              {region}
            </p>
            <div className="flex justify-between desktop:mb-[2.3rem] tablet:mb-[3.7rem]">
              <span className="bg-secondary text-primary font-bold flex justify-center items-center w-auto tablet:h-[auto] mobile:h-[2.9rem] tablet:py-[0.8rem] tablet:px-[1.5rem] tablet:text-2lg tablet:rounded-[1.2rem] mobile:rounded-[1rem] mobile:py-[0.6rem] mobile: px-[1rem] mobile:text-md">
                ₩ {price.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="tablet:w-[11.2rem] tablet:h-[12.1rem] flex tablet:flex-col tablet:gap-[1rem] mobile:gap-[3.6rem] tablet:mt-0 mobile:mt-[2.2rem] tablet:mb-0 mobile:mb-[2.8rem] tablet:items-start mobile:items-center">
            <div className="flex tablet:flex-col tablet:gap-[1rem] mobile:justify-between mobile:gap-[1.5rem] tablet:items-start mobile:items-center">
              <h3 className="font-extrabold text-gray-800 tablet:text-[4.8rem]/[5.7rem] mobile:text-[2.8rem]/[3.3rem]">
                {avgRating}
              </h3>
              <div className="flex flex-col tablet:gap-[1rem]">
                <div className="flex gap-[0.2rem]">
                  {[...Array(5)].map((_, index) => (
                    <Image
                      key={index}
                      width={16}
                      height={16}
                      src={
                        index < Math.round(avgRating) ? purpleStar : defaultStar
                      } // 별점에 따라 채운 별 or 빈 별
                      alt={`별 ${index + 1}`}
                    />
                  ))}
                </div>
                <p className="font-regular text-gray-500 tablet:text-md mobile:text-xs-tight">
                  {reviewCount}개의 후기
                </p>
              </div>
            </div>
            <Link href={`/wines/${id}`}>
              <Image width={23} src={arrow} alt="상세 페이지로 이동하기" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-auto tablet:gap-[1rem] mobile:gap-[0.8rem] tablet:py-[2rem] desktop:px-[6rem] tablet:px-[4rem] mobile:py-[0.7rem] mobile:px-[2rem]">
        <h3 className="font-semiBold text-gray-800 tablet:text-lg mobile:text-md">
          최신 후기
        </h3>
        <p className="font-regular text-gray-500 tablet:text-lg mobile:text-md">
          {recentReview?.content ||
            "아직 리뷰가 없어요. 첫번쨰 리뷰어가 되어주세요!"}
        </p>
      </div>
    </div>
  );
}
