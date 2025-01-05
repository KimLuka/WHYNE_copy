import type { Metadata } from "next";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/auth-provider";
import ClientWrapper from "@/components/common/nav-wrapper";
import { AddWineModalProvider } from "@/app/wines/AddWineModalProvider";
import ReviewProvider from "@/provider/usereviewmodals";
import { ThemeProvider } from "@/components/common/theme-provider";
import DarkMode from "@/components/common/dark-mode-button";

export const metadata: Metadata = {
  title: {
    default: "WHYNE",
    template: "%s",
  },
  description: "한 곳에서 관리하는 나만의 와인창고",
  keywords:
    "wine, 와인, WHYNE, 이 달의 추천 와인, 와인 추천, 와인, 맞춤 와인 ,와인 타입, 와인 가격, 와인 평점, 와인 리뷰, 와인 한 잔",
  metadataBase: new URL("https://whyne.vercel.app/"),
  icons: {
    icon: "/purple_logo.svg",
    apple: "/purple_logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="max-w-full">
        <ThemeProvider>
          <DarkMode />
          <AuthProvider>
            <AddWineModalProvider>
              <ReviewProvider>
                {/* <LandingNav /> */}
                <ClientWrapper>{children}</ClientWrapper>
              </ReviewProvider>
            </AddWineModalProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
