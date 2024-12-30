"use client";

import StarRating from "@/components/common/StarRating";
import TextArea from "@/components/common/TextArea";
import { useReviewModalStore } from "@/provider/usereviewmodals";
import Image from "next/image";
import wine from "../../../public/icons/wine.svg";
import { useEffect, useState } from "react";
import instance from "@/api/api";

interface WineDetails {
  name: string;
}

interface WineIdProps {
  id?: string | number;
  content?: string;
}

export default function ReviewInput({ id, content }: WineIdProps) {
  const { setContent, setRating } = useReviewModalStore();
  const [wineName, setWineName] = useState<WineDetails | null>(null);
  const [error, setError] = useState<string>("");
  
  useEffect(() => {
    if (id) {
      async function getWineName() {
        try {
          const res = await instance.get(`/wines/${id}`);
          setWineName(res.data);
        } catch (error) {
          console.error("와인 이름 가져오기 실패", error);
        }
      }
      getWineName();
    }
  }, [id]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    if (newContent.length < 10) {
      setError("10자 이상 작성해주세요");
    } else {
      setError("");
    }
  };

  const wineNameText = wineName ? wineName.name : "와인 이름 로딩 중...";

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
            {wineNameText}
          </p>

          <StarRating
            isInteractive
            onRatingChange={(newRating) => setRating(newRating)}
          />
        </div>
      </section>
      <div className="relative w-full">
        <TextArea
          id="content"
          name="content"
          value={content}
          placeholder="후기를 작성해주세요"
          className="mb-[4rem] mt-[2.4rem] tablet:mb-[3.2rem] w-full h-[10rem] tablet:h-[12rem] p-[1.6rem] tablet:p-[2rem] text-[1.4rem] tablet:text-[1.6rem]"
          onChange={handleContentChange}
        />
{error && (
  <p className="absolute bottom-[1rem] left-[1.6rem] text-primary text-sm">
    {error}
  </p>
)}
      </div>
    </>
  );
}