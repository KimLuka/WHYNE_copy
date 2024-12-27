"use client";

import { useReviewModalStore } from "@/provider/usereviewmodals";
import { FormEvent, useEffect } from "react";
import Button from "@/components/common/Button";
import Modalv from "@/components/common/modal-container-review";
import ReviewInput from "@/components/modal-review/ReviewInput";
import TagSelector from "@/components/modal-review/TagSelector";
import TasteSlider from "@/components/modal-review/TasteSlider";
import instance from "@/api/api";
import { AxiosResponse } from "axios";
import { Aroma, mapTagToAroma } from "../wines/detail/detail-wine-tag";

type ModalProps = {
  isOpen: boolean;
  onClick: () => void;
  id: string;
  isEditing?: boolean;
  initialData?: {
    rating: number;
    content: string;
    tasteValues: number[];
    selectedTags: Aroma[];
  };
};

export default function AddReviewModal({
  isOpen,
  onClick,
  id,
  isEditing = false,
  initialData,
}: ModalProps) {
  const {
    rating,
    content,
    tasteValues,
    selectedTags,
    resetReview,
    setReviewData,
  } = useReviewModalStore();

  useEffect(() => {
    if (isEditing && initialData) {
      setReviewData({
        content: initialData.content,
        selectedTags: initialData.selectedTags,
        tasteValues: initialData.tasteValues,
        wineId: Number(id),
        rating: initialData.rating,
      });
      console.log(initialData);
    }
  }, [isEditing, initialData, id, setReviewData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const wineId = Number(id);

    const formData = {
      rating,
      lightBold: tasteValues[0],
      smoothTannic: tasteValues[1],
      drySweet: tasteValues[2],
      softAcidic: tasteValues[3],
      aroma: selectedTags
        .map(mapTagToAroma)
        .filter((tag): tag is Aroma => tag !== undefined),
      content,
      wineId,
    };

    try {
      const res: AxiosResponse = isEditing
        ? await instance.patch(`/reviews/${id}`, formData)
        : await instance.post("/reviews", formData);

      if (res.status === 200) {
        console.log(
          isEditing
            ? "리뷰가 성공적으로 수정되었습니다."
            : "리뷰가 성공적으로 제출되었습니다.",
        );
      } else {
        console.error("리뷰 제출 실패", res.data);
      }
    } catch (error) {
      console.error("리뷰 제출 중 오류 발생:", error);
    } finally {
      resetReview();
      onClick();
    }
  };

  return (
    <Modalv isOpen={isOpen} onClose={onClick}>
      <div className="w-full h-auto rounded-[1.8rem] bg-white pt-[3.2rem] px-[2.4rem] pb-[2.4rem] tablet:pt-[2.4rem] tablet:px-[2.4rem] tablet:pb-[2.4rem]">
        <section className="flex justify-between items-center">
          <h1 className="text-gray-800 m-0 font-bold text-[2rem] tablet:text-[2.4rem]">
            {isEditing ? "수정하기" : "리뷰 등록"}
          </h1>
          <button
            type="button"
            onClick={onClick}
            className="text-gray-500 text-[1.6rem] tablet:text-[2rem]"
          >
            X
          </button>
        </section>
        <form className="w-full" onSubmit={handleSubmit}>
          <ReviewInput id={id} content={content} />
          <div className="relative inline-block mb-[2rem]">
            <p
              className="text-gray-800 font-bold text-[1.6rem] tablet:text-[1.8rem] cursor-pointer 
  border-b-[0.4rem] border-dotted border-transparent 
  hover:border-primary hover:mb-[1rem] hover:pb-[0.5rem]
  transition-all duration-300"
            >
              와인의 맛은 어땠나요?
            </p>
          </div>
          <TasteSlider tasteValues={tasteValues} />
          <div className="relative inline-block mt-[4rem] mb-[2rem]">
            <p
              className="text-gray-800 font-bold text-[1.6rem] tablet:text-[1.8rem] cursor-pointer 
  border-b-[0.4rem] border-dotted border-transparent 
  hover:border-primary hover:mb-[1rem] hover:pb-[0.5rem]
  transition-all duration-300"
            >
              {" "}
              기억에 남는 향이 있나요?
            </p>
          </div>
          <TagSelector selectedTags={selectedTags} />
          <div className="flex mt-[4rem]">
            <Button
              type="submit"
              size="large"
              color="primary"
              addClassName="w-full text-[1.6rem] tablet:text-[1.5rem] font-bold rounded-[1rem] h-[5.4rem]"
              disabled={!content}
            >
              {isEditing ? "수정하기" : "리뷰 남기기"}
            </Button>
          </div>
        </form>
      </div>
    </Modalv>
  );
}
