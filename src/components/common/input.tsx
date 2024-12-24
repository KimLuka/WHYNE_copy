import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  isErrored?: boolean;
}

export default function Input({
  className,
  error,
  isErrored,
  ...props
}: Props) {
  const classCombined = `
      w-full
      min-h-[3rem]
      tablet:min-h-[4rem] 
      px-[1.6rem]
      tablet:px-[2rem]
      border-[0.1rem]
      rounded-[0.8rem]
      tablet:rounded-[1.1rem]
      text-[1rem] 
      tablet:text-[1.2rem] 
      desktop:text-[1.4rem]
      font-regular
      text-gray-800 
      focus:border-primary
      focus:outline-none
      placeholder:text-gray-500 
      ${error || isErrored ? "border-red" : "border-gray-300"}
      ${className || ""}
    `.trim();

  return (
    <div>
      <input className={classCombined} {...props} />
      {error && (
        <p className="text-red text-[0.875rem] tablet:text-[1rem] mt-[0.5rem]">
          {error}
        </p>
      )}
    </div>
  );
}
