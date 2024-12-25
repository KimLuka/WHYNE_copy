"use client";

import { useState } from "react";
import DeleteModal from "@/components/common/modal-delete";
import Button from "@/components/common/Button";

export default function DeleteModalTestPage() {
  const [isWineModalOpen, setIsWineModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const testWineId = 1;
  const testReviewId = 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-[2rem] text-center">
          DeleteModal 테스트 페이지
        </h1>

        <div className="flex gap-4 justify-center">
          <Button
            type="button"
            size="large"
            color="primary"
            onClick={() => setIsWineModalOpen(true)}
            addClassName="rounded-[0.8rem] px-[2rem] py-[1rem]"
          >
            와인 삭제 모달
          </Button>

          <Button
            type="button"
            size="large"
            color="primary"
            onClick={() => setIsReviewModalOpen(true)}
            addClassName="rounded-[0.8rem] px-[2rem] py-[1rem]"
          >
            리뷰 삭제 모달
          </Button>
        </div>
      </div>

      <DeleteModal
        isOpen={isWineModalOpen}
        onCancel={() => setIsWineModalOpen(false)}
        id={testWineId}
        type="wine"
      />

      <DeleteModal
        isOpen={isReviewModalOpen}
        onCancel={() => setIsReviewModalOpen(false)}
        id={testReviewId}
        type="review"
      />
    </div>
  );
}