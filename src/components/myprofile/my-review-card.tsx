import Image from "next/image";
import DropDownMenu from "../common/dropdown-menu";
import StarFill from "../../../public/icons/star_fill.svg";
import MenuIcon from "@/../public/icons/menu.svg";
// import StarEmpty from "../../../public/icons/star.svg";

function timeAgo(createdAt: string): string {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000,
  );

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 전`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}일 전`;
  }
}

export interface Review {
  id: number;
  rating: number;
  createdAt: string;
  name: string;
  content: string;
}

export default function MyReviewCard({ review }: { review: Review }) {
  return (
    <div className="desktop:w-[80rem] tablet:w-full min-h-[20.2rem] border-solid border-[0.1rem] bg-white rounded-[1.6rem] border-gray-300 p-[2.4rem_4rem]">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-[1.5rem] w-[8rem] h-[4.2rem] rounded-[1.2rem] p-[0.8rem_1.5rem] bg-[#f1edfc] flex items-center">
            <Image src={StarFill} alt="별점" className="w-[2rem] h-[2rem]" />
            <p className="text-primary font-bold text-[1.8rem]">
              {review.rating.toFixed(1)}
            </p>
          </div>
          <p className="text-gray-300 text-[1.6rem] font-regular">
            {timeAgo(review.createdAt)}
          </p>
        </div>
        <DropDownMenu>
          <Image
            src={MenuIcon}
            alt="메뉴 아이콘"
            className="desktop:w-[2.6rem] tablet:w-[2.6rem] mobile:w-[2.4rem] desktop:h-[2.6rem] tablet:h-[2.6rem] mobile:h-[2.4rem]"
          />
        </DropDownMenu>
      </div>
      <div className="mt-[2rem]">
        <div className="leading-[2.6rem] text-[1.6rem] font-medium text-gray-500">
          {review.name}
        </div>
        <div className="text-[1.6rem] font-regular text-gray-800 mt-[1rem] leading-[2.6rem]">
          {review.content}
        </div>
      </div>
    </div>
  );
}
