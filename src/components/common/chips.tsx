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
  const baseClasses = `
    rounded-full 
    min-h-[2.875rem] tablet:min-h-[4.6rem]
    min-w-[4rem] tablet:min-w-[6.4rem]
    px-[1.125rem]
    py-[0.625rem]
    gap-[0.625rem]
    text-sm
    font-medium 
    border 
    border-solid
    whitespace-nowrap
  `;

  const selectedClasses = selected
    ? "bg-primary border-primary text-white"
    : "bg-white text-gray-800 border-gray-300";

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
