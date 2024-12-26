"use client";

import Image from "next/image";
import Button from "../common/Button";
import DefaultProfile from "@/../public/images/profile_white.svg";
import CameraIcon from "@/../public/icons/photo_white.svg";
import { useEffect, useState } from "react";
import instance from "@/api/api";

interface UserProfile {
  email: string;
  nickname: string;
  image: string;
}

export default function Profile() {
  const [user, setUser] = useState({
    email: "",
    nickname: "",
    image: "",
  });
  const [newNickname, setNewNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchProfile() {
    try {
      setIsLoading(true);
      const response = await instance.get<UserProfile>("/users/me");
      setUser((prev) => ({
        ...prev,
        ...response.data,
      }));
      console.log(response.data);
    } catch (error) {
      console.error("프로필 가져오기 실패", error);
    } finally {
      setIsLoading(false);
    }
  }

  // 닉네임 변경
  async function updateNickname() {
    if (!newNickname.trim()) return;
    try {
      setIsLoading(true);
      const response = await instance.patch<UserProfile>("/users/me", {
        nickname: newNickname,
      });
      setUser((prev) => ({ ...prev, nickname: response.data.nickname }));
      setNewNickname("");
    } catch (error) {
      console.error("닉네임 변경 오류", error);
    } finally {
      setIsLoading(false);
    }
  }

  // 이미지 가져오기
  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsLoading(true);
      const response = await instance.post<{ url: string }>(
        "/images/upload",
        formData,
        {
          headers: {
            "content-Type": "multipart/form-data",
          },
        },
      );
      return response.data.url;
    } catch (error) {
      console.error("이미지 업로드 실패", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  // 프로필 이미지 변경
  async function updateImage(file: File) {
    const imageUrl = await uploadImage(file);
    if (!imageUrl) return;

    try {
      setIsLoading(true);
      const response = await instance.patch("/users/me", { image: imageUrl });
      setUser((prev) => ({ ...prev, image: response.data.image }));
    } catch (error) {
      console.error("프로필 사진 변경 오류", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      updateImage(file);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div
      className="
    desktop:w-[28rem] desktop:min-h-[53rem] desktop:left-[39rem] desktop:p-[3.9rem_2rem] 
    tablet:w-full tablet:min-h-[24.7rem] tablet:top-[11.7rem] tablet:p-[2.3rem_4rem] 
    mobile:w-full mobile:min-h-[24.1rem] mobile:p-[2rem] 
    border-[0.1rem] border-solid bg-white border-[#cfdbea] rounded-[1.6rem]
    "
    >
      {isLoading && <div></div>}

      <div className="flex desktop:justify-center desktop:flex-col desktop:items-center tablet:flex-row tablet:justify-start">
        <div
          onClick={() => document.getElementById("profileImage")?.click()}
          className="relative group flex items-center justify-center rounded-full cursor-pointer"
        >
          <Image
            src={user.image || DefaultProfile}
            alt="프로필 사진"
            width={164}
            height={164}
            className="desktop:w-[16.4rem] desktop:h-[16.4rem] rounded-full tablet:w-[8rem] tablet:h-[8rem] mobile:w-[6rem] mobile:h-[6rem]"
          />
          <div className="absolute rounded-full inset-0 bg-primary opacity-0 group-hover:opacity-30 transition-opacity"></div>
          <div className="absolute opacity-0 group-hover:opacity-100">
            <Image
              src={CameraIcon}
              alt="카메라 아이콘"
              width={40}
              height={40}
            />
          </div>
          <input
            id="profileImage"
            type="file"
            accept=".png, .jpg, .jpeg"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div
          className="
          flex flex-col justify-center
          desktop:items-center  desktop:mt-[3.2rem] desktop:ml-0 tablet:mt-0 tablet:ml-[3.2rem] tablet:items-start mobile:ml-[1.6rem]"
        >
          <p className="desktop:text-[2.4rem] desktop:leading-[3.2rem] desktop:text-center text-[2.4rem] leading-[3.2rem] text-center font-bold text-[#2d3034]">
            {user.nickname}
          </p>
          <p className="text-[1.6rem] text-[#9FACBD] desktop:mt-[1.6rem] font-regular leading-[2.6rem] tablet:mt-[0.8rem]">
            {user.email}
          </p>
        </div>
      </div>
      <div
        className="desktop:w-[240] desktop:h-[134] desktop:mt-[4.8rem] 
      tablet:mt-[3rem] desktop:block tablet:justify-between tablet:flex tablet:flex-row tablet:items-end
      mobile:flex-col"
      >
        <div className="tablet:w-full tablet:mr-[2.4rem]">
          <p className="desktop:text-[1.6rem] desktop:font-medium desktop:leading-[2.6rem] tablet:text-[1.6rem] tablet:font-medium tablet:leading-[2.6rem] text-gray-800">
            닉네임
          </p>
          <input
            type="text"
            placeholder={user.nickname}
            className="desktop:w-[24rem] desktop:h-[4.8rem] desktop:p-[1.4rem_2rem] desktop:mt-[1rem] desktop:text-[1.6rem]
            tablet:w-full tablet:h-[4.8rem] tablet:p-[1.4rem_2rem] tablet:mt-[1rem] tablet:text-[1.6rem]
            border-[0.1rem] bg-white border-[#cfdbea] rounded-[1.6rem] font-regular focus:outline-none focus:border-primary
            "
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
          addClassName="desktop:w-[9.6rem] desktop:h-[4.2rem] desktop:m-[0.8rem_0_0_14.4rem] 
          tablet:w-[11.6rem] tablet:h-[4.8rem]
          rounded-[1.2rem] bg-[#6A42DB]"
          onClick={updateNickname}
        >
          <p
            className="
              desktop:p-[0.8rem_2rem] desktop:text-[1.6rem] desktop:leading-[2.6rem] text-white font-bold
              tablet:p-[1.6rem_3rem] tablet:text-[1.6rem] tablet:leading-[2.6rem]
              mobile:p-[0.8rem_2rem] mobile:text-[1.2rem] mobile:leading-[2.6rem]
            "
          >
            변경하기
          </p>
        </Button>
      </div>
    </div>
  );
}
