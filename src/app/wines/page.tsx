"use client";

import { useState, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import instance from "@/api/api";
import { removeEmptyField } from "@/utils/parameter";
import { WineParam, Filters, WineListType, WineType } from "@/types/wine";
import PriceFilter from "@/components/wines/price-filter";
import RatingFliter from "@/components/wines/rating-filter";
import TypesFilter from "@/components/wines/types-filter";
import Button from "@/components/common/Button";
import FilterButton from "@/components/wines/filter-button";
import Search from "@/components/wines/search";
import RecommendCard from "@/components/wines/recommend-card";
import EntireCard from "@/components/wines/entire-card";
import FilterModal from "@/components/wines/modal/filter-modal";
import arrowRight from "../../../public/icons/right.svg";
import "swiper/css";
import "swiper/css/navigation";
import { useAddWineModal } from "./AddWineModalProvider";

const InitialFilters: Filters = {
  limit: 1000,
  type: "",
  minPrice: 0,
  maxPrice: 500000,
  rating: 5,
};

// 와인 목록을 가져오는 함수 (공통화)
const fetchData = async (
  url: string,
  { limit = 1000, cursor, type, minPrice, maxPrice, rating, name }: WineParam,
  /*eslint-disable*/
): Promise<any> => {
  const param = removeEmptyField({
    limit,
    cursor,
    type,
    minPrice,
    maxPrice,
    rating,
    name,
  });

  try {
    const response = await instance.get(`${url}`, {
      params: param,
    });
    return response.data;
  } catch (error) {
    console.error(`${url} 데이터 업로드 실패:`, error);
    alert((error as Error).message);
    return null;
  }
};

export default function Wines() {
  const { openAddWineModal } = useAddWineModal();
  const [recommendList, setRecommendList] = useState<WineType[]>([
    {
      id: 0,
      name: "",
      region: "",
      image: "",
      price: 0,
      type: "",
      avgRating: 0,
      reviewCount: 0,
      recentReview: null,
    },
  ]);

  const [entireList, setEntireList] = useState<WineListType>({
    list: [],
    nextCursor: 0,
    totalCount: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // 추천 와인 목록 가져오기
  const fetchRecommendData = useCallback(async () => {
    const response = await fetchData("/wines/recommended", { limit: 1000 });
    if (response) {
      setRecommendList(response);
      console.log("추천 와인 목록", response);
    }
  }, []);

  // 와인 목록 가져오기
  const fetchEntireData = useCallback(async (filters = InitialFilters) => {
    setIsLoading(true);
    const response = await fetchData("/wines", filters);
    if (response) {
      setEntireList(response);
    }
    setIsLoading(false);
  }, []);

  // 추천 와인, 전체 와인 목록 가져오기
  useEffect(() => {
    fetchRecommendData();
    fetchEntireData();
  }, [fetchRecommendData, fetchEntireData]);

  // 검색 필터
  const handleSearchChange = async (name: string) => {
    const response = await fetchData("/wines", { ...InitialFilters, name });
    if (response) setEntireList(response);
  };

  const handleFilterChange = useCallback(
    async (updatedValues: Partial<Filters>) => {
      const updatedFilters = { ...InitialFilters, ...updatedValues };
      const response = await fetchData("/wines", updatedFilters);
      if (response) setEntireList(response);
    },
    [],
  );

  const handleTypeChange = useCallback(
    (type: string) => {
      handleFilterChange({ type });
    },
    [handleFilterChange],
  );

  const handlePriceChange = useCallback(
    (minPrice: number, maxPrice: number) => {
      handleFilterChange({ minPrice, maxPrice });
    },
    [handleFilterChange],
  );

  const handleRatingChange = useCallback(
    (rating: number) => {
      handleFilterChange({ rating });
    },
    [handleFilterChange],
  );

  const handleFilterModalOpen = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const handleModalToggle = () => {
    setIsFilterModalOpen((prev) => !prev);
  };

  const fetchFilteredData = async (filters = InitialFilters) => {
    setIsLoading(true);
    try {
      const response = await fetchData("/wines", filters);
      if (response) setEntireList(response);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-column w-auto max-w-[114rem] my-0 mx-auto">
      <section className="w-full max-w-[114rem] tablet:mt-[2rem] mobile:mt-[1.5rem] tablet:mb-[4rem] mobile:mb-[2.4rem] h-auto rounded-[1.6rem] tablet:p-[3rem] mobile:p-[2rem] dark:bg-[#2A2A3D] bg-gray-100">
        <h2 className="font-bold dark:text-[#E0E6EE] text-gray-800 tablet:text-[2rem]/[2.4rem] mobile:text-[1.8rem]/[2.1rem]">
          이번 달 추천 와인
        </h2>
        {Array.isArray(recommendList) && recommendList.length > 0 ? (
          <div className="relative group w-full">
            <Swiper
              modules={[Navigation]}
              slidesPerView="auto"
              spaceBetween={20}
              centeredSlides={false}
              loop={true}
              navigation={{
                nextEl: ".swiper-button-next",
              }}
              breakpoints={{
                344: {
                  slidesPerView: 3,
                },
                744: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
              className="w-full swiper-wrapper"
            >
              {recommendList.map((data) => (
                <SwiperSlide key={data.id}>
                  <RecommendCard data={data} />
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="swiper-button-next absolute top-2/3 right-0 transform -translate-y-1/2 bg-gray-200 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Image
                src={arrowRight}
                width={24}
                height={24}
                alt="추천 와인 더보기"
              />
            </button>
          </div>
        ) : (
          <p>와인 추천을 준비중이예요!</p>
        )}
      </section>
      <div className="flex flex-col desktop:items-end tablet:items-center">
        <div className="flex tablet:justify-between desktop:justify-end tablet:gap-[1.6rem] tablet:w-[70.4rem] tablet:flex-row mobile:flex-col">
          <div className="mobile:flex tablet:justify-between tablet:flex-row tablet:gap-[2.4rem] mobile:gap-[2rem] mobile:flex-col-reverse">
            <FilterButton onClick={handleFilterModalOpen} />
            <FilterModal
              isOpen={isFilterModalOpen}
              onToggle={handleFilterModalOpen}
              onFilterApply={(filters) => {
                fetchFilteredData({ ...InitialFilters, ...filters });
                handleModalToggle();
              }}
              onFilterReset={() => {
                fetchFilteredData(InitialFilters);
                handleModalToggle();
              }}
              onTypeChange={handleTypeChange}
              onPriceChange={handlePriceChange}
              onRatingChange={handleRatingChange}
            />
            <Search onChange={handleSearchChange} />
          </div>
          <div className="desktop:hidden tablet:static tablet:mt-0 mobile:sticky mobile:mt-[2.5rem]">
            <Button
              type="button"
              size="large"
              color="primary"
              addClassName="font-bold text-lg text-center rounded-[1.6rem] tablet:py-[1.6rem] tablet:px-[6rem] flex justify-center items-center tablet:shadow-none tablet:w-auto mobile:w-[34.3rem] tablet:static tablet:translate-x-0 mobile:fixed mobile:translate-x-1/2 mobile:right-1/2 mobile:bottom-[1.5rem] mobile:p-[1.6rem] mobile:shadow-xl"
              onClick={openAddWineModal}
            >
              와인 등록하기
            </Button>
          </div>
        </div>
        <div className="desktop:flex desktop:gap-[6rem]">
          <div className="w-[28.4rem] desktop:h-auto desktop:flex desktop:flex-col desktop:gap-[6rem] mobile:hidden">
            <div className="h-auto w-auto mt-[5.9rem] desktop:flex desktop:flex-col gap-[6rem] ">
              <TypesFilter onChange={(type) => handleFilterChange({ type })} />
              <PriceFilter
                onChange={(minPrice, maxPrice) =>
                  handleFilterChange({ minPrice, maxPrice })
                }
              />
              <RatingFliter
                onChange={(rating) => handleFilterChange({ rating })}
              />
            </div>
            <Button
              type="button"
              size="large"
              color="primary"
              addClassName="font-bold text-lg text-center rounded-[1.6rem] p-[1.6rem] flex justify-center items-center"
              onClick={openAddWineModal}
            >
              와인 등록하기
            </Button>
          </div>
          {isLoading ? (
            <p className="text-gray-600">와인을 준비중입니다...</p>
          ) : entireList.list.length > 0 ? (
            <ul>
              {entireList.list.map((data) => (
                <li key={data.id}>
                  <EntireCard data={data} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">
              일치하는 와인이 없습니다. 다음에 다시 시도해주세요.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
