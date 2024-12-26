import TypesFilter from "../types-filter";
import PriceFilter from "../price-filter";
import RatingFilter from "../rating-filter";
import Button from "@/components/common/Button";
import Modal from "@/components/common/modal-container";
import Image from "next/image";
import XButton from "../../../../public/icons/x_button.svg";

interface Filter {
  isOpen: boolean;
  onToggle: () => void;
  filters: {
    limit: number;
    type: string;
    minPrice: number;
    maxPrice: number;
    rating: number;
  };
  onFilterApply: () => void;
  onFilterReset: () => void;
  onTypeChange: (type: string) => void;
  onPriceChange: (minPrice: number, maxPrice: number) => void;
  onRatingChange: (rating: number) => void;
}

export default function FilterModal({
  isOpen,
  onToggle,
  onFilterApply,
  onFilterReset,
  onTypeChange,
  onPriceChange,
  onRatingChange,
}: Filter) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onToggle}
        className="tablet:mt-0 mobile:mt-[8rem] mobile:mb-0 rounded-t-[1.6rem] tablet:rounded-[1.6rem]  mobile:w-[37.5rem] mobile:p-[2.4rem]"
      >
        <div className="flex flex-col h-full mobile:gap-[4rem]">
          <div className="flex flex-col mobile:gap-[3.2rem]">
            <div className="flex justify-between">
              <h2 className="text-gray-800 text-bold text-xl">필터</h2>
              <button onClick={onToggle}>
                <Image src={XButton} width={24} height={24} alt="필터 닫기" />
              </button>
            </div>
            <div className="flex flex-col gap-[3.2rem]">
              <TypesFilter onChange={onTypeChange} />
              <PriceFilter onChange={onPriceChange} />
              <RatingFilter onChange={onRatingChange} />
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              size="small"
              color="secondary"
              type="reset"
              onClick={onFilterReset}
              addClassName="w-[9.6rem] h-[5.4rem] py-[1rem] px-[1.6rem] font-bold text-bold text-lg text-center"
            >
              초기화
            </Button>
            <Button
              size="small"
              color="primary"
              type="submit"
              onClick={onFilterApply}
              addClassName="w-[21rem] h-[5.4rem] py-[1rem] px-[1.6rem] font-bold text-bold text-lg"
            >
              필터 적용하기
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
