import type { Metadata } from "next";
import "@/styles/globals.css";
import Nav from "@/components/common/Nav";

export const metadata: Metadata = {
  title: "WHYNE",
  description: "중급 프로젝트 TEAM 11-5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="max-w-full">
        <Nav />
        {children}
      </body>
    </html>
  );
}
