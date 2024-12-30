import Image from "next/image";
import firstWine from "../../../public/images/middle_first_card.svg";
import secondWine from "../../../public/images/middle_second_card.svg";

export default function SectionCard() {
  return (
    <div className="flex-between gap-[1rem]">
      <div className="opacity-0 animate-fadeSlideUp delay-200 card-container shadow-md shadow-current w-[19.3rem] h-[16rem] pt-[2.4rem] px-[2.5rem] ">
        <Image width={143} src={firstWine} alt="추천 와인 예시" />
      </div>
      <div className="opacity-0 animate-fadeSlideUp delay-400 card-container shadow-current shadow-md w-[19.3rem] h-[16rem] pt-[2.4rem] px-[2.5rem]">
        <Image width={143} src={secondWine} alt="추천 와인 예시" />
      </div>
    </div>
  );
}
