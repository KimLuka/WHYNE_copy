import Image from "next/image";
import PalceholderWine from "@/../public/images/placeholder1.png";
import DropDownMenu from "../common/dropDownMenu";

export default function MyWineCard() {
  return (
    <div className="w-[80rem] h-[27rem] flex">
      <div className="mt-[4rem]">
        <div className="relative w-[80rem] h-[22.8rem] border-solid border-[0.1rem] bg-white rounded-[1.6rem] border-gray-300 p-[2.4rem_4rem] flex">
          <Image
            src={PalceholderWine}
            alt="와인사진"
            width={76}
            height={270}
            className="absolute top-[-4.2rem]"
          />
          <div className="w-[72rem] flex justify-between ">
            <div className="ml-[11.6rem]">
              <div className="mb-[2rem]">
                <p className="break-words max-w-[30rem] text-[3rem] font-semibold leading-[3.58rem] text-gray-800 mb-[2rem]">
                  Sentinel Carbernet Sauvignon 2016
                </p>
                <p className="text-[1.6rem] font-regular leading-[2.6rem] text-gray-500">
                  Western Cape, South Africa
                </p>
              </div>
              <p className="bg-[#F1EDFC] w-[11.4rem] h-[3.7rem] p-[0.55rem_1.5rem] rounded-[1.2rem] gap-[1rem] text-[1.8rem] text-primary font-bold leading-[2.6rem]">
                ₩ 64,990
              </p>
            </div>
            <DropDownMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
