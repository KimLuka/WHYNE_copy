import Image from "next/image";
import DropDownMenu from "../common/dropdown-menu";
import StarFill from "../../../public/icons/star_fill.svg";
import MenuIcon from "@/../public/icons/menu.svg";
import DeleteModal from "../common/modal-delete";
import { useEffect, useState } from "react";
import instance from "@/api/api";

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

  return (
    <div className="desktop:w-[80rem] tablet:w-full min-h-[20.2rem] border-solid border-[0.1rem] bg-white rounded-[1.6rem] border-gray-300 p-[2.4rem_4rem]">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-[1.5rem] w-[8rem] h-[4.2rem] rounded-[1.2rem] p-[0.8rem_1.5rem] bg-[#f1edfc] flex items-center">
            <Image src={StarFill} alt="별점" className="w-[2rem] h-[2rem]" />
            <p className="text-primary font-bold text-[1.8rem]">
              {review.rating.toFixed(1)}
            </p>
          </div>
          <p className="text-gray-300 text-[1.6rem] font-regular">
            {timeAgo(review.createdAt)}
          </p>
        </div>
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
    </div>
  );
}
