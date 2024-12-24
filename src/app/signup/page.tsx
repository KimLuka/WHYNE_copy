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
        addClassName="
        w-full h-auto absolute 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        desktop:aspect-[496/803] desktop:max-w-[49.6rem] desktop:max-h-[80.3rem] desktop:px-[4.8rem] desktop:py-[8rem] 
        tablet:aspect-[496/771] tablet:max-w-[49.6rem] tablet:max-h-[77.1rem] tablet:px-[4.8rem] tablet:py-[6.4rem] 
        mobile:aspect-[343/681] mobile:max-w-[34.3rem] mobile:max-h-[68.1rem] mobile:px-[2rem] mobile:py-[5.6rem]
        "
      >
        <div
          className="flex flex-col 
        desktop:gap-[6.4rem] desktop:w-[40rem]
        tablet:gap-[6.4rem] tablet:w-[40rem]
        mobile:gap-[5.6rem] mobile:w-[30.3rem]"
        >
          <Link href="/" aria-label="홈으로 이동">
            <Image
              src="/icons/black_large_logo.svg"
              alt="WHYNE 로고"
              width={104}
              height={30}
              className="block mx-auto"
            />
          </Link>
          <SignUpForm />
        </div>
      </Container>
    </div>
  );
}
