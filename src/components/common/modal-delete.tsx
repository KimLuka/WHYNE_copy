"use client";

import { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import { deleteWine, deleteReview } from "@/api/wine.api";

type DeleteModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  id: number;
  type: "wine" | "review";
};

export default function DeleteModal({
  isOpen,
  onCancel,
  id,
  type,
}: DeleteModalProps) {
  const [message, setMessage] = useState<string | null>(null);

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
      if (type === "wine") {
        await deleteWine({ id });
        setMessage("와인이 삭제되었습니다.");
      } else {
        await deleteReview({ id });
        setMessage("리뷰가 삭제되었습니다.");
      }
    } catch (error) {
      console.error(`${type} 삭제 오류:`, error);
      setMessage(`${type === "wine" ? "와인" : "리뷰"} 삭제에 실패했습니다.`);
    }
  };

  const handleCloseMessage = () => {
    setMessage(null);
    onCancel(); // 삭제 결과 모달을 닫으면서 삭제 모달도 닫음
  };

  if (!isOpen && !message) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      {/* 배경 레이어 */}
      <div className="fixed inset-0 bg-black opacity-30" onClick={onCancel} />

      {/* 삭제 확인 모달 */}
      {isOpen && !message && (
        <div
          className="rounded-[1.6rem] border-[0.1rem] border-solid border-gray-300 dark:border-none fixed z-20 dark:bg-dark-black bg-white pt-[3.2rem] pr-[1.6rem] pb-[2.4rem] pl-[1.6rem]
                      w-[35.3rem] h-[17.2rem] tablet:h-[18.2rem]"
        >
          <h1 className="text-[1.8rem] tablet:text-[2rem] m-0 mb-[4rem] text-center font-bold">
            정말 삭제하시겠습니까?
          </h1>
          <div className="w-[32.1rem] flex justify-between gap-[0.9rem] tablet:gap-[0.6rem]">
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
      )}

      {/* 삭제 결과 메시지 모달 */}
      {message && (
        <div
          className="rounded-[1.6rem] border-[0.1rem] border-solid border-gray-300 fixed z-20 dark:bg-dark-black bg-white p-[2rem]
                      w-[30rem] h-[15rem] flex flex-col justify-center items-center"
        >
          <p className="text-[1.6rem] text-center mb-[2rem]">{message}</p>
          <Button
            type="button"
            size="small"
            color="primary"
            addClassName="text-white text-[1.6rem] rounded-[1rem] font-bold px-[3rem] text-center"
            onClick={handleCloseMessage}
          >
            닫기
          </Button>
        </div>
      )}
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
