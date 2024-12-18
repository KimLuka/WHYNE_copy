import Image from "next/image";
import Button from "../common/Button";

export default function Profile() {
  return (
    <div className="w-[28rem] h-[53rem] top-[14.7rem] left-[39rem] p-[3.9rem_2rem] border-[0.1rem] border-solid bg-white border-[#cfdbea] rounded-[1.6rem]">
      <div className="flex justify-center flex-col items-center">
        <div className="w-[16.4rem] h-[16.4rem] flex items-center justify-center rounded-full">
          <Image
            src="/images/profile_white.svg"
            alt="프로필 사진"
            width={164}
            height={164}
          />
        </div>
        <div className="flex flex-col items-center justify-center mt-[3.2rem]">
          <p className="text-[2.4rem] font-bold text-[#2d3034] leading-[3.2rem]">
            민진
          </p>
          <p className="text-[1.6rem] text-[#9FACBD] mt-[1.6rem] font-regular leading-[2.6rem]">
            minjin@naver.com
          </p>
        </div>
      </div>
      <div className="w-[240] h-[134] mt-[4.8rem]">
        <div>
          <p className="text-[1.6rem] font-medium leading-[2.6rem]">닉네임</p>
          <input
            type="text"
            placeholder="민진"
            className="w-[24rem] h-[4.8rem] p-[1.4rem_2rem] mt-[1rem] border-[0.1rem] bg-white border-[#cfdbea] rounded-[1.6rem] text-[1.6rem] font-regular"
          ></input>
        </div>

        <Button
          type="button"
          size="small"
          color="primary"
          addClassName="w-[9.6rem] h-[4.2rem] m-[0.8rem_0_0_14.4rem] rounded-[1.2rem] bg-[#6A42DB]"
        >
          <p className="p-[0.8rem_2rem] text-white text-[16px] font-bold leading-[2.6rem]">
            변경하기
          </p>
        </Button>
      </div>
    </div>
  );
}
