import TypesFilter from "../types-filter";
import PriceFilter from "../price-filter";
import RatingFilter from "../rating-filter";
import Button from "@/components/common/Button";
import Modal from "@/components/common/modal-container";

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
      <Modal isOpen={isOpen} onClose={onToggle}>
        <div>
          <div>
            <h2>필터</h2>
            <button onClick={onToggle}>x</button>
          </div>
          <div className="h-auto w-auto mt-[5.9rem] desktop:flex desktop:flex-col gap-[6rem] ">
            <TypesFilter onChange={onTypeChange} />
            <PriceFilter onChange={onPriceChange} />
            <RatingFilter onChange={onRatingChange} />
          </div>
        </div>
        <div>
          <Button
            size="small"
            color="white"
            type="reset"
            onClick={onFilterReset}
          >
            초기화
          </Button>
          <Button
            size="small"
            color="primary"
            type="submit"
            onClick={onFilterApply}
          >
            필터 적용하기
          </Button>
        </div>
      </Modal>
    </>
  );
}
