import Image from "next/image";
import logo from "../../public/icons/purple_logo.svg";
import CardList from "@/components/landing/CardList";
import SectionCard from "@/components/landing/SectionCard";
import typesFilter from "../../public/images/types_filter.svg";
import pricesFilter from "../../public/images/prices_filter.svg";
import filterWine from "../../public/images/filter_wine.svg";
import review from "../../public/images/review.svg";
import mobileFilterWine from "../../public/images/mobile_filter_wine.svg";
import mobileReview from "../../public/images/mobile_review.svg";
import Button from "@/components/common/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-column desktop:pb-[10.9rem] tablet:pb-[7.2rem] mobile:pb-[6.2rem]">
      <section className="bg-black overflow-hidden rounded-[1.6rem] desktop:w-[114rem] tablet:w-[70.4rem] mobile:w-[34.3rem] desktop:h-[53.5rem] tablet:h-[39.4rem] mobile:h-[40.4rem] desktop:mt-[8rem] mobile:mt-[2.4rem] ">
        <div className="flex-column">
          <div className="flex-column gap-[3.2rem] desktop:mt-[11.2rem] desktop:mb-[5.8rem] tablet:mt-[8rem] tablet:mb-[3.4rem] mobile:mt-[5.6rem] mobile:mb-[10.5rem]">
            <div className="h-auto mobile:w-[8.1rem] tablet:w-[10.2rem]">
              <Image
                width={4}
                height={1}
                layout="responsive"
                src={logo}
                alt="wine 로고"
              />
            </div>
            <h2 className="text-gray-100 [text-shadow:_0.4rem_0.4rem_1rem_rgba(136_136_136_/_0.2)] font-bold desktop:text-[3.2rem]/[4.6rem] tablet:text-[2.8rem]/[4.6rem] mobile:text-[2rem]/[3rem] text-center">
              한 곳에서 관리하는
              <br />
              나만의 와인창고
            </h2>
          </div>
          <CardList />
        </div>
      </section>
      <div className="flex-column desktop:mt-[16rem] tablet:mt-[8rem] mobile:mt-[4.8rem] tablet:gap-[9.6rem] mobile:gap-[4.8rem]">
        <section className="home-section-container shadow-current shadow-2md">
          <div className="tablet:mt-[5.6rem] tablet:ml-[3.2rem] mobile:mt-[2.4rem] mobile:ml-[2.4rem]">
            <h2 className="home-section-h2">
              매달 새롭게 만나는
              <br />
              와인 추천 콘텐츠
            </h2>
            <div className="home-section-sub">
              매달 다양한 인기 와인을 만나보세요.
            </div>
          </div>
          <div className="bg-gray-100 pl-[2rem] rounded-l-[1.6rem] tablet:mt-[4.2rem] mobile:mt-[5.9rem] tablet:ml-0 mobile:ml-[5.3rem] tablet:pb-0 mobile:pb-[2rem] flex mobile:flex-col tablet:justify-start mobile:justify-end mobile:items-start">
            <h3 className="font-bold tablet:text-[#50545B] tablet:py-[2rem] mobile:pt-[2rem] mobile:pb-[2.2rem] tablet:text-[1.8rem]/[2.1rem] mobile:text-[#7E7E7E] mobile:text-[1.6rem]/[1.9rem]">
              이번 달 추천 와인
            </h3>
            <SectionCard />
          </div>
        </section>
        <section className="home-section-container shadow-current shadow-2md">
          <div className="tablet:mt-[5.6rem] tablet:ml-[2.8rem] mobile:mt-[2.4rem] mobile:ml-[2.5rem]">
            <div>
              <h2 className="home-section-h2">
                다양한 필터로 찾는
                <br />내 맞춤 와인
              </h2>
              <div className="home-section-sub">
                와인 타입, 가격, 평점으로
                <br />
                나에게 맞는 와인을 쉽게 검색해보세요
              </div>
            </div>
            <div className="visible-tablet mt-[1.6rem]">
              <Image width={137} src={typesFilter} alt="와인 타입 필터" />
              <Image width={129} src={pricesFilter} alt="와인 가격 필터" />
            </div>
          </div>
          <div className="visible-tablet">
            <Image width={341} src={filterWine} alt="맞춤 와인 예시" />
          </div>
          <div className="visible-mobile flex justify-end">
            <Image width={280} src={mobileFilterWine} alt="맞춤 와인 예시" />
          </div>
        </section>
        <section className="home-section-container shadow-2md shadow-current">
          <div className="tablet:mt-[5.5rem] tablet:ml-[2.8rem] mobile:mt-[2.4rem] mobile:ml-[2.5rem]">
            <h2 className="home-section-h2">
              직관적인
              <br />
              리뷰 시스템
            </h2>
            <div className="home-section-sub">
              더 구체화된 리뷰 시스템으로
              <br />
              쉽고 빠르게 와인 리뷰를 살펴보세요.
            </div>
          </div>
          <div className="visible-tablet">
            <Image width={272} src={review} alt="와인 리뷰 예시" />
          </div>
          <div className="visible-mobile flex justify-end tablet:mt-0 mobile:mt-[0.2rem]">
            <Image width={272} src={mobileReview} alt="와인 리뷰 예시" />
          </div>
        </section>
        <Link href={"/wines"}>
          <Button
            type="button"
            size="large"
            color="primary"
            addClassName="flex-between py-[1.6rem] px-[9.6rem] mobile:rounded-[10rem] text-white text-lg font-bold text-center"
          >
            와인 보러가기
          </Button>
        </Link>
      </div>
    </div>
  );
}
