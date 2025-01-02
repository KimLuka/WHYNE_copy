"use client";

import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  minLengthRule?: number;
  maxLengthRule?: number;
  validationRule?: string;
  emptyErrorMessage?: string;
  minLengthErrorMessage?: string;
  maxLengthErrorMessage?: string;
  validationMessage?: string;
  comparePassword?: string;
  onSignUpInfoChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onErrorChange?: (hasError: boolean) => void;
}

export default function InputItem({
  label,
  id,
  name,
  minLengthRule,
  maxLengthRule,
  validationRule,
  emptyErrorMessage = "필수 입력입니다.",
  minLengthErrorMessage = "최소 글자 수 기준보다 적습니다.",
  maxLengthErrorMessage = "최대 글자 수 기준보다 많습니다.",
  validationMessage = "입력값이 유효하지 않습니다.",
  required,
  value,
  onSignUpInfoChange,
  comparePassword,
  onErrorChange,
  ...props
}: InputProps) {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmptyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (required && !value) {
      setError(true);
      setErrorMessage(emptyErrorMessage);
      onErrorChange?.(true);
      return;
    }
    handleValidation(e);
    onErrorChange?.(false);
  };

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (comparePassword && value !== comparePassword) {
      setError(true);
      setErrorMessage(validationMessage);
      onErrorChange?.(true);
      return;
    }

    if (minLengthRule && value.length < minLengthRule) {
      setError(true);
      setErrorMessage(minLengthErrorMessage);
      onErrorChange?.(true);
      return;
    }

    if (validationRule) {
      const regex = new RegExp(validationRule);
      if (!regex.test(value)) {
        setError(true);
        setErrorMessage(validationMessage);
        onErrorChange?.(true);
        return;
      }
    }
    if (maxLengthRule && value.length > maxLengthRule) {
      setError(true);
      setErrorMessage(maxLengthErrorMessage);
      onErrorChange?.(true);
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
    <div className="flex flex-col gap-[1rem]">
      <label
        htmlFor={id}
        className="text-[1.6rem] font-medium mobile:text-[1.4rem] dark:text-dark-black"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        className={`placeholder-gray-500 text-[1.6rem] border border-gray-300 rounded-[1.6rem] pl-[2rem]
          focus:border-primary focus:outline-none dark:focus:border-dark-primary
          desktop:w-[40rem] desktop:h-[4.8rem]  
          tablet:w-[40rem] tablet:h-[4.8rem]
          mobile:w-[30.3rem] mobile:h-[4.2rem] mobile:text-[1.4rem]
        ${error ? "border-2" : "border-gray-300"}`}
        onKeyDown={handlePreventSpace}
        onBlur={handleEmptyInput}
        onChange={(e) => {
          handleValidation(e);
          onSignUpInfoChange?.(e);
        }}
        value={value}
        {...props}
      />
      {error && <span className="text-primary">{errorMessage}</span>}
    </div>
  );
}
