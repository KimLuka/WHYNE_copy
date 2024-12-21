"use client";

import { useState } from "react";
import Modal from "@/components/common/modal-container";
import Button from "@/components/common/Button";

export default function DeleteReviewModal() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <Button
        type="button"
        size="small"
        color="white"
        onClick={handleOpenDeleteModal}
      >
        삭제하기
      </Button>

      <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
        <div className="rounded-[1.6rem] border border-solid border-light-gray-300 bg-light-white px-[1.6rem] pb-[2.4rem] pt-[3.2rem]">
          <div className="flex w-[32.1rem] flex-col items-center gap-[4rem]">
            <h1 className="text-xl-20px-bold text-light-gray-800">
              정말 삭제하시겠습니까?
            </h1>
            <div className="flex w-full justify-between">
              <div className="h-[5.4rem] w-[15.6rem]">
                <Button
                  type="button"
                  size="small"
                  color="white"
                  onClick={handleCloseDeleteModal}
                >
                  취소
                </Button>
              </div>
              <div className="h-[5.4rem] w-[15.6rem]">
                <Button
                  type="button"
                  size="small"
                  color="primary"
                  onClick={() => {}}
                >
                  삭제
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
