// components/common/ClientWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import LandingNav from "@/components/common/Nav";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 숨기고 싶은 경로 리스트
  const hiddenRoutes = ["/signup", "/signin"];

  const shouldShowNav = !hiddenRoutes.includes(pathname);

  return (
    <>
      {shouldShowNav && <LandingNav />}
      {children}
    </>
  );
}
