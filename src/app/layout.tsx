import type { Metadata } from "next";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/auth-provider";
import ClientWrapper from "@/components/common/nav-wrapper";
import ReviewProvider from "@/provider/usereviewmodals";

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
        <AuthProvider>
          <ReviewProvider>
            <ClientWrapper>{children}</ClientWrapper>
          </ReviewProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
