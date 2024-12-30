import type { Metadata } from "next";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/auth-provider";
import ClientWrapper from "@/components/common/nav-wrapper";
import { AddWineModalProvider } from '@/app/wines/AddWineModalProvider';
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
          <AddWineModalProvider>
          <ReviewProvider>
            {/* <LandingNav /> */}
            <ClientWrapper>{children}</ClientWrapper>
          </ReviewProvider>
          </AddWineModalProvider>
     </AuthProvider>
      </body>
    </html>
  );
}