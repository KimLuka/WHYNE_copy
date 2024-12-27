import React, { useState, useEffect } from "react";
import { WineType } from "@/types/tasting";
import Input from "@/components/modal-wine/input";

interface WineTypeDropdownProps {
  value: WineType;
  onChange: (value: WineType) => void;
  onBlur: (e: { target: { id: string; value: WineType } }) => void; //타입
  error?: string;
}

const WineTypeDropdown: React.FC<WineTypeDropdownProps> = ({
  value,
  onChange,
  onBlur,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const [localError, setLocalError] = useState<string | undefined>(error);

  const options = [
    { value: WineType.RED, label: "Red" },
    { value: WineType.WHITE, label: "White" },
    { value: WineType.SPARKLING, label: "Sparkling" },
  ];

  const ArrowIcon = ({ isUp }: { isUp?: boolean }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7E57C2"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: "transform 0.2s ease",
        transform: `rotate(${isUp ? 180 : 0}deg)`
      }}
    >
      <path d="M7 9l5 5 5-5" />
    </svg>
  );

  const handleSelection = (selectedValue: WineType) => {
    onChange(selectedValue);
    setIsOpen(false);
    setTouched(true);
    setLocalError(undefined);
    onBlur({
      //
      target: {
        id: "type",
        value: selectedValue, //
      },
    });
  };

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
    if (!touched) {
      setTouched(true);
      onBlur({
        target: {
          id: "type",
          value: value,
        },
      });
    }
  };

  useEffect(() => {
    setLocalError(error);
  }, [error]);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || "";

  const displayError =
    touched && value === WineType.None
      ? "와인 타입을 선택해주세요."
      : localError;

      return (
        <div className="relative">
          <div className="relative" onClick={handleDropdownClick}>  {/* 여기에 onClick 추가 */}
            <Input
              value={selectedLabel}
              placeholder="와인 종류 선택"
              readOnly
              error={displayError}
              className="pr-[3.5rem]"
            />
            <div className="absolute right-[1rem] top-[1.4rem] pointer-events-none">
              <ArrowIcon isUp={isOpen} />
            </div>
          </div>
      
          {isOpen && (
            <div className="absolute items-center right-0 mt-[0.8rem] w-full h-[15.6rem] border-solid border-[0.1rem] border-gray-300 rounded-[1.4rem] flex flex-col p-[0.4rem] bg-white z-50">
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelection(option.value)}
                  className={`
                    w-full h-[5.2rem] text-[1.6rem] font-medium leading-[3rem] flex items-center px-[2rem] text-gray-800 
                    rounded-[1.2rem]
                    ${value === option.value
                      ? "bg-[#f1edfc] text-primary"
                      : "hover:bg-[#f1edfc] hover:text-primary"
                    }
                  `}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
export default WineTypeDropdown;