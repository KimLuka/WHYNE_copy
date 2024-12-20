import SignUpForm from "@/components/auth/signup-form";
import Container from "@/components/common/container";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SignUp() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Container
        color="white"
        addClassName="max-w-[49.6rem] max-h-[80.3rem] px-[4.8rem] py-[8rem] w-full h-auto aspect-[496/803] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex flex-col gap-[6.4rem]">
          <Link href="/" aria-label="홈으로 이동">
            <Image
              src="/icons/black_large_logo.svg"
              alt="WHYNE 로고"
              width={104}
              height={0}
              className="block mx-auto"
            />
          </Link>
          <SignUpForm />
        </div>
      </Container>
    </div>
  );
}
