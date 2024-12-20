"use client";

import Image from "next/image";
import Button from "../common/Button";
import DefaultProfile from "@/../public/images/profile_white.svg";
import CameraIcon from "@/../public/icons/photo.svg";
import { useState } from "react";

const initialUser = {
  email: "minjin12345@naver.com",
  nickname: "푸른별빛의마지막",
  image:
    "https://i.pinimg.com/736x/9e/38/af/9e38af2e5d9fd2615d08eeda59487a76.jpg",
};

export default function Profile() {
  const [user, setUser] = useState(initialUser);
  const [newNickname, setNewNickname] = useState("");

  // 닉네임 변경
  function handleNicknameChange() {
    if (newNickname.trim()) {
      setUser((prev) => ({ ...prev, nickname: newNickname }));
      setNewNickname("");
    }
  }

  // 프로필 이미지 변경
  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, image: imageUrl }));
    }
  }

  return (
    <div className="w-[28rem] min-h-[53rem] top-[14.7rem] left-[39rem] p-[3.9rem_2rem] border-[0.1rem] border-solid bg-white border-[#cfdbea] rounded-[1.6rem]">
      <div className="flex justify-center flex-col items-center">
        <div
          onClick={() => document.getElementById("profileImage")?.click()}
          className="relative group flex items-center justify-center rounded-full cursor-pointer"
        >
          <Image
            src={user.image || DefaultProfile}
            alt="프로필 사진"
            width={164}
            height={164}
            className="w-[16.4rem] h-[16.4rem] rounded-full"
          />
          <div className="absolute rounded-full inset-0 bg-primary opacity-0 group-hover:opacity-80 transition-opacity"></div>
          <div className="absolute opacity-0 group-hover:opacity-100">
            <Image
              src={CameraIcon}
              alt="카메라 아이콘"
              width={40}
              height={40}
              className="text-white"
            />
          </div>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="flex flex-col items-center justify-center mt-[3.2rem]">
          <p className="text-[2.4rem] font-bold text-[#2d3034] leading-[3.2rem] text-center">
            {user.nickname}
          </p>
          <p className="text-[1.6rem] text-[#9FACBD] mt-[1.6rem] font-regular leading-[2.6rem]">
            {user.email}
          </p>
        </div>
      </div>
      <div className="w-[240] h-[134] mt-[4.8rem]">
        <div>
          <p className="text-[1.6rem] font-medium leading-[2.6rem]">닉네임</p>
          <input
            type="text"
            placeholder={user.nickname}
            className="w-[24rem] h-[4.8rem] p-[1.4rem_2rem] mt-[1rem] border-[0.1rem] bg-white border-[#cfdbea] rounded-[1.6rem] text-[1.6rem] font-regular focus:outline-none focus:border-primary"
            value={newNickname}
            onChange={(event) => {
              if (event.target.value.length <= 20) {
                setNewNickname(event.target.value);
              }
            }}
          ></input>
        </div>

        <Button
          type="button"
          size="small"
          color="primary"
          addClassName="w-[9.6rem] h-[4.2rem] m-[0.8rem_0_0_14.4rem] rounded-[1.2rem] bg-[#6A42DB]"
          onClick={handleNicknameChange}
        >
          <p className="p-[0.8rem_2rem] text-white text-[16px] font-bold leading-[2.6rem]">
            변경하기
          </p>
        </Button>
      </div>
    </div>
  );
}
