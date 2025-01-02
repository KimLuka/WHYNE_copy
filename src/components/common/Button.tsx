import React, { ButtonHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  addClassName?: string | string[];
  disabled?: boolean;
  size: "small" | "medium" | "large";
  color: "primary" | "white" | "secondary";
  type: "button" | "submit" | "reset";
}

export default function Button({
  children,
  addClassName,
  disabled = false,
  type = "button",
  size = "large",
  color = "primary",
  ...rest
}: ButtonProps) {
  const sizeClasses = {
    large: "w-auto desktop:h-[5rem] tablet:h-[4.8rem]",
    medium: "w-auto tablet:h-[5rem] mobile:h-[4.8rem]",
    small: "w-auto rounded-[1.2rem] tablet:h-[4.2rem] mobile:h-[4rem]",
  }[size];

  const colorClasses = {
    primary:
      "dark:bg-[#5C3DC9] dark:hover:bg-[#7255E3] bg-primary hover:bg-[#7b52f1] text-white",
    white:
      "dark:bg-[#EDEDED] dark:hover-[#4A4266] bg-white hover:bg-[#e1d7f4] text-gray-800 border-solid border-[0.1rem] border-gray-300",
    secondary:
      "dark:hover-[#4A4266] bg-secondary hover:bg-[#e1d7f4] text-primary",
  }[color];

  const buttonClass = classNames(
    "rounded transition-all duration-300 ease-in-out cursor-pointer",
    sizeClasses,
    colorClasses,
    Array.isArray(addClassName) ? addClassName.join(" ") : addClassName,
    {
      "opacity-50 cursor-not-allowed": disabled,
    },
  );

  return (
    <>
      <button type={type} className={buttonClass} disabled={disabled} {...rest}>
        {children}
      </button>
    </>
  );
}
