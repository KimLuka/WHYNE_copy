import PriceFilter from "@/components/wines/PriceFilter";
import RatingFliter from "@/components/wines/RatingFilter";
import TypesFilter from "@/components/wines/TypesFilter";
import Button from "@/components/common/Button";
import FilterButton from "@/components/wines/FilterButton";
import SearchBar from "@/components/wines/SearchBar";
import Card from "@/components/wines/Card";
import CardList from "@/components/wines/CardList";

export default function Wines() {
  return (
    <div className="flex flex-column w-auto max-w-[114rem] my-0 mx-auto">
      <section className="w-full max-w-[114rem] tablet:mt-[2rem] mobile:mt-[1.5rem] tablet:mb-[4rem] mobile:mb-[2.4rem] h-auto rounded-[1.6rem] tablet:p-[3rem] mobile:p-[2rem] bg-gray-100">
        <h2 className="font-bold text-gray-800 tablet:text-[2rem]/[2.4rem] mobile:text-[1.8rem]/[2.1rem]">
          이번 달 추천 와인
        </h2>
        <Card />
      </section>
      <div className="desktop:block tablet:flex tablet:justify-between tablet:gap-[1.6rem]">
        <div className="desktop:block mobile:flex tablet:justify-between tablet:flex-row tablet:gap-[2.4rem] mobile:gap-[2rem] mobile:flex-col-reverse">
          <FilterButton />
          <SearchBar />
        </div>
        <div className="desktop:flex desktop:justify-between desktop:gap-[6rem]">
          <div className="desktop:w-[28.4rem] desktop:h-auto desktop:flex desktop:flex-col desktop:gap-[6rem]">
            <div className="h-auto w-auto desktop:flex desktop:flex-col gap-[6rem] mobile:hidden">
              <TypesFilter />
              <PriceFilter />
              <RatingFliter />
            </div>
            <div className="tablet:flex mobile:hidden">
              <Button
                type="button"
                size="large"
                color="primary"
                addClassName=" rounded-[1.6rem] py-[1.6rem] px-[17.2rem] flex justify-center items-center"
                /*와인 등록 모달창 띄우기 */
              >
                <div className="font-bold text-lg text-center">
                  와인 등록하기
                </div>
              </Button>
            </div>
          </div>
          <CardList />
        </div>
      </div>
    </div>
  );
}
