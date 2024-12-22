"use client";

import StarRating from "@/components/common/StarRating";
import TextArea from "@/components/common/TextArea";
import { useReviewModalStore } from "@/provider/usereviewmodals";
import Image from "next/image";
import wine from "../../../public/icons/wine.svg";

export default function ReviewInput() {
  const { setContent, setRating, wineName } = useReviewModalStore();

  return (
    <>
      <section className="w-[45.6rem] flex items-center gap-[1rem] mb-[1rem] desktop:mb-[1.5rem] tablet:mb-[1.5rem] mobile:mb-[1rem] mt-[1rem] px-[1.2rem]">
        <div className="relative bg-gray-100 h-[8rem] w-[8rem] rounded-[1rem] p-[1rem] flex items-center justify-center">
          <Image
            width={100}
            height={100}
            alt="기본 와인 이미지"
            src={wine}
            className="w-full h-full object-fill"
          />
        </div>
        <div className="flex flex-col">
          <p className="ml-[0.5rem] mt-[0.7rem] break-words whitespace-nowrap text-lg font-semiBold pt-[0.5rem]">
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
        className="mb-[3.2rem] w-full h-[12rem] p-[2rem] text-[1.6rem]"
        onChange={(e) => setContent(e.target.value)}
      />
    </>
  );
}
