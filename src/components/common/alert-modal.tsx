import React from "react";
import Button from "./Button";

type AlertModalProps = {
  isOpen: boolean;
  text: string;
  onClose: () => void;
};

export default function AlertModal({ isOpen, text, onClose }: AlertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-30"
        onClick={onClose}
      ></div>
      <div
        className="rounded-[1.6rem] border-[0.1rem] border-solid border-gray-300 fixed z-20 dark:border-none dark:bg-dark-black bg-white p-[2rem]
                      w-[35rem] h-[15rem] flex flex-col justify-center items-center gap-[0.5rem]"
      >
        <p className="text-[1.6rem] text-center mb-[2rem] font-medium">
          {text}
        </p>
        <Button
          type="button"
          size="small"
          color="primary"
          addClassName="text-white text-[1.6rem] rounded-[1rem] font-bold px-[3rem] text-center"
          onClick={onClose}
        >
          확인
        </Button>
      </div>
    </div>
  );
}
