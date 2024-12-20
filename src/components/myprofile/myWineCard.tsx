import Image from "next/image";
import DropDownMenu from "../common/DropDownMenu";

interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: string;
}

export default function MyWineCard({ wine }: { wine: Wine }) {
  return (
    <div className="w-[80rem] min-h-[27rem] flex">
      <div className="mt-[4rem]">
        <div className="relative w-[80rem] h-[22.8rem] border-solid border-[0.1rem] bg-white rounded-[1.6rem] border-gray-300 pl-[4rem] flex items-end">
          <div className="relative w-[7.6rem] h-[27rem] overflow-hidden">
            <Image
              src={wine.image}
              alt="와인사진"
              layout="fill"
              objectFit="cover"
              objectPosition="bottom"
              className="absolute"
            />
          </div>
          <div className="w-[72rem] flex justify-between ">
            <div className="m-[3rem_0_3rem_4rem]">
              <div className="mb-[2rem]">
                <p className="break-words max-w-[30rem] text-[3rem] font-semibold leading-[3.58rem] text-gray-800 mb-[2rem]">
                  {wine.name}
                </p>
                <p className="text-[1.6rem] font-regular leading-[2.6rem] text-gray-500">
                  {wine.region}
                </p>
              </div>
              <p className="bg-[#F1EDFC] min-w-[11.4rem] h-[3.7rem] p-[0.55rem_1.5rem] rounded-[1.2rem] gap-[1rem] text-[1.8rem] text-primary font-bold leading-[2.6rem] inline-block">
                ₩ {wine.price}
              </p>
            </div>
            <div className="m-[3rem_4rem]">
              <DropDownMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
