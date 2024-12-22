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
    <div className="gap-[1rem] flex flex-col">
      <label htmlFor={id} className="text-[1.6rem] font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        className={`placeholder-gray-500 text-[1.6rem] border border-gray-300 
          rounded-[1.6rem] w-[40rem] h-[4.8rem] pl-[2rem] focus:border-primary focus:outline-none
        ${error ? "border-red" : "border-gray-300"}`}
        onKeyDown={handlePreventSpace}
        onBlur={handleEmptyInput}
        onChange={(e) => {
          handleValidation(e);
          onSignUpInfoChange?.(e);
        }}
        value={value}
        {...props}
      />
      {error && <span className="text-red">{errorMessage}</span>}
    </div>
  );
}
