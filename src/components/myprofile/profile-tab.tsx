"use client";

import { useState, useCallback } from "react";
import MyReviewCard, { Review } from "./my-review-card";
import MyWineCard, { Wine } from "./my-wine-card";
import "@/../public/images/placeholder1.png";
import instance from "@/api/api";
import InfiniteScroll from "../InfiniteScroll/infiniteScroll"; // InfiniteScroll 컴포넌트 임포트

export default function ProfileTab() {
  const [activeTab, setActiveTab] = useState<"reviews" | "wines">("reviews");
  const [reviews, setReviews] = useState<Review[]>([]); // 리뷰 데이터
  const [wines, setWines] = useState<Wine[]>([]); // 와인 데이터
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [totalCount, setTotalCount] = useState(0); // 전체 개수
  const [reviewCursor, setReviewCursor] = useState<number | null>(null); // 리뷰 커서
  const [wineCursor, setWineCursor] = useState<number | null>(null); // 와인 커서
  const [hasMoreReviews, setHasMoreReviews] = useState(true); // 더 불러올 리뷰 데이터 여부
  const [hasMoreWines, setHasMoreWines] = useState(true); // 더 불러올 와인 데이터 여부

  const initialLimit = 5; // 데이터 로딩 개수

  // 리뷰 데이터 가져오기 (useCallback으로 메모이제이션)
  const fetchReviews = useCallback(
    async (cursor: number | null) => {
      if (isLoading || !hasMoreReviews) return; // 로딩 중이거나 더 이상 불러올 데이터가 없으면 return
      console.log("Fetching reviews with cursor:", cursor);
      try {
        setIsLoading(true);
        const response = await instance.get("/users/me/reviews", {
          params: { limit: initialLimit, cursor },
        });

        const { list, totalCount, nextCursor } = response.data;
        console.log("Reviews data:", list);
        console.log("Total reviews count:", totalCount);
        console.log("Next cursor for reviews:", nextCursor);

        // 중복되지 않는 데이터만 추가
        setReviews((prevReviews) => {
          const uniqueReviews = [
            ...prevReviews,
            ...list.filter(
              (newReview: Review) =>
                !prevReviews.some((review) => review.id === newReview.id),
            ),
          ];
          return uniqueReviews;
        });

        setTotalCount(totalCount);
        setReviewCursor(nextCursor); // 커서 저장

        if (!nextCursor) {
          setHasMoreReviews(false); // 더 이상 로드할 데이터 없으면 false
        }
      } catch (error) {
        console.error("리뷰 데이터 불러오기 실패", error);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, hasMoreReviews],
  );

  // 와인 데이터 가져오기 (useCallback으로 메모이제이션)
  const fetchWines = useCallback(
    async (cursor: number | null) => {
      if (isLoading || !hasMoreWines) return; // 로딩 중이거나 더 이상 불러올 데이터가 없으면 return
      console.log("Fetching wines with cursor:", cursor);
      try {
        setIsLoading(true);
        const response = await instance.get("/users/me/wines", {
          params: { limit: initialLimit, cursor },
        });

        const { list, totalCount, nextCursor } = response.data;
        console.log("Wines data:", list);
        console.log("Total wines count:", totalCount);
        console.log("Next cursor for wines:", nextCursor);

        // 중복되지 않는 데이터만 추가
        setWines((prevWines) => {
          const uniqueWines = [
            ...prevWines,
            ...list.filter(
              (newWine: Wine) =>
                !prevWines.some((wine) => wine.id === newWine.id),
            ),
          ];
          return uniqueWines;
        });

        setTotalCount(totalCount);
        setWineCursor(nextCursor); // 커서 저장
        if (!nextCursor) {
          setHasMoreWines(false); // 더 이상 로드할 데이터 없으면 false
        }
      } catch (error) {
        console.error("와인 데이터 불러오기 실패", error);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, hasMoreWines],
  );

  // 탭 변경 시 데이터 가져오기
  // useEffect(() => {
  //   if (activeTab === "reviews") {
  //     fetchReviews(reviewCursor);
  //   } else {
  //     fetchWines(wineCursor);
  //   }
  // }, [activeTab, reviewCursor, wineCursor, fetchReviews, fetchWines]);

  return (
    <div className="desktop:w-[80rem] desktop:h-[3.2rem] tablet:w-full mobile:w-full">
      <div className="flex justify-between items-center ">
        <div>
          <button
            className={`desktop:w-[9.6rem] desktop:h-[3.2rem] desktop:text-[2rem] desktop:leading-[3.2rem] tablet:w-[9.6rem] tablet:h-[3.2rem] tablet:text-[2rem] tablet:leading-[3.2rem] mobile:w-[8.7em] mobile:h-[2.6rem] mobile:text-[1.8rem] mobile:leading-[2.6rem] font-semibold ${activeTab === "reviews" ? "text-gray-800" : "text-gray-500"}`}
            onClick={() => setActiveTab("reviews")}
          >
            내가 쓴 후기
          </button>
          <button
            className={`ml-[3.2rem] w-[13.1rem] h-[3.2rem] text-[2rem] font-semibold leading-[3.2rem] ${activeTab === "wines" ? "text-gray-800" : "text-gray-500"}`}
            onClick={() => setActiveTab("wines")}
          >
            내가 등록한 와인
          </button>
        </div>
        <p className="font-regular text-[1.4rem] leading-[2.4rem] text-right text-primary">
          {`총 ${totalCount}개`}
        </p>
      </div>

      {isLoading && <div>로딩 중...</div>}

      <div>
        {activeTab === "reviews" ? (
          <InfiniteScroll
            loadData={fetchReviews}
            isFetching={isLoading}
            hasMore={hasMoreReviews}
            cursor={reviewCursor}
          >
            <div className="mt-[2.2rem] space-y-[2rem]">
              {reviews.map((review) => (
                <MyReviewCard key={review.id} review={review} />
              ))}
            </div>
            {/* 더 이상 데이터가 없을 때 메시지 표시 */}
            {!hasMoreReviews && !isLoading && (
              <div className="mt-2 text-center text-[1.8rem] text-[#CCCCCC]">
                더 이상 데이터가 없습니다.
              </div>
            )}
          </InfiniteScroll>
        ) : (
          <InfiniteScroll
            loadData={fetchWines}
            isFetching={isLoading}
            hasMore={hasMoreWines}
            cursor={wineCursor}
          >
            <div className="mt-[2.2rem] space-y-[2rem]">
              {wines.map((wine) => (
                <MyWineCard key={wine.id} wine={wine} />
              ))}
            </div>
            {/* 더 이상 데이터가 없을 때 메시지 표시 */}
            {!hasMoreWines && !isLoading && (
              <div className="mt-2 text-center text-[1.8rem] text-[#CCCCCC]">
                더 이상 데이터가 없습니다.
              </div>
            )}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}
