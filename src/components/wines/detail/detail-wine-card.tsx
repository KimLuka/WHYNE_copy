"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/api/api";

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

  useEffect(() => {
    async function fetchWineData() {
      try {
        setIsLoading(true);
        const response = await api.get<Wine>(`/wines/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setWine(response.data);
      } catch (error) {
        console.error("와인 정보 가져오기 실패", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWineData();
  }, [id]);

  if (isLoading) {
    return <div></div>;
  }

  function formatPrice(price: number): string {
    return new Intl.NumberFormat("ko-KR").format(price);
  }

  return (
    <div className="max-w-[114rem] w-full mx-auto min-h-[30.2rem]">
      {wine ? (
        <div className="mt-[4rem]">
          <div className="relative min-h-[26rem] border-solid border-[0.1rem] bg-white rounded-[1.6rem] border-gray-300 pl-[10rem] flex items-end">
            <div className="relative w-[5.8rem] h-[20.9rem] overflow-hidden">
              <Image
                src={wine.image}
                alt="와인사진"
                layout="fill"
                objectFit="cover"
                objectPosition="bottom"
                className="absolute w-[5.8rem] h-[20.9rem]"
              />
            </div>
            <div className="w-[72rem] flex justify-between items-start ml-[8.6rem]">
              <div className="m-[3rem_0_3rem_0rem]">
                <div className="mb-[2rem]">
                  <p className="break-words max-w-[30rem] text-[3rem] font-semibold leading-[3.58rem] text-gray-800 mb-[2rem]">
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
