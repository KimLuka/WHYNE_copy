"use client";

import { useState } from "react";
import MyReviewCard from "./MyReviewCard";
import MyWineCard from "./MyWineCard";
import "@/../public/images/placeholder1.png";

const reviews = [
  {
    id: 1,
    rating: 5.0,
    createdAt: "2024-12-19T03:46:36.139Z",
    name: "This Wine is Amazing",
    content: "Highly recommend this wine for dinner parties.",
  },
  {
    id: 2,
    rating: 4.5,
    createdAt: "2024-12-17T12:34:00.000Z",
    name: "Decent Quality Wine",
    content: "Good flavor, but slightly overpriced in my opinion.",
  },
  {
    id: 3,
    rating: 4.8,
    createdAt: "2024-12-16T08:45:12.000Z",
    name: "Smooth and Elegant",
    content: "Perfect for a relaxing evening.",
  },
  {
    id: 4,
    rating: 5.0,
    createdAt: "2024-12-18T14:46:36.139Z",
    name: "This Wine is Amazing",
    content: "Highly recommend this wine for dinner parties.",
  },
  {
    id: 5,
    rating: 4.5,
    createdAt: "2024-12-17T12:34:00.000Z",
    name: "Decent Quality Wine",
    content: "Good flavor, but slightly overpriced in my opinion.",
  },
  {
    id: 6,
    rating: 4.8,
    createdAt: "2024-12-16T08:45:12.000Z",
    name: "Smooth and Elegant",
    content: "Perfect for a relaxing evening.",
  },
];

const wines = [
  {
    id: 1,
    name: "Sentinel Cabernet Sauvignon 2016",
    region: "Western Cape, South Africa",
    image:
      "https://cdn.discordapp.com/attachments/1275867779723034707/1319138863234420866/wine_image.png?ex=6764df4d&is=67638dcd&hm=3b9b74ebfa5bb12cb818c821c31800c950a1cfdad7fb1bb259bf0b5bae33b4aa&",
    price: "64,990",
  },
  {
    id: 2,
    name: "Chateau Margaux 2018",
    region: "Bordeaux, France",
    image:
      "https://cdn.discordapp.com/attachments/1275867779723034707/1319138863234420866/wine_image.png?ex=6764df4d&is=67638dcd&hm=3b9b74ebfa5bb12cb818c821c31800c950a1cfdad7fb1bb259bf0b5bae33b4aa&",
    price: "320,000",
  },
  {
    id: 3,
    name: "Silver Oak Cabernet Sauvignon 2019",
    region: "Napa Valley, USA",
    image:
      "https://i.pinimg.com/736x/47/32/2d/47322dba61a25d552f1bd0f9e57cddff.jpg",
    price: "95,000",
  },
];

export default function ProfileTab() {
  const [activeTab, setActiveTab] = useState("reviews");

  const itemCount = activeTab === "reviews" ? reviews.length : wines.length;

  return (
    <div className="w-[80rem] h-[3.2rem]">
      <div className="flex justify-between items-center ">
        <div>
          <button
            className={`w-[9.6rem] h-[3.2rem] text-[2rem] font-semibold leading-[3.2rem] ${activeTab === "reviews" ? "text-gray-800" : "text-gray-500"}`}
            onClick={() => setActiveTab("reviews")}
          >
            내가 쓴 후기
          </button>
          <button
            className={`ml-[3.2rem] w-[13.1rem] h-[3.2rem] text-[2rem] font-semibold leading-[3.2rem] ${activeTab === "wines" ? "text-gray-800" : "text-gray-500"}`}
            onClick={() => setActiveTab("wines")}
          >
            내가 등록한 와인
          </button>
        </div>
        <p className="font-regular text-[1.4rem] leading-[2.4rem] text-right text-primary">
          {`총 ${itemCount}개`}
        </p>
      </div>

      <div>
        {activeTab === "reviews" ? (
          <div className="mt-[2.2rem] space-y-[2rem]">
            {reviews.map((review) => (
              <MyReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="mt-[2.2rem] space-y-[2rem]">
            {wines.map((wine) => (
              <MyWineCard key={wine.id} wine={wine} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
