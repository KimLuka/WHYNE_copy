"use client";

import { useState } from "react";
import { loginUser } from "../../api/api";
import Link from "next/link";
import Button from "../common/Button";
import InputItem from "./input-item";
import Image from "next/image";
import KakaoLoginButton from "./KakaoLoginButton";

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); // 이메일 에러 상태 추가

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem("accessToken", response.data.token);
      window.location.href = "/"; // 로그인 후 홈으로 리디렉션
    } catch (error) {
      // error 객체를 콘솔로 출력하여 디버깅 할 수 있도록 처리
      console.error("로그인 중 오류:", error);
      // 이메일 혹은 비밀번호가 잘못됐다는 메시지를 설정
      setEmailError("이메일 혹은 비밀번호를 확인해주세요");
      setEmail(""); // 이메일 초기화
    }
  };

  return (
    <div className="flex flex-col gap-[4rem]">
      <form className="gap-[2.4rem] flex flex-col">
        <InputItem
          label="이메일"
          id="email"
          type="email"
          placeholder={emailError || "이메일 입력"} // 에러가 있으면 에러 메시지, 아니면 기본 placeholder
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          emptyErrorMessage="이메일은 필수 입력입니다."
          validationRule="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
          validationMessage="이메일 형식으로 작성해 주세요."
          required
        />
        <InputItem
          label="비밀번호"
          id="pw"
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          emptyErrorMessage="비밀번호는 필수 입력입니다."
          required
        />
        <Link href="/signup" aria-label="회원가입으로 이동">
          <span className="text-primary text-[1.6rem] font-medium underline">
            비밀번호를 잊으셨나요?
          </span>
        </Link>
        <Button
          type="submit"
          size="large"
          color="primary"
          addClassName="text-[1.6rem] font-bold mt-[0.8rem] rounded-[1.6rem]"
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          로그인
        </Button>
        <Button
          type="submit"
          size="large"
          color="white"
          addClassName="text-[1.6rem] font-bold mt-[0.8rem] rounded-[1.6rem] flex items-center justify-center"
        >
          <Image
            src="/icons/google.svg"
            alt="google 로고"
            width={24}
            height={24}
            className="mr-2"
          />
          Google로 시작하기
        </Button>
        <KakaoLoginButton />
      </form>

      <p className="flex gap-[1rem] text-gray-500 text-[1.6rem] mx-auto">
        계정이 없으신가요?
        <Link href="/signup" aria-label="회원가입으로 이동">
          <span className="text-primary text-[1.6rem] font-medium underline">
            회원가입 하기
          </span>
        </Link>
      </p>
    </div>
  );
}
