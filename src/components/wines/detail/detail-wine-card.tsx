"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import instance from "@/api/api";
import { useAuth } from "@/context/auth-provider";

interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
}

interface DetailWineCardProps {
  id: string;
}

export default function DetailWineCard({ id }: DetailWineCardProps) {
  const [wine, setWine] = useState<Wine | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth(true);

  useEffect(() => {
    if (!user) {
      return;
    }
    async function fetchWineData() {
      try {
        setIsLoading(true);
        const response = await instance.get<Wine>(`/wines/${id}`);
        setWine(response.data);
      } catch (error) {
        console.error("와인 정보 가져오기 실패", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWineData();
  }, [id, user]);

  if (isLoading) {
    return <div></div>;
  }

  function formatPrice(price: number): string {
    return new Intl.NumberFormat("ko-KR").format(price);
  }

  return (
    <div className="max-w-[114rem] w-full desktop:min-h-[30.2rem] desktop:mx-auto tablet:min-h-[30.2rem] tablet:mx-[2rem] mobile:min-h-[20.9rem] mobile:mx-[1.6rem]">
      {wine ? (
        <div className="desktop:mt-[4rem] tablet:mt-[4rem] mobile:mt-[2rem]">
          <div
            className="relative border-solid border-[0.1rem] bg-white rounded-[1.6rem] border-gray-300 pl-[10rem] flex items-end
          desktop:min-h-[26rem] desktop:mx-auto tablet:h-[26rem] tablet:mx-[2rem] mobile:min-h-[19rem] mobile:mx-[1.6rem]
          "
          >
            <div className="absolute">
              <div className="relative desktop:min-w-[5.8rem] desktop:h-[20.9rem] tablet:min-w-[8.4rem] tablet:h-[30.2rem] mobile:min-w-[5.8rem] mobile:h-[20.9rem]">
                <Image src={wine.image} alt="와인사진" layout="fill" />
              </div>
            </div>
            <div className="w-[72rem] flex items-start desktop:ml-[14.4rem] tablet:ml-[6rem] mobile:ml-[2rem]">
              <div className="m-[3rem_0_3rem_0rem]">
                <div className="mb-[2rem]">
                  <p className="break-words max-w-[50rem] text-[3rem] font-semibold leading-[3.58rem] text-gray-800 mb-[2rem]">
                    {wine.name}
                  </p>
                  <p className="text-[1.6rem] font-regular leading-[2.6rem] text-gray-500">
                    {wine.region}
                  </p>
                </div>
                <p className="bg-[#F1EDFC] min-w-[11.4rem] h-[3.7rem] p-[0.55rem_1.5rem] rounded-[1.2rem] gap-[1rem] text-[1.8rem] text-primary font-bold leading-[2.6rem] inline-block">
                  ₩ {formatPrice(wine.price)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
