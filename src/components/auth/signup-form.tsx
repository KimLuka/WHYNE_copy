"use client";

import Link from "next/link";
import Button from "../common/Button";
import InputItem from "./input-item";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import instance from "@/api/api";
import { useAuth } from "@/context/auth-provider";
import { useRouter } from "next/navigation";

interface ErrorResponse {
  message: string;
}

export default function SignUpForm() {
  const [values, setValues] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const [hasError, setHasError] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleErrorChange = (hasError: boolean) => {
    setHasError(hasError);
  };

  const { user, login } = useAuth(false);

  const router = useRouter();

  const handleSignUpButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    if (hasError) {
      alert("입력한 정보를 다시 확인해주세요.");
      return;
    }

    const { email, nickname, password, passwordConfirmation } = values;

    try {
      await instance.post("/auth/signUp", {
        email,
        nickname,
        password,
        passwordConfirmation,
      });

      await login({ email, password });
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.response?.data || axiosError.message);

      const errorData = axiosError.response?.data as ErrorResponse;

      alert(
        errorData?.message ||
          axiosError.message ||
          "회원가입에 실패했습니다. 입력 정보를 확인해주시고 잠시 후 다시 시도해주세요.",
      );
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col gap-[4rem]">
      <form className="flex flex-col gap-[2.4rem] mobile:gap-[1.6rem]">
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
          onErrorChange={handleErrorChange}
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
          onErrorChange={handleErrorChange}
          required
        />
        <InputItem
          label="비밀번호"
          id="password"
          name="password"
          type="password"
          placeholder="숫자, 영문, 특수문자로 제한"
          emptyErrorMessage="비밀번호는 필수 입력입니다."
          minLengthRule={8}
          validationRule="^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$"
          minLengthErrorMessage="비밀번호는 최소 8자 이상입니다."
          validationMessage="비밀번호는 숫자, 영문, 특수문자로만 가능합니다."
          value={values.password}
          onSignUpInfoChange={handleInputChange}
          onErrorChange={handleErrorChange}
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
          onErrorChange={handleErrorChange}
          required
        />
        <Button
          type="submit"
          size="large"
          color="primary"
          addClassName="text-[1.6rem] font-bold mt-[0.8rem] rounded-[1.6rem]
          mobile:px-[12.7rem] mobile:py-[1.2rem] mobile:text-[1.4rem] mobile:mt-[3.2rem]"
          onClick={handleSignUpButtonClick}
        >
          가입하기
        </Button>
      </form>
      <p className="flex gap-[1rem] text-gray-500 text-[1.6rem] mx-auto">
        계정이 이미 있으신가요?
        <Link href="/signin" aria-label="로그인으로 이동">
          <span className="text-primary text-[1.6rem] font-medium underline mobile:text-[1.4rem]">
            로그인하기
          </span>
        </Link>
      </p>
    </div>
  );
}
