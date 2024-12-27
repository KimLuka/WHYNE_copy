"use client";

import Button from "@/components/common/Button";
import Image from "next/image";
import defaultStar from "../../../../public/icons/star.svg";
import purpleStar from "../../../../public/icons/star_fill.svg";
import instance from "@/api/api";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import AddReviewModal from "@/components/modal-review/AddReviewModal";
import ReviewProvider from "@/provider/usereviewmodals";

interface RatingDetailsProps {
  avgRating: number;
  reviewCount: number;
  avgRatings: {
    [key: number]: number;
  };
}

interface WineID {
  id: string;
}

interface ErrorResponse {
  message: string;
}

export default function RatingDetails({ id }: WineID) {
  const [ratingDetails, setRatingDetails] = useState<RatingDetailsProps>({
    avgRating: 0,
    reviewCount: 0,
    avgRatings: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });

  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    async function getRatings(id: string) {
      try {
        const res = await instance.get(`/wines/${id}`);
        setRatingDetails(res.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(axiosError.response?.data || axiosError.message);

        const errorData = axiosError.response?.data as ErrorResponse;
        console.error(errorData);
        alert(
          errorData?.message ||
            axiosError.message ||
            "알 수 없는 오류가 발생했습니다.",
        );
      }
    }
    getRatings(id);
  }, [id]);

  return ratingDetails.reviewCount ? (
    <div className="flex flex-col aspect-[280/311] w-[28rem] gap-[3rem]">
      <div className="flex flex-col gap-[2rem]">
        <div className="flex gap-[2rem]">
          <h2 className="text-[5.4rem] font-extrabold">
            {ratingDetails.avgRating?.toFixed(1)}
          </h2>
          <div className="flex flex-col gap-4">
  <div className="flex gap-2">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="w-12 h-12"> {/* 48x48 크기로 컨테이너 설정 */}
        <Image
          width={24}
          height={24}
          src={
            index < ratingDetails.avgRating
              ? purpleStar
              : defaultStar
          }
          alt={`별 ${index + 1}`}
          className="w-full h-full object-contain"
        />
      </div>
    ))}
  </div>

            <p className="text-gray-500 text-[1.4rem]">
              {ratingDetails.reviewCount}개의 후기
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[1.5rem]">
          {[
            { label: "5점", value: ratingDetails.avgRatings?.[5] || 0 },
            { label: "4점", value: ratingDetails.avgRatings?.[4] || 0 },
            { label: "3점", value: ratingDetails.avgRatings?.[3] || 0 },
            { label: "2점", value: ratingDetails.avgRatings?.[2] || 0 },
            { label: "1점", value: ratingDetails.avgRatings?.[1] || 0 },
          ].map((ratings, index) => (
            <div
              key={index}
              className="w-[33rem] flex items-center justify-center"
            >
              <p className="text-center text-[1.6rem] text-gray-500 leading-[2.4rem] mr-[1.5rem]">
                {ratings.label}
              </p>
              <div className="flex flex-shrink-0 h-[1.9rem] justify-center items-center">
                <div className="relative w-[28rem] flex items-center">
                  <div className="absolute w-[24.1rem] h-[0.6rem] bg-gray-100 rounded-[5rem]" />
                  {ratings.value !== 0 && (
                    <div
                      className="absolute max-w-[24.1rem] h-[0.6rem] bg-primary rounded-[5rem] z-50"
                      style={{
                        width: `${(ratings.value / ratingDetails.reviewCount) * 100}%`,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button
        onClick={() => setIsOpenModal(!isOpenModal)}
        size="small"
        color="primary"
        type="button"
        addClassName="text-[1.6rem] aspect-[113/42] max-w-[11.3rem] h-[4.2rem] font-semibold text-center"
      >
        리뷰 남기기
      </Button>
      {isOpenModal && (
        <ReviewProvider>
          <AddReviewModal
            isOpen={isOpenModal}
            onClick={() => setIsOpenModal(!isOpenModal)}
          ></AddReviewModal>
        </ReviewProvider>
      )}
    </div>
  ) : null;
}
