"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import MenuIcon from "@/../public/icons/menu.svg";

interface DropDownMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  menuIconSize?: number;
}

export default function DropDownMenu({
  onEdit,
  onDelete,
  menuIconSize = 26,
}: DropDownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleDropDown() {
    setIsOpen(!isOpen);
  }

  function handleMenuClick(callback?: () => void) {
    if (callback) callback();
    setIsOpen(false);
  }

  return (
    <div ref={menuRef} className="relative inline-block">
      <button onClick={toggleDropDown}>
        <Image src={MenuIcon} alt="메뉴 버튼" width={menuIconSize} />
      </button>

      {isOpen && (
        <div className="absolute items-center right-0 mt-[0.8rem] w-[12.6rem] h-[10.4rem] border-solid border-[0.1rem] border-gray-300 rounded-[1.6rem] flex flex-col">
          <button
            onClick={() => handleMenuClick(onEdit)}
            className="w-[12.6rem] h-[5.2rem] text-[1.6rem] font-medium leading-[2.6rem] items-center dropdown-menu-button"
          >
            수정하기
          </button>
          <button
            onClick={() => handleMenuClick(onDelete)}
            className="w-[12.6rem] h-[5.2rem] text-[1.6rem] font-medium leading-[2.6rem] items-center dropdown-menu-button"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
