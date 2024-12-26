"use client";

import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "../../components/InfiniteScroll/infiniteScroll";
import axios, { AxiosInstance } from "axios";
import EntireCard from "@/components/wines/entire-card";

interface Data {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: {
    user: {
      id: number;
      nickname: string;
      image: string;
    };
    updatedAt: string;
    createdAt: string;
    content: string;
    aroma: string[];
    rating: number;
    id: number;
  };
  userId: number;
}

const MyPage: React.FC = () => {
  const [data, setData] = useState<Data[]>([]); // 데이터 상태
  const [isFetching, setIsFetching] = useState<boolean>(false); // 데이터 로딩 상태
  const [hasMore, setHasMore] = useState<boolean>(true); // 더 이상 로드할 데이터가 있는지 여부
  const [cursor, setCursor] = useState<number | null>(0); // cursor 기본값을 0으로 설정
  const [initialLoad, setInitialLoad] = useState<boolean>(true); // 첫 번째 로드 상태

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: "https://winereview-api.vercel.app/11-5",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 데이터를 불러오는 함수
  const loadData = useCallback(
    async (cursor: number | null) => {
      if (isFetching || !hasMore) {
        return; // isFetching이 true거나 hasMore가 false일 때 데이터 요청을 막음
      }

      setIsFetching(true);

      try {
        const limit = 5; // 처음 5개 데이터를 로드하도록 설정
        const url = `/wines?limit=${limit}&cursor=${cursor ?? 0}`; // cursor를 숫자형으로 API에 전달

        const response = await axiosInstance.get(url);
        const result = response.data;

        console.log("API Response:", result); // 응답 데이터 전체 확인

        // 응답 데이터 구조에 맞게 수정
        const newData = Array.isArray(result.list) ? result.list : []; // result.list로 수정
        const nextCursor = result.nextCursor; // nextCursor로 수정

        console.log("Data:", newData); // 데이터 확인
        console.log("Next Cursor:", nextCursor); // 커서 확인

        if (newData.length > 0) {
          setData((prevData) => [...prevData, ...newData]);
        }

        setCursor(nextCursor); // 새로운 cursor 값을 숫자형으로 설정

        if (!nextCursor) {
          setHasMore(false); // 커서가 없으면 더 이상 데이터 없음
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsFetching(false);
        setInitialLoad(false); // 첫 번째 로딩 후 초기 로딩 상태 false로 변경
      }
    },
    [axiosInstance, isFetching, hasMore], // 의존성 배열
  );

  useEffect(() => {
    if (initialLoad) {
      loadData(cursor); // 첫 번째 로딩 시 cursor 값을 전달
    }
  }, [cursor, loadData, hasMore, initialLoad]);

  console.log(data); // 데이터를 콘솔에서 확인

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Infinite Scroll Page</h1>
      <InfiniteScroll
        loadData={loadData}
        isFetching={isFetching}
        hasMore={hasMore}
        cursor={cursor} // cursor 값 전달
      >
        <div className="card-list">
          {data.map((item: Data) => (
            <EntireCard key={item.id} data={item} />
          ))}
        </div>
      </InfiniteScroll>

      {/* 데이터가 더 이상 없을 때 메시지 표시 */}
      {!hasMore && !isFetching && (
        <div className="mt-2 text-center text-[1.8rem] text-[#CCCCCC]">
          더 이상 데이터가 없습니다.
        </div>
      )}
    </div>
  );
};

export default MyPage;
