"use client"; // useState 훅 사용 위해 클라이언트 컴포넌트로 명시(멘토님이 말씀주신 서버 클라이언트 제약사항?)

import { useState } from "react";
// import { validationRules } from "./rules";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  // rules?: typeof validationRules.rules;
  minLengthRule?: number;
  maxLengthRule?: number;
  validationRule?: string;
  emptyErrorMessage?: string;
  minLengthErrorMessage?: string;
  maxLengthErrorMessage?: string;
  validationMessage?: string;
}

export default function InputItem({
  label,
  id,
  // rules,
  minLengthRule,
  maxLengthRule,
  validationRule,
  emptyErrorMessage = "필수 입력입니다.",
  minLengthErrorMessage = "최소 글자 수 기준보다 적습니다.",
  maxLengthErrorMessage = "최대 글자 수 기준보다 많습니다.",
  validationMessage = "입력값이 유효하지 않습니다.",
  required,
  ...props
}: InputProps) {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const handleEmptyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   if (required && !value) {
  //     setError(true);
  //     setErrorMessage(rules?.messages.empty || "필수 입력입니다.");
  //   } else {
  //     setError(false);
  //     setErrorMessage("");
  //   }
  // };

  // const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   if (rules?.minLength && value.length < rules.minLength) {
  //     setError(true);
  //     setErrorMessage(
  //       rules.messages.minLength || "최소 글자 수 기준보다 짧습니다.",
  //     );
  //     return;
  //   }
  //   if (rules?.regex && !new RegExp(rules.regex).test(value)) {
  //     setError(true);
  //     setErrorMessage(rules.messages.invalid || "유효하지 않은 값입니다.");
  //     return;
  //   }
  //   if (rules?.maxLength && value.length < rules.maxLength) {
  //     setError(true);
  //     setErrorMessage(
  //       rules.messages.maxLength || "최대 글자 수 기준보다 깁니다.",
  //     );
  //     return;
  //   }
  //   setError(false);
  //   setErrorMessage("");
  // };

  const handleEmptyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (required && !value) {
      setError(true);
      setErrorMessage(emptyErrorMessage);
      return;
    }
  };

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (minLengthRule && value.length < minLengthRule) {
      setError(true);
      setErrorMessage(minLengthErrorMessage);
      return;
    }

    if (validationRule) {
      // validationRule?: RegExp; 로 하면 const regex 안 해도 되지만, 서버 컴포넌트에서 클라이언트 컴포넌트로 해당 객체는 전달 불가
      const regex = new RegExp(validationRule);
      if (!regex.test(value)) {
        setError(true);
        setErrorMessage(validationMessage);
        return;
      }
    }

    if (maxLengthRule && value.length > maxLengthRule) {
      setError(true);
      setErrorMessage(maxLengthErrorMessage);
      return;
    }

    setError(false);
    setErrorMessage("");
  };

  const handlePreventSpace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <div className="gap-[1rem] flex flex-col">
      <label htmlFor={id} className="text-[1.6rem] font-medium">
        {label}
      </label>
      <input
        id={id}
        className={`placeholder-gray-500 text-[1.6rem] border border-gray-300 rounded-[1.6rem] w-[40rem] h-[4.8rem] pl-[2rem]
        ${error ? "border-red" : "border-gray-300"}`}
        onKeyDown={handlePreventSpace}
        onBlur={handleEmptyInput}
        onChange={handleValidation}
        {...props}
      />
      {error && <span className="text-red">{errorMessage}</span>}
    </div>
  );
}
