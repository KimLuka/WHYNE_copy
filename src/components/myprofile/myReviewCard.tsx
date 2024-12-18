import Image from "next/image";
import DropDownMenu from "../common/dropDownMenu";
import StarFill from "../../../public/icons/star_fill.svg";
// import StarEmpty from "../../../public/icons/star.svg";

export default function MyReviewCard() {
  return (
    <div className="w-[80rem] h-[20.2rem] border-solid border-[0.1rem] bg-white rounded-[1.6rem] border-gray-300 p-[2.4rem_4rem]">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-[1.5rem] w-[8rem] h-[4.2rem] rounded-[1.2rem] p-[0.8rem_1.5rem] bg-[#f1edfc] flex items-center">
            <Image src={StarFill} alt="별점" width={20} height={20} />
            <p className="text-primary font-bold text-[1.8rem]">5.0</p>
          </div>
          <p className="text-gray-300 text-[1.6rem] font-regular">7시간 전</p>
        </div>
        <DropDownMenu />
      </div>
      <div className="mt-[2rem]">
        <div className="leading-[2.6rem] text-[1.6rem] font-medium text-gray-500">
          this Wine good
        </div>
        <div className="text-[1.6rem] font-regular text-gray-800 mt-[1rem] leading-[2.6rem]">
          wow daebak masisseo
        </div>
      </div>
    </div>
  );
}
