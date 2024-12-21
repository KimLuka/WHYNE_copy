"use client";

import Link from "next/link";
import Button from "../common/Button";
import InputItem from "./input-item";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import instance from "@/api/api";

export default function SignUpForm() {
  const [values, setValues] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSignUpButtonClick = async () => {
    // e.preventDefault();

    if (values.password !== values.passwordConfirmation) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const { email, nickname, password, passwordConfirmation } = values;

    try {
      await instance.post("/10-4/auth/signUp", {
        email,
        nickname,
        password,
        passwordConfirmation,
      });
      router.push("/");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.response?.data || axiosError.message);
    }
  };

  return (
    <div className="flex flex-col gap-[4rem]">
      <form className="gap-[2.4rem] flex flex-col">
        <InputItem
          label="이메일"
          id="email"
          name="email"
          type="email"
          placeholder="whyne@email.com"
          emptyErrorMessage="이메일은 필수 입력입니다."
          validationRule="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          validationMessage="이메일 형식으로 작성해 주세요."
          onSignUpInfoChange={handleInputChange}
          required
        />
        <InputItem
          label="닉네임"
          id="nickname"
          name="nickname"
          type="text"
          placeholder="whyne"
          emptyErrorMessage="닉네임은 필수 입력입니다."
          maxLengthRule={20}
          maxLengthErrorMessage="닉네임은 최대 20자까지 가능합니다."
          onSignUpInfoChange={handleInputChange}
          required
        />
        <InputItem
          label="비밀번호"
          id="password"
          name="password"
          type="password"
          placeholder="영문, 숫자 포함 8자 이상" // 특수문자 포함이라고 수정?
          emptyErrorMessage="비밀번호는 필수 입력입니다."
          minLengthRule={8}
          validationRule="^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$"
          minLengthErrorMessage="비밀번호는 최소 8자 이상입니다."
          validationMessage="비밀번호는 숫자, 영문, 특수문자로만 가능합니다."
          value={values.password}
          onSignUpInfoChange={handleInputChange}
          required
        />
        <InputItem
          label="비밀번호 확인"
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
          placeholder="비밀번호 확인"
          emptyErrorMessage="비밀번호 확인을 입력해주세요."
          validationMessage="비밀번호가 일치하지 않습니다."
          value={values.passwordConfirmation}
          comparePassword={values.password}
          onSignUpInfoChange={handleInputChange}
          required
        />
        <Button
          type="submit"
          size="large"
          color="primary"
          addClassName="text-[1.6rem] font-bold mt-[0.8rem] rounded-[1.6rem]"
          onClick={(e) => {
            e.preventDefault();
            handleSignUpButtonClick();
          }}
        >
          가입하기
        </Button>
      </form>
      <p className="flex gap-[1rem] text-gray-500 text-[1.6rem] mx-auto">
        계정이 이미 있으신가요?
        <Link href="/signin" aria-label="로그인으로 이동">
          <span className="text-primary text-[1.6rem] font-medium underline">
            로그인하기
          </span>
        </Link>
      </p>
    </div>
  );
}