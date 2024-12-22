"use client";

import React from "react";
import { MouseEventHandler } from "react";
import Button from "@/components/common/Button";

type ChipProps = {
  label: string;
  selected?: boolean;
  onClick?: MouseEventHandler;
  isDisabled: boolean;
};

function Chip({
  label,
  selected,
  onClick,
  isDisabled,
}: ChipProps): React.ReactElement {
  const baseClasses =
    "rounded-[6.25rem] px-[1.5rem] py-[0.75rem] text-sm font-medium border border-solid";
  const selectedClasses = selected
    ? "bg-primary border-primary text-white"
    : "bg-white text-gray-800 !border-gray-300"; // !border로 우선순위를 높여줍니다
  const cursorClasses = isDisabled ? "cursor-default" : "cursor-pointer";
  const className = `${baseClasses} ${selectedClasses} ${cursorClasses}`;

  return (
    <Button
      size="large"
      color={selected ? "primary" : "white"}
      className={className}
      onClick={!isDisabled ? onClick : undefined}
      type="button"
      disabled={isDisabled}
    >
      {label}
    </Button>
  );
}

export default Chip;
