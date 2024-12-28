"use client";

import { useReviewModalStore } from "@/provider/usereviewmodals";
import { FormEvent,useEffect } from "react";
import Button from "@/components/common/Button";
import Modalv from "@/components/common/modal-container-review";
// import ReviewInput from "@/components/modal-review/ReviewInput";
import TagSelector from "@/components/modal-review/TagSelector";
import TasteSlider from "@/components/modal-review/TasteSlider";
import { convertToAroma } from "@/utils/translate-aroma";
import {
  useAddReview,
  useReview,
  useUpdateReview,
} from '@/types/reviews.queries';


type WineDetailProps = {
  id: number;
  name: string;
};

type ReviewResponse = {
  id: number;
  rating: number;
  content: string;
  aroma: string[];
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
};

export type ReviewModalProps = {
  isOpen: boolean;
  onClick: () => void;
  mode: 'add' | 'edit';
  wineDetail: WineDetailProps;
  reviewId?: number;
  onUpdate?: (data: ReviewResponse) => void;  // any를 구체적인 타입으로 변경
};



export default function ReviewModal({
  isOpen,
  onClick,
  mode,
  wineDetail,
  reviewId,
  onUpdate,
}: ReviewModalProps) {
  const {
    data: serverReviewData,
    isLoading: isReviewLoading,
    refetch: refetchReview,
  } = useReview({
    id: reviewId || 0,
  });
  const { mutate: updateReview } = useUpdateReview();
  const { mutate: addReview } = useAddReview();

  
  const {
    rating,
    content,
    tasteValues,
    selectedTags: aroma, // aroma를 selectedTags로 사용
    resetReview,
    setId,
    setContent,
    setRating,
    setTasteValues,
    setSelectedTags,
  } = useReviewModalStore();

// 데이터 fetch
useEffect(() => {
  if (isOpen && mode === 'edit' && reviewId && refetchReview) {
    refetchReview();
  } else {
    resetReview();
  }
}, [isOpen, mode, reviewId, refetchReview, resetReview]);

// 데이터 설정
useEffect(() => {
  if (mode === 'edit' && serverReviewData && !isReviewLoading) {
    setId(serverReviewData.id);
    setContent(serverReviewData.content);
    setRating(serverReviewData.rating);
    setTasteValues([
      serverReviewData.lightBold,
      serverReviewData.smoothTannic,
      serverReviewData.drySweet,
      serverReviewData.softAcidic,
    ]);
    setSelectedTags(serverReviewData.aroma);
  }
}, [
  mode, 
  serverReviewData, 
  isReviewLoading,
  setId,
  setContent,
  setRating,
  setTasteValues,
  setSelectedTags
]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (mode === 'edit' && serverReviewData) {
      await updateReview({
        reviewId: serverReviewData.id,
        data: {
          rating,
          content,
          aroma: convertToAroma(aroma),
          lightBold: tasteValues[0],
          smoothTannic: tasteValues[1],
          drySweet: tasteValues[2],
          softAcidic: tasteValues[3],
        },
      });
  
      // serverReviewData를 직접 onUpdate에 전달
      onUpdate!(serverReviewData);
    } else if (mode === 'add') {
      await addReview({
        wineId: wineDetail.id,
        rating,
        content,
        aroma: convertToAroma(aroma),
        lightBold: tasteValues[0],
        smoothTannic: tasteValues[1],
        drySweet: tasteValues[2],
        softAcidic: tasteValues[3],
      });
    }
  
    resetReview();
    onClick();
  };

  const isButtonDisabled = !rating || !content || aroma.length === 0;

  return (
    <Modalv isOpen={isOpen} onClose={onClick}>
    <div className="w-full h-auto rounded-[1.8rem] bg-white pt-[3.2rem] px-[2.4rem] pb-[2.4rem] tablet:pt-[2.4rem] tablet:px-[2.4rem] tablet:pb-[2.4rem]">
      <section className="flex justify-between items-center">
        <h1 className="text-gray-800 m-0 font-bold text-[2rem] tablet:text-[2.4rem]">
                        {mode === 'add' ? '리뷰 등록' : '리뷰 수정'}

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
{/*             <ReviewInput /> */}
            <div className="relative inline-block mb-[2rem]">
            <p className="text-gray-800 font-bold text-[1.6rem] tablet:text-[1.8rem] cursor-pointer 
border-b-[0.4rem] border-dotted border-transparent 
hover:border-primary hover:mb-[1rem] hover:pb-[0.5rem]
transition-all duration-300">
와인의 맛은 어땠나요?
</p>
</div>
          <TasteSlider />
          <div className="relative inline-block mt-[4rem] mb-[2rem]">
        <p className="text-gray-800 font-bold text-[1.6rem] tablet:text-[1.8rem] cursor-pointer 
border-b-[0.4rem] border-dotted border-transparent 
hover:border-primary hover:mb-[1rem] hover:pb-[0.5rem]
transition-all duration-300">       기억에 남는 향이 있나요?
          </p>
        </div>


          <TagSelector />
          <div className="flex mt-[4rem]">
          <Button
            type="submit"
            size="large"
            color="primary"
            addClassName="w-full text-[1.6rem] tablet:text-[1.5rem] font-bold rounded-[1rem] h-[5.4rem]"
              disabled={isButtonDisabled}
            >
              {mode === 'add' ? '리뷰 남기기' : '리뷰 수정하기'}
            </Button>
          </div>
        </form>
      </div>
    </Modalv>
  );
}
