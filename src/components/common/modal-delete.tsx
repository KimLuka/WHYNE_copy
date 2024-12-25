"use client";

import { useEffect } from "react";
import Button from "@/components/common/Button";
import {deleteWine, deleteReview} from '@/api/wine.api';

type DeleteModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  id: number;
  type: 'wine' | 'review';  // 타입만 추가
};

export default function DeleteModal({
  isOpen,
  onCancel,
  id,
  type
}: DeleteModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleDelete = async () => {
    try {
      if (type === 'wine') {
        await deleteWine({ id });
        alert('와인이 삭제되었습니다.');
      } else {
        await deleteReview({ id });
        alert('리뷰가 삭제되었습니다.');
      }
      onCancel();
    } catch (error) {
      console.error(`${type} 삭제 오류:`, error);
      alert(`${type === 'wine' ? '와인' : '리뷰'} 삭제에 실패했습니다.`);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex  items-center justify-center">
      {/* 배경 레이어 */}
      <div
        className="fixed inset-0 bg-black opacity-30"
        onClick={onCancel} // 배경 클릭 시 닫기
      />

      {/* 모달 컨텐츠 */}
      <div
        className="rounded-[1.6rem] border-[0.1rem] border-solid border-gray-300 fixed z-20 bg-white pt-[3.2rem] pr-[1.6rem] pb-[2.4rem] pl-[1.6rem]
                      w-[35.3rem] h-[17.2rem] tablet:h-[18.2rem]"
      >
        {/* 타이틀 */}
        <h1 className="text-[1.8rem] tablet:text-[2rem] m-0 mb-[4rem] text-center font-bold">
          정말 삭제하시겠습니까?
        </h1>

        {/* 버튼 영역 */}
        <div className="w-[32.1rem] flex justify-between gap-[0.9rem] tablet:gap-[0.6rem] ">
          <Button
            type="button"
            size="medium"
            color="white"
            addClassName="!text-gray-500 text-[1.6rem] rounded-[1rem] font-bold flex items-center justify-center min-h-[5rem] tablet:min-h-[5.4rem]"            
            onClick={onCancel}
            style={{ flexGrow: "1" }}
          >
            취소
          </Button>

          <Button
            type="button"
            size="medium"
            color="primary"
            addClassName="text-white text-[1.6rem] rounded-[1rem] font-bold flex items-center justify-center min-h-[5rem] tablet:min-h-[5.4rem]"
            style={{ flexGrow: "1" }}
            onClick={handleDelete}
          >
            삭제하기
          </Button>
        </div>
      </div>
    </div>
  );
}

/*
페이지에서 사용예시
<DeleteModal 
  isOpen={isDeleteModalOpen}
  onCancel={() => setIsDeleteModalOpen(false)}
  id={id}
  type="wine"  // 또는 "review"
/>
*/