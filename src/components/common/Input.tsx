import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function Input({
    className,
    error, 
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
      ${error ? 'border-red' : 'border-gray-300'}
      ${className || ''}
    `.trim();
  
    return (
      <div>
        <input 
          className={classCombined} 
          {...props} 
        />
        {error && (
          <p className='text-red text-[1rem] mt-[0.5rem]'>
            {error}
          </p>
        )}
      </div>
    );
  }