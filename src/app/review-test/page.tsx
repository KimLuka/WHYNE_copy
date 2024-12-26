"use client";

import ReviewModal from "@/components/modal-review/modal-review-edit";
import ReviewProvider from "@/provider/usereviewmodals";
import Button from "@/components/common/Button";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function Test() {
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const handleReviewClick = () => {
    setIsReviewOpen(!isReviewOpen);
  };
  

  const wineDetail = {
    id: 1264,
    name: "테스트 와인"
  };

  const testReviewId = 1;

  return (
    <QueryClientProvider client={queryClient}>
      <ReviewProvider>
        <main className="grid grid-cols-3 gap-8 bg-white p-8">
          <Button
            type="button"
            size="large"
            color="secondary"
            onClick={handleReviewClick}
          >
            리뷰모달열기
          </Button>
          <ReviewModal 
            isOpen={isReviewOpen} 
            onClick={handleReviewClick}
            mode="edit"
            wineDetail={wineDetail}
            reviewId={testReviewId}
            onUpdate={(data) => {
              console.log('Updated review:', data);
              handleReviewClick();
            }}
          />
        </main>
      </ReviewProvider>
    </QueryClientProvider>
  );
}

export default Test;