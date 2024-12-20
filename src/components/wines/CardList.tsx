import Image from "next/image";
import Link from "next/link";
import sample from "../../../public/images/sample_wine.svg";
import star from "../../../public/icons/star.svg";
import arrow from "../../../public/icons/right.svg";

export default function CardList() {
  return (
    <div className="grid grid-row-4">
      <div className="tablet:mt-[6.2rem] mobile:mt-[3rem] h-auto max-w-[80rem] border-solid border-[0.1rem] border-gray-300 rounded-[1.6rem] shadow-md">
        <div className="flex desktop:gap-[8rem] tablet:gap-[4.7rem] mobile:gap-[3.6rem] border-b-[0.1rem] border-gray-300 border-solid desktop:pt-[4rem] desktop:pl-[6rem] tablet:pt-[4rem] tablet:pl-[4rem] mobile:pt-[3rem] mobile:pl-[2rem] desktop:pr-[5rem] tablet:pr-[4rem] mobile:pr-[3rem]">
          <Image width={60} src={sample} alt="와인 목록" /*image*/ />
          <div className="flex justify-between w-auto tablet:flex-row mobile:flex-col tablet:gap-[9.1rem]">
            <div className="tablet:w-[30rem] mobile:w-[18.7rem] flex flex-col tablet:gap-[1.8rem] mobile:gap-[0.8rem]">
              <h2
                /*name */ className="font-semiBold text-gray-800 desktop:text-3xl tablet:text-[3rem]/[3.6rem] mobile:text-xl"
              >
                Sentinel Carbernet Sauvignon 2016
              </h2>
              <p
                /*region*/ className="font-regular text-gray-500 tablet:text-lg mobile:text-md"
              >
                Western Cape, South Africa
              </p>
              <div className="flex justify-between">
                <span
                  /*price*/ className="bg-secondary text-primary font-bold flex justify-center items-center w-auto tablet:h-[auto] mobile:h-[2.9rem] tablet:py-[0.8rem] tablet:px-[1.5rem] tablet:text-2lg tablet:rounded-[1.2rem] mobile:rounded-[1rem] mobile:py-[0.6rem] mobile: px-[1rem] mobile:text-md"
                >
                  ₩ 64,990
                </span>
              </div>
            </div>
            <div className="tablet:w-[11.2rem] tablet:h-[12.1rem] flex tablet:flex-col tablet:gap-[1rem] mobile:gap-[3.6rem] tablet:mt-0 mobile:mt-[2.2rem] tablet:mb-0 mobile:mb-[2.8rem] tablet:items-start mobile:items-center">
              <div className="flex tablet:flex-col tablet:gap-[1rem] mobile:justify-between mobile:gap-[1.5rem] tablet:items-start mobile:items-center">
                <h3
                  /*avgRating*/ className="font-extrabold text-gray-800 tablet:text-[4.8rem]/[5.7rem] mobile:text-[2.8rem]/[3.3rem]"
                >
                  4.8
                </h3>
                <div className="flex flex-col tablet:gap-[1rem]">
                  <div>
                    <button>
                      <Image width={16} src={star} alt="별 1개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 2개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 3개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 4개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 5개" />
                    </button>
                  </div>
                  <p
                    /*reviewCount*/ className="font-regular text-gray-500 tablet:text-md mobile:text-xs-tight"
                  >
                    47개의 후기
                  </p>
                </div>
              </div>
              <Link href="/wines">
                <Image width={23} src={arrow} alt="상세 페이지로 이동하기" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col desktop:w-[68rem] tablet:w-[62.4rem] mobile:w-[30.3rem] tablet:gap-[1rem] mobile:gap-[0.8rem]tablet:py-[2rem] desktop:px-[6rem] tablet:px-[4rem] mobile:py-[0.7rem] mobile:px-[2rem]">
          <h3 className="font-semiBold text-gray-800 tablet:text-lg mobile:text-md">
            최신 후기
          </h3>
          <p
            /*recentReview*/ className="font-regular text-gray-500 tablet:text-lg mobile:text-md"
          >
            Cherry, cocoa, vanilla and clove - beautiful red fruit driven
            Amarone. Low acidity and medium tannins. Nice long velvety finish.
          </p>
        </div>
      </div>
      <div
        className="tablet:mt-[6.2rem] mobile:mt-[3rem] w-full h-auto max-w-[80rem] border-solid border-[0.1rem] border-gray-300 rounded-[1.6rem]" /* 큰통 */
      >
        <div className="flex desktop:gap-[8rem] tablet:gap-[4.7rem] mobile:gap-[3.6rem] border-b-[0.1rem] border-gray-300 border-solid desktop:pt-[4rem] desktop:pl-[6rem] tablet:pt-[4rem] tablet:pl-[4rem] mobile:pt-[3rem] mobile:pl-[2rem] desktop:pr-[5rem] tablet:pr-[4rem] mobile:pr-[3rem]">
          <Image width={60} src={sample} alt="와인 목록" /*image*/ />
          <div className="flex justify-between w-auto tablet:flex-row mobile:flex-col tablet:gap-[9.1rem]">
            <div className="tablet:w-[30rem] mobile:w-[18.7rem] flex flex-col tablet:gap-[1.8rem] mobile:gap-[0.8rem]">
              <h2
                /*name */ className="font-semiBold text-gray-800 desktop:text-3xl tablet:text-[3rem]/[3.6rem] mobile:text-xl"
              >
                Sentinel Carbernet Sauvignon 2016
              </h2>
              <p
                /*region*/ className="font-regular text-gray-500 tablet:text-lg mobile:text-md"
              >
                Western Cape, South Africa
              </p>
              <div className="flex justify-between">
                <span
                  /*price*/ className="bg-secondary text-primary font-bold flex justify-center items-center w-auto tablet:h-[auto] mobile:h-[2.9rem] tablet:py-[0.8rem] tablet:px-[1.5rem] tablet:text-2lg tablet:rounded-[1.2rem] mobile:rounded-[1rem] mobile:py-[0.6rem] mobile: px-[1rem] mobile:text-md"
                >
                  ₩ 64,990
                </span>
              </div>
            </div>
            <div className="tablet:w-[11.2rem] tablet:h-[12.1rem] flex tablet:flex-col tablet:gap-[1rem] mobile:gap-[3.6rem] tablet:mt-0 mobile:mt-[2.2rem] tablet:mb-0 mobile:mb-[2.8rem] tablet:items-start mobile:items-center">
              <div className="flex tablet:flex-col tablet:gap-[1rem] mobile:justify-between mobile:gap-[1.5rem] tablet:items-start mobile:items-center">
                <h3
                  /*avgRating*/ className="font-extrabold text-gray-800 tablet:text-[4.8rem]/[5.7rem] mobile:text-[2.8rem]/[3.3rem]"
                >
                  4.8
                </h3>
                <div className="flex flex-col tablet:gap-[1rem]">
                  <div>
                    <button>
                      <Image width={16} src={star} alt="별 1개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 2개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 3개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 4개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 5개" />
                    </button>
                  </div>
                  <p
                    /*reviewCount*/ className="font-regular text-gray-500 tablet:text-md mobile:text-xs-tight"
                  >
                    47개의 후기
                  </p>
                </div>
              </div>
              <Link href="/wines">
                <Image width={23} src={arrow} alt="상세 페이지로 이동하기" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col desktop:w-[68rem] tablet:w-[62.4rem] mobile:w-[30.3rem] tablet:gap-[1rem] mobile:gap-[0.8rem]tablet:py-[2rem] desktop:px-[6rem] tablet:px-[4rem] mobile:py-[0.7rem] mobile:px-[2rem]">
          <h3 className="font-semiBold text-gray-800 tablet:text-lg mobile:text-md">
            최신 후기
          </h3>
          <p
            /*recentReview*/ className="font-regular text-gray-500 tablet:text-lg mobile:text-md"
          >
            Cherry, cocoa, vanilla and clove - beautiful red fruit driven
            Amarone. Low acidity and medium tannins. Nice long velvety finish.
          </p>
        </div>
      </div>
      <div
        className="tablet:mt-[6.2rem] mobile:mt-[3rem] w-full h-auto max-w-[80rem] border-solid border-[0.1rem] border-gray-300 rounded-[1.6rem]" /* 큰통 */
      >
        <div className="flex desktop:gap-[8rem] tablet:gap-[4.7rem] mobile:gap-[3.6rem] border-b-[0.1rem] border-gray-300 border-solid desktop:pt-[4rem] desktop:pl-[6rem] tablet:pt-[4rem] tablet:pl-[4rem] mobile:pt-[3rem] mobile:pl-[2rem] desktop:pr-[5rem] tablet:pr-[4rem] mobile:pr-[3rem]">
          <Image width={60} src={sample} alt="와인 목록" /*image*/ />
          <div className="flex justify-between w-auto tablet:flex-row mobile:flex-col tablet:gap-[9.1rem]">
            <div className="tablet:w-[30rem] mobile:w-[18.7rem] flex flex-col tablet:gap-[1.8rem] mobile:gap-[0.8rem]">
              <h2
                /*name */ className="font-semiBold text-gray-800 desktop:text-3xl tablet:text-[3rem]/[3.6rem] mobile:text-xl"
              >
                Sentinel Carbernet Sauvignon 2016
              </h2>
              <p
                /*region*/ className="font-regular text-gray-500 tablet:text-lg mobile:text-md"
              >
                Western Cape, South Africa
              </p>
              <div className="flex justify-between">
                <span
                  /*price*/ className="bg-secondary text-primary font-bold flex justify-center items-center w-auto tablet:h-[auto] mobile:h-[2.9rem] tablet:py-[0.8rem] tablet:px-[1.5rem] tablet:text-2lg tablet:rounded-[1.2rem] mobile:rounded-[1rem] mobile:py-[0.6rem] mobile: px-[1rem] mobile:text-md"
                >
                  ₩ 64,990
                </span>
              </div>
            </div>
            <div className="tablet:w-[11.2rem] tablet:h-[12.1rem] flex tablet:flex-col tablet:gap-[1rem] mobile:gap-[3.6rem] tablet:mt-0 mobile:mt-[2.2rem] tablet:mb-0 mobile:mb-[2.8rem] tablet:items-start mobile:items-center">
              <div className="flex tablet:flex-col tablet:gap-[1rem] mobile:justify-between mobile:gap-[1.5rem] tablet:items-start mobile:items-center">
                <h3
                  /*avgRating*/ className="font-extrabold text-gray-800 tablet:text-[4.8rem]/[5.7rem] mobile:text-[2.8rem]/[3.3rem]"
                >
                  4.8
                </h3>
                <div className="flex flex-col tablet:gap-[1rem]">
                  <div>
                    <button>
                      <Image width={16} src={star} alt="별 1개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 2개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 3개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 4개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 5개" />
                    </button>
                  </div>
                  <p
                    /*reviewCount*/ className="font-regular text-gray-500 tablet:text-md mobile:text-xs-tight"
                  >
                    47개의 후기
                  </p>
                </div>
              </div>
              <Link href="/wines">
                <Image width={23} src={arrow} alt="상세 페이지로 이동하기" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col desktop:w-[68rem] tablet:w-[62.4rem] mobile:w-[30.3rem] tablet:gap-[1rem] mobile:gap-[0.8rem]tablet:py-[2rem] desktop:px-[6rem] tablet:px-[4rem] mobile:py-[0.7rem] mobile:px-[2rem]">
          <h3 className="font-semiBold text-gray-800 tablet:text-lg mobile:text-md">
            최신 후기
          </h3>
          <p
            /*recentReview*/ className="font-regular text-gray-500 tablet:text-lg mobile:text-md"
          >
            Cherry, cocoa, vanilla and clove - beautiful red fruit driven
            Amarone. Low acidity and medium tannins. Nice long velvety finish.
          </p>
        </div>
      </div>
      <div
        className="tablet:mt-[6.2rem] mobile:mt-[3rem] w-full h-auto max-w-[80rem] border-solid border-[0.1rem] border-gray-300 rounded-[1.6rem]" /* 큰통 */
      >
        <div className="flex desktop:gap-[8rem] tablet:gap-[4.7rem] mobile:gap-[3.6rem] border-b-[0.1rem] border-gray-300 border-solid desktop:pt-[4rem] desktop:pl-[6rem] tablet:pt-[4rem] tablet:pl-[4rem] mobile:pt-[3rem] mobile:pl-[2rem] desktop:pr-[5rem] tablet:pr-[4rem] mobile:pr-[3rem]">
          <Image width={60} src={sample} alt="와인 목록" /*image*/ />
          <div className="flex justify-between w-auto tablet:flex-row mobile:flex-col tablet:gap-[9.1rem]">
            <div className="tablet:w-[30rem] mobile:w-[18.7rem] flex flex-col tablet:gap-[1.8rem] mobile:gap-[0.8rem]">
              <h2
                /*name */ className="font-semiBold text-gray-800 desktop:text-3xl tablet:text-[3rem]/[3.6rem] mobile:text-xl"
              >
                Sentinel Carbernet Sauvignon 2016
              </h2>
              <p
                /*region*/ className="font-regular text-gray-500 tablet:text-lg mobile:text-md"
              >
                Western Cape, South Africa
              </p>
              <div className="flex justify-between">
                <span
                  /*price*/ className="bg-secondary text-primary font-bold flex justify-center items-center w-auto tablet:h-[auto] mobile:h-[2.9rem] tablet:py-[0.8rem] tablet:px-[1.5rem] tablet:text-2lg tablet:rounded-[1.2rem] mobile:rounded-[1rem] mobile:py-[0.6rem] mobile: px-[1rem] mobile:text-md"
                >
                  ₩ 64,990
                </span>
              </div>
            </div>
            <div className="tablet:w-[11.2rem] tablet:h-[12.1rem] flex tablet:flex-col tablet:gap-[1rem] mobile:gap-[3.6rem] tablet:mt-0 mobile:mt-[2.2rem] tablet:mb-0 mobile:mb-[2.8rem] tablet:items-start mobile:items-center">
              <div className="flex tablet:flex-col tablet:gap-[1rem] mobile:justify-between mobile:gap-[1.5rem] tablet:items-start mobile:items-center">
                <h3
                  /*avgRating*/ className="font-extrabold text-gray-800 tablet:text-[4.8rem]/[5.7rem] mobile:text-[2.8rem]/[3.3rem]"
                >
                  4.8
                </h3>
                <div className="flex flex-col tablet:gap-[1rem]">
                  <div>
                    <button>
                      <Image width={16} src={star} alt="별 1개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 2개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 3개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 4개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 5개" />
                    </button>
                  </div>
                  <p
                    /*reviewCount*/ className="font-regular text-gray-500 tablet:text-md mobile:text-xs-tight"
                  >
                    47개의 후기
                  </p>
                </div>
              </div>
              <Link href="/wines">
                <Image width={23} src={arrow} alt="상세 페이지로 이동하기" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col desktop:w-[68rem] tablet:w-[62.4rem] mobile:w-[30.3rem] tablet:gap-[1rem] mobile:gap-[0.8rem]tablet:py-[2rem] desktop:px-[6rem] tablet:px-[4rem] mobile:py-[0.7rem] mobile:px-[2rem]">
          <h3 className="font-semiBold text-gray-800 tablet:text-lg mobile:text-md">
            최신 후기
          </h3>
          <p
            /*recentReview*/ className="font-regular text-gray-500 tablet:text-lg mobile:text-md"
          >
            Cherry, cocoa, vanilla and clove - beautiful red fruit driven
            Amarone. Low acidity and medium tannins. Nice long velvety finish.
          </p>
        </div>
      </div>
      <div
        className="tablet:mt-[6.2rem] mobile:mt-[3rem] w-full h-auto max-w-[80rem] border-solid border-[0.1rem] border-gray-300 rounded-[1.6rem]" /* 큰통 */
      >
        <div className="flex desktop:gap-[8rem] tablet:gap-[4.7rem] mobile:gap-[3.6rem] border-b-[0.1rem] border-gray-300 border-solid desktop:pt-[4rem] desktop:pl-[6rem] tablet:pt-[4rem] tablet:pl-[4rem] mobile:pt-[3rem] mobile:pl-[2rem] desktop:pr-[5rem] tablet:pr-[4rem] mobile:pr-[3rem]">
          <Image width={60} src={sample} alt="와인 목록" /*image*/ />
          <div className="flex justify-between w-auto tablet:flex-row mobile:flex-col tablet:gap-[9.1rem]">
            <div className="tablet:w-[30rem] mobile:w-[18.7rem] flex flex-col tablet:gap-[1.8rem] mobile:gap-[0.8rem]">
              <h2
                /*name */ className="font-semiBold text-gray-800 desktop:text-3xl tablet:text-[3rem]/[3.6rem] mobile:text-xl"
              >
                Sentinel Carbernet Sauvignon 2016
              </h2>
              <p
                /*region*/ className="font-regular text-gray-500 tablet:text-lg mobile:text-md"
              >
                Western Cape, South Africa
              </p>
              <div className="flex justify-between">
                <span
                  /*price*/ className="bg-secondary text-primary font-bold flex justify-center items-center w-auto tablet:h-[auto] mobile:h-[2.9rem] tablet:py-[0.8rem] tablet:px-[1.5rem] tablet:text-2lg tablet:rounded-[1.2rem] mobile:rounded-[1rem] mobile:py-[0.6rem] mobile: px-[1rem] mobile:text-md"
                >
                  ₩ 64,990
                </span>
              </div>
            </div>
            <div className="tablet:w-[11.2rem] tablet:h-[12.1rem] flex tablet:flex-col tablet:gap-[1rem] mobile:gap-[3.6rem] tablet:mt-0 mobile:mt-[2.2rem] tablet:mb-0 mobile:mb-[2.8rem] tablet:items-start mobile:items-center">
              <div className="flex tablet:flex-col tablet:gap-[1rem] mobile:justify-between mobile:gap-[1.5rem] tablet:items-start mobile:items-center">
                <h3
                  /*avgRating*/ className="font-extrabold text-gray-800 tablet:text-[4.8rem]/[5.7rem] mobile:text-[2.8rem]/[3.3rem]"
                >
                  4.8
                </h3>
                <div className="flex flex-col tablet:gap-[1rem]">
                  <div>
                    <button>
                      <Image width={16} src={star} alt="별 1개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 2개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 3개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 4개" />
                    </button>
                    <button>
                      <Image width={16} src={star} alt="별 5개" />
                    </button>
                  </div>
                  <p
                    /*reviewCount*/ className="font-regular text-gray-500 tablet:text-md mobile:text-xs-tight"
                  >
                    47개의 후기
                  </p>
                </div>
              </div>
              <Link href="/wines">
                <Image width={23} src={arrow} alt="상세 페이지로 이동하기" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col desktop:w-[68rem] tablet:w-[62.4rem] mobile:w-[30.3rem] tablet:gap-[1rem] mobile:gap-[0.8rem]tablet:py-[2rem] desktop:px-[6rem] tablet:px-[4rem] mobile:py-[0.7rem] mobile:px-[2rem]">
          <h3 className="font-semiBold text-gray-800 tablet:text-lg mobile:text-md">
            최신 후기
          </h3>
          <p
            /*recentReview*/ className="font-regular text-gray-500 tablet:text-lg mobile:text-md"
          >
            Cherry, cocoa, vanilla and clove - beautiful red fruit driven
            Amarone. Low acidity and medium tannins. Nice long velvety finish.
          </p>
        </div>
      </div>
    </div>
  );
}
