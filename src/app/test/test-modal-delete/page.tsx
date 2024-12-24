"use client";

import { useState } from "react";
import DeleteModal from "@/components/common/modal-delete"; // DeleteModal 컴포넌트 경로를 맞춰주세요
import Button from "@/components/common/Button";

export default function DeleteModalTestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 삭제 동작
  const handleDeleteAction = () => {
    console.log("삭제되었습니다!"); // 실제 삭제 로직 추가 가능
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-[0.4rem]">
        DeleteModal 테스트 페이지
      </h1>

      {/* 모달 열기 버튼 */}
      <Button
        type="button"
        size="large"
        color="primary"
        onClick={handleOpenModal}
        addClassName="rounded-[0.8rem] px-[2rem] py-[1rem]"
      >
        모달 열기
      </Button>

      {/* DeleteModal */}
      <DeleteModal
        isOpen={isModalOpen} // 모달 상태 전달
        onCancel={handleCloseModal} // 배경 클릭 및 취소 버튼 동작
        onConfirm={handleDeleteAction} // 삭제 버튼 동작
      />
    </div>
  );
}
