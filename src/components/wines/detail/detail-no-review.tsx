import Image from "next/image";
import NoRievew from "@/../public/icons/no_review.svg";
import Button from "@/components/common/Button";
import { useState } from "react";
import AddReviewModal from "@/components/modal-review/AddReviewModal";
import ReviewProvider from "@/provider/usereviewmodals";

interface DetailReviewCardProps {
  wineid: string;
}

export default function DetailNoReview({ wineid }: DetailReviewCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModalToggle() {
    setIsModalOpen((prev) => !prev);
  }


  return (
    <div className="flex flex-col w-[114rem]">
      <p className="font-semibold text-[2rem] text-gray-800 leading-[3.2rem] mb-[15.2rem]">
        리뷰 목록
      </p>
      <div className="desktop:w-[80rem] desktop:h-[44.2rem] tablet:w-[74.4rem] tablet:h-[44.2rem] mobile:w-[37.5rem] mobile:h-[40.5rem] flex items-center justify-center flex-col">
        <div className="relative desktop:w-[13.6rem] desktop:h-[13.6rem] tablet:w-[13.6rem] tablet:h-[13.6rem] mobile:w-[10rem] mobile:h-[10rem] mb-[2.4rem]">
          <Image src={NoRievew} alt="리뷰없음" layout="fill" />
        </div>
        <p className="font-regular text-[1.8rem] text-gray-500 leading-[2.6rem] items-center mb-[4.8rem]">
          작성된 리뷰가 없어요
        </p>
        <Button
          type="button"
          size="medium"
          color="primary"
          addClassName="w-[16.9rem] h-[4.8rem] rounded-[1.2rem] p-[1.1rem_4.8rem]"
          onClick={handleModalToggle}
        >
          <p className="font-semibold text-[1.8rem] text-white leading-[2.6rem] items-center">
            리뷰 남기기
          </p>
        </Button>
      </div>
      <ReviewProvider>
        <AddReviewModal id={wineid} isOpen={isModalOpen} onClick={handleModalToggle} />
      </ReviewProvider>
    </div>
  );
}
