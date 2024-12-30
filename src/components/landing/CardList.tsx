import Image from "next/image";
import firstWine from "../../../public/images/first_card_top.svg";
import secondWine from "../../../public/images/second_card_top.svg";
import thirdWine from "../../../public/images/third_card_top.svg";
import fourthWine from "../../../public/images/fourth_card_top.svg";
import fifthWine from "../../../public/images/fifth_card_top.svg";

export default function CardList() {
  return (
    <div className="flex overflow-hidden justify-center">
      <div className="opacity-0 animate-fadeSlideUp delay-[100ms] card-container shadow-mdr shadow-current card-top mt-[10rem]">
        <Image width={172} alt="와인 창고 예시" src={firstWine} />
      </div>
      <div className="opacity-0 animate-fadeSlideUp delay-[300ms] card-container shadow-mdr shadow-current card-top mt-[8rem]">
        <Image width={172} alt="와인 창고 예시" src={secondWine} />
      </div>
      <div className="opacity-0 animate-fadeSlideUp delay-[500ms] card-container shadow-md shadow-current card-top my-[5rem]">
        <Image width={172} alt="와인 창고 예시" src={thirdWine} />
      </div>
      <div className="opacity-0 animate-fadeSlideUp delay-[700ms] card-container shadow-mdl shadow-current card-top mt-[8rem]">
        <Image width={172} alt="와인 창고 예시" src={fourthWine} />
      </div>
      <div className="opacity-0 animate-fadeSlideUp delay-[900ms] card-container shadow-mdl shadow-current card-top mt-[10rem]">
        <Image width={172} alt="와인 창고 예시" src={fifthWine} />
      </div>
    </div>
  );
}
