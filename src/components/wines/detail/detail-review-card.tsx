"use client";

import Image from "next/image";
import AlertModal from "@/components/common/alert-modal"; // 추가
import DefaultProfile from "@/../public/images/profile_default.svg";
import MoreButton from "@/../public/icons/arrow_down.svg";
import LikeEmptyButton from "@/../public/icons/empty_like.svg";
import LikeFullButton from "@/../public/icons/full_liked.svg";
import MenuIcon from "@/../public/icons/menu.svg";
import DropDownMenu from "@/components/common/dropdown-menu";
import DetailWineTag, { Aroma, AromaMapping } from "./detail-wine-tag";
import StarFill from "@/../public/icons/star_fill.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import AddReviewModal from "@/components/modal-review/AddReviewModal";
import instance from "@/api/api";
import RatingDetails from "./rating-details";
import DetailNoReview from "./detail-no-review";
import DeleteModal from "@/components/common/modal-delete";
import { useAuth } from "@/context/auth-provider";
// import { useReviewModalStore } from "@/provider/usereviewmodals";

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  const [alertText, setAlertText] = useState<string | null>(null); // 추가

  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [initialData, setInitialData] = useState<{
    rating: number;
    content: string;
    lightBold: number;
    smoothTannic: number;
    drySweet: number;
    softAcidic: number;
    aroma: Aroma[];
  } | null>(null);

  async function handleEdit(reviewId: number) {
    setIsEditing(true);
    try {
      const response = await instance.get(`/reviews/${reviewId}`);
      if (response.status === 200) {
        const {
          rating,
          content,
          lightBold,
          smoothTannic,
          drySweet,
          softAcidic,
          aroma,
        } = response.data;

        // aroma를 Aroma[]로 변환
        const aromaTags = ((aroma as string[]) || []).filter(
          (tag): tag is Aroma => Object.keys(AromaMapping).includes(tag),
        );

        setInitialData({
          rating,
          content,
          lightBold,
          smoothTannic,
          drySweet,
          softAcidic,
          aroma: aromaTags, // 변환된 Aroma[]를 할당
        });
        setSelectedReviewId(reviewId);
        setTimeout(() => setIsModalOpen(true), 0);
      }
    } catch (error) {
      console.error("리뷰 데이터를 불러오는 중 오류 발생:", error);
    }
  }

  async function toggleLike(reviewId: number, isLiked: boolean) {
    try {
      if (isLiked) {
        await instance.delete(`/reviews/${reviewId}/like`);
      } else {
        await instance.post(`/reviews/${reviewId}/like`);
      }

      setReviews((prev) =>
        prev.map((review) =>
          review.id === reviewId ? { ...review, isLiked: !isLiked } : review,
        ),
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 403) {
          setAlertText("본인이 작성한 리뷰에는 좋아요를 할 수 없습니다.");
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
        const response = await instance.get<{ reviews: Review[] }>(
          `/wines/${wineid}`,
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

  function openDeleteModal(reviewId: number) {
    setSelectedReviewId(reviewId);
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setSelectedReviewId(null);
    setIsDeleteModalOpen(false);
  }

  // function openEditModal(review: Review) {
  //   setSelectedReviewId(review.id);
  //   setIsEditModalOpen(true);
  // }

  return (
    <div className="flex desktop:w-[114rem] tablet:w-full mobile:w-full desktop:flex-row-reverse desktop:gap-[4rem] tablet:flex-col tablet:gap-[3.6rem] mobile:flex-col mobile:gap-[2rem]">
      <div className="">
        <RatingDetails id={wineid} />
      </div>
      {reviews.length > 0 ? (
        <div className="flex flex-row gap-[6rem] w-full">
          <div className="w-full desktop:mx-[2rem] tablet:mx-[2rem] mobile:mx-[1.6rem]">
            <span className="font-semibold text-[2rem] dark:text-[#EDEDED] text-gray-800 leading-[3.2rem] desktop:block tablet:hidden mobile:hidden">
              리뷰 목록
            </span>
            <div className="w-full">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="desktop:w-[80rem] tablet:w-[100%] mobile:w-[100%] border-solid border-[0.1rem] bg-white rounded-[1.6rem] border-gray-300 desktop:p-[3rem_4rem] tablet:p-[3rem_4rem] mobile:p-[2rem_1.6rem] mt-[2rem]"
                >
                  <div>
                    <div className="flex justify-between">
                      <div className="flex flex-row gap-[1.6rem] items-center">
                        <div className="relative desktop:w-[6.4rem] desktop:h-[6.4rem] tablet:w-[6.4rem] tablet:h-[6.4rem] mobile:w-[4.2rem] mobile:h-[4.2rem]">
                          <Image
                            src={review.user.image || DefaultProfile}
                            alt="프로필 사진"
                            layout="fill"
                            className="border-solid border-gray-300 border-[0.1rem] rounded-full"
                          />
                        </div>
                        <div className="flex flex-col desktop:gap-[0.4rem] tablet:gap-[0.4rem] mobile:gap-0">
                          <span className="font-semibold desktop:text-[1.8rem] tablet:text-[1.8rem] mobile:text-[1.6rem] leading-[2.6rem] text-gray-800">
                            {review.user.nickname}
                          </span>
                          <time className="font-regular desktop:text-[1.6rem] tablaet:text-[1.6rem] mobile:text-[1.4rem] leading-[2.6rem] text-gray-500">
                            {timeAgo(review.createdAt)}
                          </time>
                        </div>
                      </div>
                      <div className="flex flex-row gap-[1.8rem]">
                        <button
                          className="relative desktop:w-[3.8rem] desktop:h-[3.8rem] tablet:w-[3.8rem] tablet:h-[3.8rem] mobile:w-[3.2rem] mobile:h-[3.2rem]"
                          onClick={() =>
                            toggleLike(review.id, review.isLiked || false)
                          }
                        >
                          <Image
                            src={
                              review.isLiked ? LikeFullButton : LikeEmptyButton
                            }
                            alt="좋아요 버튼"
                            layout="fill"
                          />
                        </button>

                        <div className="z-10">
                          <DropDownMenu
                            onDelete={() => {
                              if (review.user.id === user?.id) {
                                openDeleteModal(review.id);
                              } else {
                                setAlertText(
                                  "본인이 작성한 리뷰만 삭제할 수 있습니다.",
                                );
                                return;
                              }
                            }}
                            onEdit={() => {
                              if (review.user.id === user?.id) {
                                handleEdit(review.id);
                              } else {
                                setAlertText(
                                  "본인이 작성한 리뷰만 수정할 수 있습니다.",
                                );
                                return;
                              }
                            }}
                          >
                            <div className="relative desktop:w-[3.8rem] desktop:h-[3.8rem] tablet:w-[3.8rem] tablet:h-[3.8rem] mobile:w-[3.2rem] mobile:h-[3.2rem]">
                              <Image
                                src={MenuIcon}
                                alt="메뉴 아이콘"
                                layout="fill"
                              />
                            </div>
                          </DropDownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="desktop:mt-[2rem] tablet:mt-[2rem] mobile:mt-[1.6rem] flex justify-between">
                    <DetailWineTag
                      aromas={(review.aroma || []).filter(
                        (item): item is Aroma =>
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

                  <div className="flex justify-center flex-col ">
                    {isExpand[review.id] && (
                      <div className="flex justify-center items-start flex-col ">
                        <p className="desktop:mt-[2.4rem] tablet:mt-[2.4rem] mobile:mt-[1.6rem] font-regular text-[1.6rem] text-gray-800 leading-[2.6rem]">
                          {review.content}
                        </p>
                        <div className="w-full whitespace-nowrap desktop:mt-[2rem] tablet:mt-[2rem] mobile:mt-[1.6rem] flex flex-col desktop:gap-[1.8rem] tablet:gap-[1.8rem] mobile:gap-[1.6rem]">
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
                            <div
                              key={index}
                              className="flex flex-row items-center w-full"
                            >
                              <div
                                className="
                                bg-gray-100 rounded-[0.6rem] items-center justify-center flex 
                                desktop:w-[5.6rem] desktop:h-[2.8rem] desktop:p-[0.4rem_0.8rem] desktop:mr-[1.6rem] 
                                tablet:w-[5.6rem] tablet:h-[2.8rem] tablet:p-[0.4rem_0.8rem] tablet:mr-[1.6rem] 
                                mobile:w-[4.8rem] mobile:h-[3rem] mobile:p-[0.5rem_0.8rem] mobile:mr-[0.9rem] 
                              "
                              >
                                <p className=" destkop:text-[1.4rem] tablet:text-[1.4rem] mobile:[1.2rem] text-gray-500 font-semibold leading-[2.4rem]">
                                  {item.label}
                                </p>
                              </div>
                              <div className="flex flex-row justify-center items-center w-full">
                                <p
                                  className="
                                font-medium text-gray-800 
                                desktop:min-w-[7rem] desktop:text-[1.6rem] desktop:leading-[2.6rem] desktop:  1.4rem]
                                tablet:min-w-[7rem] tablet:text-[1.6rem] tablet:leading-[2.6rem] tablet:mr-[1.4rem]
                                mobile:min-w-[6.2rem] mobile:text-[1.4rem] mobile:leading-[2.4rem] mobile:mr-[1.4rem]
                                "
                                >
                                  {item.min}
                                </p>
                                <div className="relative flex w-full items-center">
                                  <div className="absolute w-full h-[0.6rem] bg-gray-100 rounded-[5rem] border-solid border-gray-300 border-[0.1rem]" />
                                  <div
                                    className="absolute bg-primary rounded-full desktop:w-[1.6rem] desktop:h-[1.6rem] tablet:w-[1.6rem] tablet:h-[1.6rem] mobile:w-[1.2rem] mobile:h-[1.2rem]"
                                    style={{
                                      left: `${(Math.min(Math.max(item.value, 0), 10) / 10) * 100}%`,
                                    }}
                                  />
                                </div>
                                <p
                                  className="
                                text-right font-medium text-gray-800
                                desktop:min-w-[5.6rem] desktop:text-[1.6rem] desktop:leading-[2.6rem] desktop:ml-[2.5rem]
                                tablet:min-w-[5.6rem] tablet:text-[1.6rem] tablet:leading-[2.6rem] tablet:ml-[2.5rem]
                                mobile:min-w-[5rem] mobile:text-[1.4rem] mobile:leading-[2.4rem] mobile:ml-[1.6rem]
                                "
                                >
                                  {item.max}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div
                      className="cursor-pointer relative w-[3rem] h-[3rem] mx-auto"
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
          </div>
        </div>
      ) : (
        <DetailNoReview wineid={wineid} />
      )}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        id={selectedReviewId!}
        type="review"
      />
      {alertText && (
        <AlertModal
          isOpen={!!alertText}
          text={alertText}
          onClose={() => setAlertText(null)}
        />
      )}
      {isModalOpen && (
        <AddReviewModal
          isOpen={isModalOpen}
          onClick={() => setIsModalOpen(false)}
          wineId={wineid}
          id={selectedReviewId!}
          isEditing={isEditing}
          initialData={initialData || undefined}
        />
      )}
    </div>
  );
}
