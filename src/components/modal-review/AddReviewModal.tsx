"use client";

import { useReviewModalStore } from "@/provider/usereviewmodals";
import { FormEvent } from "react";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal-container";
import ReviewInput from "@/components/modal-review/ReviewInput";
import TagSelector from "@/components/modal-review/TagSelector";
import TasteSlider from "@/components/modal-review/TasteSlider";

type ModalProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function AddReviewModal({ isOpen, onClick }: ModalProps) {
  const { rating, content, tasteValues, selectedTags, wineId, resetReview } =
    useReviewModalStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      rating,
      wineId,
      content,
      selectedTags,
      tasteValues,
    };

    console.log(formData);
    resetReview();
    onClick();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClick}>
      <div className="w-[50rem] h-auto rounded-[1.1rem] bg-white pl-[1.8rem] pr-[1.8rem]">
        <section className="flex-between pt-[1.5rem]">
          <h1 className="text-gray-800 font-bold tablet:text-2xl mobile:text-2lg px-[1.2rem]">
            리뷰 등록
          </h1>
          <button
            type="button"
            onClick={onClick}
            className="text-gray-500 tablet:text-2xl mobile:text-2lg px-[1.2rem]"
          >
            X
          </button>
        </section>
        <form className="w-full" onSubmit={handleSubmit}>
          <ReviewInput />
          <div className="relative inline-block px-[1.2rem]">
            <p className="text-gray-800 font-bold tablet:text-xl mobile:text-lg cursor-pointer border-b-[0.4rem] border-dotted border-transparent hover:border-primary transition-all duration-300 mb-[2rem]">
              와인의 맛은 어땠나요?
            </p>
          </div>
          <TasteSlider />
          <div className="relative inline-block px-[1.2rem]">
            <p className="text-gray-800 font-bold tablet:text-xl mobile:text-lg cursor-pointer border-b-[0.4rem] border-dotted border-transparent hover:border-primary transition-all duration-300 mt-[4rem] mb-[2rem]">
              기억에 남는 향이 있나요?
            </p>
          </div>
          <TagSelector />
          <div className="flex mt-[2.4rem] pb-[2rem]">
            <Button
              type="submit"
              size="large"
              color="primary"
              addClassName="w-full text-[1.5rem] font-bold rounded-[1rem]"
              disabled={!content}
            >
              리뷰 남기기
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
