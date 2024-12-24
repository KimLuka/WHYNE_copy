"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../../../public/icons/white_medium_logo.svg";
import profile from "../../../public/images/example_profile.svg";

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setShowMenu(false);
    router.push("/");
  };

  const handleProfileClick = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <header className="nav-container flex-between tablet:py-[1.1rem] mobile:py-[1.5rem] tablet:px-[6rem] mobile:px-[2rem] tablet:h-[7rem] mobile:h-[5rem] tablet:mt-[2.4rem] mobile:mt-[1.6rem] mx-auto">
      <nav className="w-full flex-between">
        <Link href="/">
          <Image width={52} height={15} src={logo} alt="와인 로고" />
        </Link>
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={handleProfileClick}
              className="rounded-full overflow-hidden tablet:w-[4.5rem] tablet:h-[4.5rem] mobile:w-[2rem] mobile:h-[2rem]"
            >
              <Image
                src={profile}
                alt="프로필 이미지"
                layout="responsive"
                objectFit="contain"
                width={1}
                height={1}
                className="object-cover"
              />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-[0.8rem] h-auto w-auto bg-white shadow-lg rounded-[1.6rem] overflow-hidden border-solid border-[0.1rem] border-gray-300">
                <Link href="/myprofile" onClick={() => setShowMenu(false)}>
                  <button className="block tablet:w-[12.6rem] tablet:h-[5.2rem] mobile:w-[10.1rem] mobile:h-[4.6rem] tablet:py-[1.6rem] tablet:px-[2.6rem] mobile:py-[1.4rem] mobile:px-[2rem] text-gray-800 font-medium text-center tablet:text-lg mobile:md hover:bg-secondary hover:text-primary">
                    마이페이지
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="block tablet:w-[12.6rem] tablet:h-[5.2rem] mobile:w-[10.1rem] mobile:h-[4.6rem] tablet:py-[1.6rem] tablet:px-[2.6rem] mobile:py-[1.4rem] mobile:px-[2rem] text-gray-800 font-medium text-center tablet:text-lg mobile:md hover:bg-secondary hover:text-primary"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex tablet:gap-[4rem] mobile:gap-[2rem]">
            <Link
              href="/signin"
              className="text-white font-medium tablet:text-[1.6rem]/[1.9rem] mobile:text-[1.4rem]/[1.6rem]"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="text-white font-medium tablet:text-[1.6rem]/[1.9rem] mobile:text-[1.4rem]/[1.6rem]"
            >
              회원가입
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
