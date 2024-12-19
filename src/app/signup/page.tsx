import SignUpForm from "@/components/auth/signup-form";
import Container from "@/components/common/container";
import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * 
 * @returns 
 * @description
 * 
 * 1. 기본
 * - [x] 이메일, 닉네임, 비밀번호, 비밀번호 확인 입력창을 확인할 수 있게 해주세요.
 * - 각 입력값에 대해 다음 사항을 확인하세요:
    - [x] 이메일 입력창에서 blur될 때, 빈 값이면 “이메일은 필수 입력입니다.” 에러 메시지를 보여주세요.
    - [x] 이메일 형식이 아니면 “이메일 형식으로 작성해 주세요.” 에러 메시지를 보여주세요.
    - [x] 닉네임이 비어있으면 “닉네임은 필수 입력입니다.” 에러 메시지를 보여주세요.
    - [x] 닉네임이 20자를 초과하면 “닉네임은 최대 20자까지 가능합니다.” 에러 메시지를 보여주세요.
    - [x] 비밀번호가 비어있으면 “비밀번호는 필수 입력입니다.” 에러 메시지를 보여주세요.
    - [x] 비밀번호가 8자 미만이면 “비밀번호는 최소 8자 이상입니다.” 에러 메시지를 보여주세요.
    - [x] 비밀번호가 숫자, 영문, 특수문자(!@#$%^&*)만으로 이루어지지 않았다면 “비밀번호는 숫자, 영문, 특수문자로만 가능합니다.” 에러 메시지를 보여주세요.
    - [x] 비밀번호 확인 창에서 빈 값이면 “비밀번호 확인을 입력해주세요.” 에러 메시지를 보여주세요.
    - [] 비밀번호와 비밀번호 확인이 일치하지 않으면 “비밀번호가 일치하지 않습니다.” 에러 메시지를 보여주세요.
* - [] 입력값이 모두 정상일 때 '가입하기' 버튼을 클릭하거나 엔터를 누르면 회원가입이 완료되고, 로그인된 상태로 홈 화면(`/`)으로 이동하세요.
* - [] 로그인 상태에서 `/signup`에 접근할 경우 홈 화면(`/`)으로 리다이렉트하세요.
 */

export default function SignUp() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Container
        color="white"
        addClassName="max-w-[49.6rem] max-h-[80.3rem] px-[4.8rem] py-[8rem] w-full h-auto aspect-[496/803] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex flex-col gap-[6.4rem]">
          <Link href="/" aria-label="홈으로 이동">
            <Image
              src="/icons/black_large_logo.svg"
              alt="WHYNE 로고"
              width={104}
              height={0}
              className="block mx-auto"
            />
          </Link>
          <SignUpForm />
        </div>
      </Container>
    </div>
  );
}
