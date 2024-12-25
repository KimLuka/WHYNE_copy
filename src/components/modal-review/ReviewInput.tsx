"use client";

import StarRating from "@/components/common/StarRating";
import TextArea from "@/components/common/TextArea";
import { useReviewModalStore } from "@/provider/usereviewmodals";
import Image from "next/image";
import wine from "../../../public/icons/wine.svg";

export default function ReviewInput() {
  const { setContent, setRating, wineName } = useReviewModalStore();
//dd
  return (
    <>
      <section className="w-full flex items-center gap-[1rem] mt-[4.8rem] px-[1.2rem]">
        <div className="relative bg-gray-100 h-[6.7rem] w-[6.7rem] tablet:h-[6.8rem] tablet:w-[6.8rem] rounded-[1rem] p-[0.7rem] flex items-center justify-center">
          <Image
            width={100}
            height={100}
            alt="기본 와인 이미지"
            src={wine}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col min-w-0 gap-[0.8rem]"> 
        <p className="ml-[0.5rem] mt-[1rem] break-words whitespace-normal text-lg tablet:text-2lg font-semiBold">
  {wineName}
</p>

          <StarRating
            isInteractive
            onRatingChange={(newRating) => setRating(newRating)}
          />
        </div>
      </section>
      <TextArea
        id="content"
        name="content"
        placeholder="후기를 작성해주세요"
        className="mb-[4rem] mt-[2.4rem] tablet:mb-[3.2rem] w-full h-[10rem] tablet:h-[12rem] p-[1.6rem] tablet:p-[2rem] text-[1.4rem] tablet:text-[1.6rem]"
        onChange={(e) => setContent(e.target.value)}
      />
    </>
  );
}
