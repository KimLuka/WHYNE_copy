import classNames from "classnames";
import { HTMLAttributes, ReactNode } from "react";

// 본 Container는 div 태그를 기본값으로 함
interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  color: "white" | "gray";
  children: ReactNode;
  addClassName?: string | string[];
}

export default function Container({
  color = "white",
  children,
  addClassName,
  ...rest
}: ContainerProps) {
  const colorClasses = {
    white: "bg-white dark:bg-dark-white",
    gray: "bg-gray-100 dark:bg-dark-gray-100",
  };

  const divClass = classNames(
    "rounded-[1.6rem] border-gray-300",
    "flex-between flex-col w-[40rem]",
    "shadow-[0px_2px_20px_0px_rgba(0,0,0,0.04)]",
    colorClasses[color],
    Array.isArray(addClassName) ? addClassName.join(" ") : addClassName,
  );
  return (
    <div className={divClass} {...rest}>
      {children}
    </div>
  );
}
