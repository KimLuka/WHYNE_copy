import React, { useState, useEffect } from 'react';
import { WineType } from '@/types/tasting';
import Input from '@/components/common/Input';

interface WineTypeDropdownProps {
  value: WineType;
  onChange: (value: WineType) => void;
  onBlur: (e: {target:{id:string; value: WineType}}) => void; //타입
  error?: string;
}

const WineTypeDropdown: React.FC<WineTypeDropdownProps> = ({
  value,
  onChange,
  onBlur,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const [localError, setLocalError] = useState<string | undefined>(error);

  const options = [
    { value: WineType.Red, label: 'Red' },
    { value: WineType.White, label: 'White' },
    { value: WineType.Sparkling, label: 'Sparkling' }
  ];

  const ArrowIcon = ({ isUp }: { isUp?: boolean }) => (
    <svg 
      xmlns='http://www.w3.org/2000/svg' 
      width='1.75rem'
      height='1.75rem'
      viewBox='0 0 24 24' 
      fill='#7E57C2'
      style={{ 
        transform: isUp ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease'
      }}
    >
      <path d='M7 10l5 5 5-5z'/>
    </svg>
  );

  const handleSelection = (selectedValue: WineType) => {
    onChange(selectedValue);
    setIsOpen(false);
    setTouched(true);
    setLocalError(undefined);
    onBlur({ //
      target: {
        id: 'type',
        value: selectedValue //
      }
    });
  };

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
    if (!touched) {
      setTouched(true);
      onBlur({
        target: {
          id: 'type',
          value: value
        }
      });
    }
  };

  useEffect(() => {
    setLocalError(error);
  }, [error]);

  const selectedLabel = options.find(opt => opt.value === value)?.label || '';

  const displayError = touched && value === WineType.None
    ? '와인 타입을 선택해주세요.'
    : localError;

  return (
    <div className='relative'>
      <div 
        className='relative' 
        onClick={handleDropdownClick}
      >
        <Input
          value={selectedLabel}
          placeholder='와인 종류 선택'
          readOnly
          error={displayError}
          className='pr-[3.5rem]'
        />
        <div className='absolute right-[1rem] top-1/2 transform -translate-y-1/2'>
          <ArrowIcon isUp={isOpen} />
        </div>
      </div>

      {isOpen && (
        <div className='absolute w-full mt-[0.125rem] bg-white border border-gray-300 rounded-[2rem] overflow-hidden z-10'>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelection(option.value)}
              className={`
                px-[2rem]
                h-[4.8rem]
                flex items-center
                cursor-pointer
                text-[1.4rem]
                ${value === option.value 
                  ? 'bg-secondary text-primary' 
                  : 'hover:bg-secondary hover:text-primary'
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
};

export default WineTypeDropdown;