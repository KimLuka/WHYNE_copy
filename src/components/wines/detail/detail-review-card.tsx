"use client";

import Image from "next/image";
import DefaultProfile from "@/../public/images/profile_default.svg";
import MoreButton from "@/../public/icons/arrow_down.svg";
import LikeEmptyButton from "@/../public/icons/empty_like.svg";
import LikeFullButton from "@/../public/icons/full_liked.svg";
import MenuIcon from "@/../public/icons/menu.svg";
import DropDownMenu from "@/components/common/dropdown-menu";
import DetailWineTag, { Aroma, AromaMapping } from "./detail-wine-tag";
import StarFill from "@/../public/icons/star_fill.svg";
import { useEffect, useState } from "react";
import api from "@/api/api";
import axios from "axios";

interface Review {
  id: number;
  rating: number;
  lightBold: number;
  somoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  isLiked: boolean;
}

interface User {
  id: number;
  nickname: string;
  image: string;
}

interface DetailReviewCardProps {
  wineid: string;
}

function timeAgo(createdAt: string): string {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000,
  );

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 전`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}일 전`;
  }
}

export default function DetailReviewCard({ wineid }: DetailReviewCardProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isExpand, setIsExpand] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  async function toggleLike(reviewId: number, isLiked: boolean) {
    // if (!localStorage.getItem("token")) {
    //   alert("로그인이 필요합니다.");
    //   return;
    // }

    try {
      if (isLiked) {
        await api.delete(`/reviews/${reviewId}/like`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } else {
        await api.post(`/reviews/${reviewId}/like`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }

      setReviews((prev) =>
        prev.map((review) =>
          review.id === reviewId ? { ...review, isLiked: !isLiked } : review,
        ),
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 403) {
          alert("본인이 작성한 리뷰에는 좋아요를 할 수 없습니다.");
        } else {
          console.error("좋아요 실패", error);
        }
      }
    }
  }

  useEffect(() => {
    async function fetchReviews() {
      try {
        setIsLoading(true);
        const response = await api.get<{ reviews: Review[] }>(
          `/wines/${wineid}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        setReviews(response.data.reviews || []);
      } catch (error) {
        console.error("리뷰 가져오기 실패", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReviews();
  }, [wineid]);

  if (isLoading) {
    return <div></div>;
  }

  function toggleExpand(reviewId: number) {
    setIsExpand((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  }

  return (
    <div className="w-[80rem] min-h-[30.2rem]">
      <p className="font-semibold text-[2rem] text-gray-800 leading-[3.2rem]">
        리뷰 목록
      </p>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="border-solid border-[0.1rem] bg-white rounded-[1.6rem] border-gray-300 p-[3rem_4rem] mt-[2rem]"
        >
          <div>
            <div className="flex justify-between">
              <div className="flex flex-row gap-[1.6rem] items-center">
                <div className="relative w-[6.4rem] h-[6.4rem]">
                  <Image
                    src={review.user.image || DefaultProfile}
                    alt="프로필 사진"
                    layout="fill"
                    className="desktop:w-[6.4rem] desktop:h-[6.4rem] border-solid border-gray-300 border-[0.1rem]  rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-[0.4rem]">
                  <p className="font-semibold text-[1.8rem] leading-[2.6rem] text-gray-800">
                    {review.user.nickname}
                  </p>
                  <p className="font-regular text-[1.6rem] leading-[2.6rem] text-gray-500">
                    {timeAgo(review.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-[1.8rem]">
                <button
                  className="relative desktop:w-[3.8rem] desktop:h-[3.8rem] tablet:w-[3.8rem] tablet:h-[3.8rem] mobile:w-[3.2rem] mobile:h-[3.2rem]"
                  onClick={() => toggleLike(review.id, review.isLiked || false)}
                >
                  <Image
                    src={review.isLiked ? LikeFullButton : LikeEmptyButton}
                    alt="좋아요 버튼"
                    layout="fill"
                  />
                </button>

                <div className=" z-10">
                  <DropDownMenu>
                    <div className="relative desktop:w-[3.8rem] desktop:h-[3.8rem] tablet:w-[3.8rem] tablet:h-[3.8rem] mobile:w-[3.2rem] mobile:h-[3.2rem]">
                      <Image src={MenuIcon} alt="메뉴 아이콘" layout="fill" />
                    </div>
                  </DropDownMenu>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[2rem] flex justify-between">
            <DetailWineTag
              aromas={(review.aroma || []).filter((item): item is Aroma =>
                Object.keys(AromaMapping).includes(item),
              )}
            />
            <div className="w-[8rem] h-[4.2rem] rounded-[1.2rem] p-[0.8rem_1.5rem] bg-[#f1edfc] flex items-center gap-[0.2rem] ">
              <div className="relative w-[2rem] h-[2rem] z-5">
                <Image
                  src={StarFill}
                  layout="fill"
                  alt="별점"
                  className="z-5"
                />
              </div>
              <p className="text-primary font-bold text-[1.8rem]">
                {review.rating.toFixed(1)}
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center flex-col ">
            {isExpand[review.id] && (
              <div className="flex justify-center items-start flex-col ">
                <div className="mt-[2.4rem] font-regular text-[1.6rem] text-gray-800 leading-[2.6rem]">
                  {review.content}
                </div>
                <div className="mt-[2rem] flex flex-col gap-[1.8rem]">
                  {[
                    {
                      label: "바디감",
                      min: "가벼워요",
                      max: "진해요",
                      value: reviews[0].lightBold,
                    },
                    {
                      label: "타닌",
                      min: "부드러워요",
                      max: "떫어요",
                      value: reviews[0].somoothTannic,
                    },
                    {
                      label: "당도",
                      min: "드라이해요",
                      max: "달아요",
                      value: reviews[0].drySweet,
                    },
                    {
                      label: "산미",
                      min: "안셔요",
                      max: "많이셔요",
                      value: reviews[0].softAcidic,
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-row items-center">
                      <div className="w-[5.6rem] h-[2.8rem] bg-gray-100 rounded-[0.6rem] p-[0.4rem_0.8rem] items-center justify-center flex  mr-[1.6rem]">
                        <p className="text-[1.4rem] text-gray-500 font-semibold leading-[2.4rem]">
                          {item.label}
                        </p>
                      </div>
                      <div className="flex flex-row flex-shrink-0 justify-center items-center">
                        <p className="w-[7rem] h-[1.9rem] font-medium text-[1.6rem] text-gray-800 mr-[1.55rem]">
                          {item.min}
                        </p>
                        <div className="relative w-[49.1rem] h-[1.6rem] flex items-center">
                          <div className="absolute w-full h-[0.6rem] bg-gray-100 rounded-[5rem] border-solid border-gray-300 border-[0.1rem]" />
                          <div
                            className="absolute w-[1.6rem] h-[1.6rem] bg-primary rounded-full"
                            style={{
                              left: `${(Math.min(Math.max(item.value, 0), 10) / 10) * 100}%`,
                            }}
                          />
                        </div>
                        <p className="w-[5.6rem] h-[1.9rem] text-right font-medium text-[1.6rem] text-gray-800 ml-[2.5rem]">
                          {item.max}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div
              className="cursor-pointer relative w-[3rem] h-[3rem]"
              onClick={() => toggleExpand(review.id)}
            >
              <Image
                src={MoreButton}
                alt="펼치기 버튼"
                layout="fill"
                className={`${isExpand[review.id] ? "rotate-180 mt-[0.65rem]" : "rotate-0 mt-[1.4rem]"}`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
