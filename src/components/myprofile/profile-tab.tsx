"use client";

import { useEffect, useState } from "react";
import MyReviewCard, { Review } from "./my-review-card";
import MyWineCard, { Wine } from "./my-wine-card";
import "@/../public/images/placeholder1.png";
import instance from "@/api/api";

export default function ProfileTab() {
  const [activeTab, setActiveTab] = useState<"reviews" | "wines">("reviews");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [wines, setWines] = useState<Wine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const limit = 20;

  // 리뷰 데이터
  async function fetchReviews() {
    try {
      setIsLoading(true);
      const response = await instance.get("/users/me/reviews", {
        params: { limit },
      });

      const { list, totalCount } = response.data;

      const sortedList = list.sort(
        (a: Review, b: Review) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setReviews(sortedList);
      setTotalCount(totalCount);
    } catch (error) {
      console.error("리뷰 데이터 불러오기 실패", error);
    } finally {
      setIsLoading(false);
    }
  }

  // 와인 데이터
  async function fetchWines() {
    try {
      setIsLoading(true);
      const response = await instance.get("/users/me/wines", {
        params: { limit },
      });

      const { list, totalCount } = response.data;

      const sortedList = list.sort(
        (a: Wine, b: Wine) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setWines(sortedList);
      setTotalCount(totalCount);
    } catch (error) {
      console.error("와인 데이터 불러오기 실패", error);
    } finally {
      setIsLoading(false);
    }
  }

  // 탭 변경 시 데이터 가져오기
  useEffect(() => {
    if (activeTab === "reviews") {
      fetchReviews();
    } else {
      fetchWines();
    }
  }, [activeTab]);

  return (
    <div className="desktop:w-[80rem] desktop:h-[3.2rem] tablet:w-full mobile:w-full">
      <div className="flex justify-between items-center ">
        <div className="desktop:mb-[2.2rem] tablet:mb-[2.2rem] mobile:mb-0">
          <button
            className={`
              desktop:w-[9.6rem] desktop:h-[3.2rem] desktop:text-[2rem] desktop:leading-[3.2rem]
              tablet:w-[9.6rem] tablet:h-[3.2rem] tablet:text-[2rem] tablet:leading-[3.2rem]
              mobile:w-auto mobile:h-[2.6rem] mobile:text-[1.8rem] mobile:leading-[2.6rem]
              
              font-semibold ${activeTab === "reviews" ? "text-gray-800" : "text-gray-500"}`}
            onClick={() => setActiveTab("reviews")}
          >
            내가 쓴 후기
          </button>
          <button
            className={`
              desktop:w-[13.1rem] desktop:h-[3.2rem] desktop:text-[2rem] desktop:leading-[3.2rem]
              tablet:w-[13.1rem] tablet:h-[3.2rem] tablet:text-[2rem] tablet:leading-[3.2rem]
              mobile:w-auto mobile:h-[2.6rem] mobile:text-[1.8rem] mobile:leading-[2.6rem]
              desktop:ml-[3.2rem] tablet:ml-[3.2rem] mobile:ml-[1.6rem]
              font-semibold ${activeTab === "wines" ? "text-gray-800" : "text-gray-500"}`}
            onClick={() => setActiveTab("wines")}
          >
            내가 등록한 와인
          </button>
        </div>
        <p className="desktop:mb-[2.2rem] tablet:mb-[2.2rem] mobile:mb-[1.5rem] font-regular desktop:text-[1.4rem] desktop:leading-[2.4rem] tablet:text-[1.4rem] tablet:leading-[2.4rem] mobile:text-[1.2rem] mobile:leading-[1.8rem] text-right text-primary">
          {`총 ${totalCount}개`}
        </p>
      </div>

      {isLoading && <div></div>}
      <div>
        {activeTab === "reviews" ? (
          <div className="mt-[2.2rem] space-y-[2rem]">
            {reviews.map((review) => (
              <MyReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="mt-[2.2rem] space-y-[2rem] ">
            {wines.map((wine) => (
              <MyWineCard key={wine.id} wine={wine} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
