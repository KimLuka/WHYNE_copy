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
    <div className="max-w-[114rem] w-full desktop:min-h-[30.2rem] desktop:mx-auto tablet:min-h-[30.2rem] mobile:min-h-[20.9rem] ">
      {wine ? (
        <div className="desktop:mt-[4rem] tablet:mt-[4rem] mobile:mt-[2rem]">
          <div
            className="relative border-solid border-[0.1rem] bg-white rounded-[1.6rem] border-gray-300 flex items-end
          desktop:min-h-[26rem] desktop:mx-auto desktop:pl-[10rem]
          tablet:h-[26rem] tablet:mx-[2rem] tablet:pl-[6rem]
          mobile:min-h-[19rem] mobile:mx-[1.6rem] mobile:pl-[2rem]
          "
          >
            <div className="absolute">
              <div className="relative desktop:min-w-[5.8rem] desktop:h-[20.9rem] tablet:min-w-[8.4rem] tablet:h-[30.2rem] mobile:min-w-[5.8rem] mobile:h-[20.9rem]">
                <Image src={wine.image} alt="와인사진" layout="fill" />
              </div>
            </div>
            <div className="w-[72rem] flex items-start desktop:ml-[14.4rem] tablet:ml-[14.4rem] mobile:ml-[7.8rem]">
              <div className="my-[3rem]">
                <div className="desktop:mb-[2rem] tablet:mb-[2rem] mobile:mb-[0.45rem]">
                  <p
                    className="
                  break-words max-w-[50rem] font-semibold text-gray-800
                  desktop:text-[3rem] desktop:leading-[3.58rem] desktop:mb-[2rem]
                  tablet:text-[3rem] tablet:leading-[3.58rem] tablet:mb-[2rem]
                  mobile:text-[2rem] mobile:leading-[2.387rem] mobile:mb-[1.5rem] "
                  >
                    {wine.name}
                  </p>
                  <p
                    className="
                  font-regular text-gray-500
                  desktop:text-[1.6rem] desktop:leading-[2.6rem]
                  tablet:text-[1.6rem] tablet:laeding-[2.6rem]
                  mobile:text-[1.4rem] mobile:leading-[2.4rem] "
                  >
                    {wine.region}
                  </p>
                </div>
                <p
                  className="
                bg-[#F1EDFC] rounded-[1.2rem] text-primary font-bold inline-block gap-[1rem]
                desktop:min-w-[11.4rem] desktop:h-[3.7rem] desktop:p-[0.6rem_1.5rem] desktop:text-[1.8rem] desktop:leading-[2.6rem]
                tablet:min-w-[11.4rem] tablet:h-[3.7rem] tablet:p-[0.6rem_1.5rem] tablet:text-[1.8rem] tablet:leading-[2.6rem]
                mobile:min-w-[8.6rem] mobile:h-[3.6rem] mobile:p-[0.6rem_1rem] mobile:text-[1.4rem] mobile:leading-[2.4rem]"
                >
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
