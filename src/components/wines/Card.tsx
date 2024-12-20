import Image from "next/image";
import sample from "../../../public/images/sample_wine.svg";
import star from "../../../public/icons/star.svg";

export default function Card() {
  return (
    <div className="grid grid-cols-4 tablet:gap-[1.5rem] mobile:gap-[1rem] overflow-hidden">
      <div className="card-container flex justify-center items-end shadow-mdr tablet:mt-[3rem] mobile:mt-[2rem] tablet:w-[23.2rem] tablet:h-[18.5rem] mobile:w-[19.3rem] mobile:h-[16rem]">
        <div className="flex tablet:gap-[2.8rem] mobile:gap-[2.5rem] tablet:w-[17.2rem] tablet:h-[16.1rem] mobile:w-[14.3rem]">
          <Image
            width={40}
            src={sample}
            alt="추천와인"
            objectFit="contain"
            /*image */
          />
          <div className="flex flex-col gap-[0.5rem] tablet:w-[10rem] mobile:w-fill">
            <span
              className="font-extrabold tablet:w-[10rem] mobile:w-fill text-gray-800 tablet:text-[3.6rem]/[4.3rem] mobile:text-[2.8rem]/[3.3rem]" /* avgRating */
            >
              4.8
            </span>
            <Image
              /*별점 보여주기*/ width={12}
              src={star}
              alt="별점"
              objectFit="contain"
            />
            <h3
              /*name*/ className="font-regular text-gray-500 tablet:text-xs-tight mobile:text-[1rem]/[1.4rem]"
            >
              Sentinel Carbernet Sauvignon 2016
            </h3>
          </div>
        </div>
      </div>
      <div className="card-container flex justify-center items-end shadow-mdr tablet:mt-[3rem] mobile:mt-[2rem] tablet:w-[23.2rem] tablet:h-[18.5rem] mobile:w-[19.3rem] mobile:h-[16rem]">
        <div className="flex tablet:gap-[2.8rem] mobile:gap-[2.5rem] tablet:w-[17.2rem] tablet:h-[16.1rem] mobile:w-[14.3rem] mobile:h-[]">
          <Image
            width={40}
            src={sample}
            alt="추천와인"
            objectFit="contain"
            /*image */
          />
          <div className="flex flex-col gap-[0.5rem] tablet:w-[10rem] mobile:w-fill">
            <span
              className="font-extrabold tablet:w-[10rem] mobile:w-fill text-gray-800 tablet:text-[3.6rem]/[4.3rem] mobile:text-[2.8rem]/[3.3rem]" /* avgRating */
            >
              4.8
            </span>
            <Image
              /*별점 보여주기*/ width={12}
              src={star}
              alt="별점"
              objectFit="contain"
            />
            <h3
              /*name*/ className="font-regular text-gray-500 tablet:text-xs-tight mobile:text-[1rem]/[1.4rem]"
            >
              Sentinel Carbernet Sauvignon 2016
            </h3>
          </div>
        </div>
      </div>
      <div className="card-container flex justify-center items-end shadow-mdr tablet:mt-[3rem] mobile:mt-[2rem] tablet:w-[23.2rem] tablet:h-[18.5rem] mobile:w-[19.3rem] mobile:h-[16rem]">
        <div className="flex tablet:gap-[2.8rem] mobile:gap-[2.5rem] tablet:w-[17.2rem] tablet:h-[16.1rem] mobile:w-[14.3rem] mobile:h-[]">
          <Image
            width={40}
            src={sample}
            alt="추천와인"
            objectFit="contain"
            /*image */
          />
          <div className="flex flex-col gap-[0.5rem] tablet:w-[10rem] mobile:w-fill">
            <span
              className="font-extrabold tablet:w-[10rem] mobile:w-fill text-gray-800 tablet:text-[3.6rem]/[4.3rem] mobile:text-[2.8rem]/[3.3rem]" /* avgRating */
            >
              4.8
            </span>
            <Image
              /*별점 보여주기*/ width={12}
              src={star}
              alt="별점"
              objectFit="contain"
            />
            <h3
              /*name*/ className="font-regular text-gray-500 tablet:text-xs-tight mobile:text-[1rem]/[1.4rem]"
            >
              Sentinel Carbernet Sauvignon 2016
            </h3>
          </div>
        </div>
      </div>
      <div className="card-container flex justify-center items-end shadow-mdr tablet:mt-[3rem] mobile:mt-[2rem] tablet:w-[23.2rem] tablet:h-[18.5rem] mobile:w-[19.3rem] mobile:h-[16rem]">
        <div className="flex tablet:gap-[2.8rem] mobile:gap-[2.5rem] tablet:w-[17.2rem] tablet:h-[16.1rem] mobile:w-[14.3rem] mobile:h-[]">
          <Image
            width={40}
            src={sample}
            alt="추천와인"
            objectFit="contain"
            /*image */
          />
          <div className="flex flex-col gap-[0.5rem] tablet:w-[10rem] mobile:w-fill">
            <span
              className="font-extrabold tablet:w-[10rem] mobile:w-fill text-gray-800 tablet:text-[3.6rem]/[4.3rem] mobile:text-[2.8rem]/[3.3rem]" /* avgRating */
            >
              4.8
            </span>
            <Image
              /*별점 보여주기*/ width={12}
              src={star}
              alt="별점"
              objectFit="contain"
            />
            <h3
              /*name*/ className="font-regular text-gray-500 tablet:text-xs-tight mobile:text-[1rem]/[1.4rem]"
            >
              Sentinel Carbernet Sauvignon 2016
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
