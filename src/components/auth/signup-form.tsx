import Link from "next/link";
import Button from "../common/Button";
import InputItem from "./input-item";
// import { validationRules } from "./rules";

export default function SignUpForm() {
  return (
    <div className="flex flex-col gap-[4rem]">
      <form className="gap-[2.4rem] flex flex-col">
        <InputItem
          label="이메일"
          id="email"
          type="email"
          placeholder="whyne@email.com"
          // rules={validationRules.email}
          emptyErrorMessage="이메일은 필수 입력입니다."
          validationRule="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
          validationMessage="이메일 형식으로 작성해 주세요."
          required
        />
        <InputItem
          label="닉네임"
          id="nickname"
          type="text"
          placeholder="whyne"
          // rules={validationRules.nickname}
          emptyErrorMessage="닉네임은 필수 입력입니다."
          maxLengthRule={20}
          maxLengthErrorMessage="닉네임은 최대 20자까지 가능합니다."
          required
        />
        <InputItem
          label="비밀번호"
          id="pw"
          type="password"
          placeholder="영문, 숫자 포함 8자 이상" // 특수문자 포함이라고 수정?
          // rules={validationRules.password}
          emptyErrorMessage="비밀번호는 필수 입력입니다."
          minLengthRule={8}
          validationRule="^[a-zA-Z0-9!@#$%^&*]+$"
          minLengthErrorMessage="비밀번호는 최소 8자 이상입니다."
          validationMessage="비밀번호는 숫자, 영문, 특수문자로만 가능합니다."
          required
        />
        <InputItem
          label="비밀번호 확인"
          id="confirmPassword"
          type="password"
          placeholder="비밀번호 확인"
          // rules={validationRules.confirmPassword}
          emptyErrorMessage="비밀번호 확인을 입력해주세요."
          required
        />
        <Button
          type="submit"
          size="large"
          color="primary"
          addClassName="text-[1.6rem] font-bold mt-[0.8rem] rounded-[1.6rem]"
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
