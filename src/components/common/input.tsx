import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  isErrored?: boolean; // isErrored prop 추가
}

export default function Input({
  className,
  error,
  isErrored, // isErrored prop 추가
  ...props
}: Props) {
  const classCombined = `
      w-full
      min-h-[4rem] 
      px-[2rem]
      border-[0.1rem]
      rounded-[1.1rem]
      text-[1.2rem] 
      font-regular
      text-gray-800 
      focus:border-primary
      focus:outline-none
      placeholder:text-gray-500 
      desktop:text-[1.4rem]
      ${error || isErrored ? "border-red" : "border-gray-300"}  // isErrored 조건 추가
      ${className || ""}
    `.trim();

  return (
    <div>
      <input className={classCombined} {...props} />
      {error && <p className="text-red text-[1rem] mt-[0.5rem]">{error}</p>}
    </div>
  );
}
