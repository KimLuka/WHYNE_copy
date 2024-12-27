import Image from "next/image";
import DropDownMenu from "../common/dropdown-menu";
import StarFill from "../../../public/icons/star_fill.svg";
import MenuIcon from "@/../public/icons/menu.svg";
import DeleteModal from "../common/modal-delete";
import { useEffect, useState } from "react";
import instance from "@/api/api";
// import ReviewModal from "../modal-review/modal-review-edit";

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

export interface Review {
  id: number;
  rating: number;
  createdAt: string;
  name: string;
  content: string;
  wineid: number;
}

export default function MyReviewCard({ review }: { review: Review }) {
  const [wineName, setWineName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState<number | null>(null);

  async function fetchWineId(reviewId: number) {
    try {
      const response = await instance.get(`/reviews/${reviewId}`);
      return response.data.wineId;
    } catch (error) {
      console.error("와인 ID 가져오기 실패", error);
      return null;
    }
  }

  async function fetchWineName(wineId: number) {
    try {
      const response = await instance.get(`/wines/${wineId}`);
      return response.data.name;
    } catch (error) {
      console.error("와인 이름 가져오기 실패", error);
      return "알 수 없는 와인";
    }
  }

  useEffect(() => {
    async function loadWineName() {
      setIsLoading(true);
      try {
        const wineId = await fetchWineId(review.id);
        if (wineId) {
          const name = await fetchWineName(wineId);
          setWineName(name);
        } else {
          setWineName("알 수 없는 와인");
        }
      } catch (error) {
        console.error("와인 이름 가져오기 실패", error);
        setWineName("알 수 없는 와인");
      } finally {
        setIsLoading(false);
      }
    }
    loadWineName();
  }, [review.id]);

  function openDeleteModal() {
    setDeleteReviewId(review.id);
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setDeleteReviewId(null);
    setIsDeleteModalOpen(false);
  }

  // function openEditModal() {
  //   setIsEditModalOpen(true);
  // }

  // function closeEditModal() {
  //   setIsEditModalOpen(false);
  // }

  return (
    <div className="desktop:w-[80rem] desktop:p-[2.4rem_4rem] tablet:w-full tablet:p-[2.4rem_4rem] mobile:w-full mobile:p-[1.6rem_2rem] min-h-[20.2rem] border-solid border-[0.1rem] bg-white rounded-[1.6rem] border-gray-300 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="desktop:w-[8rem] desktop:h-[4.2rem] desktop:p-[0.8rem_1.5rem] tablet:w-[8rem] tablet:h-[3.8rem] tablet:p-[0.8rem_1.5rem] mobile:w-[6rem] mobile:h-[3.2rem] mobile:p-[0.8rem_1rem] mr-[1.5rem] rounded-[1.2rem]  bg-[#f1edfc] flex items-center">
            <Image
              src={StarFill}
              alt="별점"
              className="desktop:w-[2rem] desktop:h-[2rem] tablet:w-[2rem] tablet:h-[2rem] mobile:w-[1.6rem] mobile:h-[1.6rem]"
            />
            <p className="desktop:text-[1.8rem] desktop:leading-[2.6rem] tablet:text-[1.8rem] tablet:leading-[2.6rem] mobile:text-[1.4rem] mobile:leading-[2.4rem] text-primary font-bold ">
              {review.rating.toFixed(1)}
            </p>
          </div>
          <p className="desktop:text-[1.6rem] desktop:leading-[2.6rem] tablet:text-[1.6rem] tablet:leading-[2.6rem] mobile:text-[1.4rem] mobile:leading-[2.4rem] text-gray-300 font-regular">
            {timeAgo(review.createdAt)}
          </p>
        </div>
        {/* onEdit={openEditModal} */}
        <DropDownMenu onDelete={openDeleteModal}>
          <Image
            src={MenuIcon}
            alt="메뉴 아이콘"
            className="desktop:w-[2.6rem] tablet:w-[2.6rem] mobile:w-[2.4rem] desktop:h-[2.6rem] tablet:h-[2.6rem] mobile:h-[2.4rem]"
          />
        </DropDownMenu>
      </div>
      <div className="mt-[2rem]">
        <div className="leading-[2.6rem] text-[1.6rem] font-medium text-gray-500">
          {isLoading ? "" : wineName}
        </div>
        <div className="text-[1.6rem] font-regular text-gray-800 mt-[1rem] leading-[2.6rem]">
          {review.content}
        </div>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        id={deleteReviewId!}
        type="review"
      />
      {/* <ReviewModal
        isOpen={isEditModalOpen}
        onClick={closeEditModal}
        mode="edit"
        wineDetail={{ id: review.wineid, name: wineName || "알 수 없는 와인" }}
        reviewId={review.id}
        onUpdate={(updateReview) => {
          console.log("리뷰 업데이트 완", updateReview);
          closeEditModal();
        }}
      /> */}
    </div>
  );
}
