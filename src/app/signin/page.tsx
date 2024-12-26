"use client";

import { useEffect, useState } from "react";
import SignUpForm from "@/components/auth/signin-form";
import Container from "@/components/common/container";
import Image from "next/image";
import Link from "next/link";
import { signInWithKakao, refreshToken } from "../../api/api"; // 카카오 로그인과 리프레시 토큰 관련 API 호출 함수

export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // URL 파라미터에서 카카오 인증 코드 추출
    const params = new URLSearchParams(window.location.search);
    const kakaoCode = params.get("code");

    if (kakaoCode) {
      // 카카오 로그인 후 인가 코드가 존재하면 토큰 요청
      setIsLoading(true);
      signInWithKakao({
        redirectUri: "http://localhost:3000/signin",
        token: kakaoCode,
      })
        .then((response) => {
          // 카카오 로그인 후 받은 액세스 토큰과 리프레시 토큰을 로컬 스토리지에 저장
          localStorage.setItem("accessToken", response.data.token);
          localStorage.setItem("refreshToken", response.data.refreshToken); // 리프레시 토큰도 저장
          window.location.href = "/"; // 로그인 후 홈으로 리디렉션
        })
        .catch((error) => {
          if (error.response) {
            console.error("Error response", error.response.data);
            console.error("Error status:", error.response.status);
          } else {
            console.error("카카오 로그인 오류", error);
            alert("카카오 로그인에 실패했습니다.");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // 카카오 인증 코드가 없으면 리프레시 토큰으로 액세스 토큰을 갱신 시도
      const refreshTokenFromStorage = localStorage.getItem("refreshToken");
      if (refreshTokenFromStorage) {
        setIsLoading(true);
        refreshToken({ refreshToken: refreshTokenFromStorage }) // 리프레시 토큰으로 액세스 토큰 갱신
          .then((response) => {
            // 새로운 액세스 토큰을 로컬 스토리지에 저장
            localStorage.setItem("accessToken", response.data.token); // response.data.token으로 접근
            window.location.href = "/"; // 홈으로 리디렉션
          })
          .catch((error) => {
            console.error("리프레시 토큰으로 토큰 갱신 실패", error);
            alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Container
        color="white"
        addClassName="w-full h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        desktop:aspect-[496/803] desktop:max-w-[49.6rem] desktop:max-h-[80.3rem] desktop:px-[4.8rem] desktop:py-[8rem] 
        tablet:aspect-[496/771] tablet:max-w-[49.6rem] tablet:max-h-[77.1rem] tablet:px-[4.8rem] tablet:py-[6.4rem] 
        mobile:aspect-[343/681] mobile:max-w-[34.3rem] mobile:max-h-[68.1rem] mobile:px-[2rem] mobile:py-[5.6rem]"
      >
        <div className="flex flex-col desktop:gap-[6.4rem] desktop:w-[40rem] tablet:gap-[6.4rem] tablet:w-[40rem] mobile:gap-[5.6rem] mobile:w-[30.3rem]">
          <Link href="/" aria-label="홈으로 이동">
            <Image
              src="/icons/black_large_logo.svg"
              alt="WHYNE 로고"
              width={104}
              height={0}
              className="block mx-auto"
            />
          </Link>

          {/* 로딩 중일 때 텍스트 표시 */}
          {isLoading ? (
            <div className="text-center text-gray-500">로그인 중...</div>
          ) : (
            <SignUpForm />
          )}
        </div>
      </Container>
    </div>
  );
}
