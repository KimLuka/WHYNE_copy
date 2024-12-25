"use client";

import { useReviewModalStore } from "@/provider/usereviewmodals";
import Slider from "@/components/common/Slider";

const sliderData = [
  { label: "바디감", descriptions: ["가벼워요", "진해요"] },
  { label: "타닌", descriptions: ["부드러워요", "떫어요"] },
  { label: "당도", descriptions: ["드라이해요", "달아요"] },
  { label: "산미", descriptions: ["안셔요", "많이셔요"] },
];

export default function TasteSlider() {
  const { tasteValues, setTasteValues } = useReviewModalStore();

  const handleSliderChange = (index: number, value: number) => {
    const newTasteValues = [...tasteValues];
    newTasteValues[index] = value;
    setTasteValues(newTasteValues);
  };

  return (
    <section className="whitespace-nowrap flex flex-col gap-[1rem]">
      {sliderData.map((slider, index) => (
        <div key={slider.label} className="flex w-full">
          <div className="flex items-center w-full">
            <p className="mr-[1.9rem] tablet:mr-[2.4rem] w-[4rem] tablet:w-[4.5rem] h-[3rem] flex-shrink-0 rounded-[0.8rem] bg-gray-100 
              flex items-center justify-center text-[1.2rem] tablet:text-[1.4rem] font-medium text-gray-500">
              {slider.label}
            </p>
            <p className="mr-[0.5rem] tablet:mr-[0.8rem] w-[4rem] tablet:w-[6rem] flex-shrink-0 
              text-[1.2rem] tablet:text-[1.4rem] font-regular h-[3rem] flex items-center justify-center">
              {slider.descriptions[0]}
            </p>
            <div className="mt-[0.5rem] flex-1 mx-[1.2rem] tablet:mx-[0.8rem]">
              <Slider
                value={tasteValues[index]}
                mode="interactive"
                onChange={(value) => handleSliderChange(index, value)}
                width="100%"
                height="0.4rem"
                trackStyle={{
                  backgroundColor: "var(--color-primary)",
                  height: "0.4rem",
                }}
                railStyle={{ backgroundColor: "#cfdbea", height: "0.4rem" }}
                handleStyle={{
                  borderColor: "var(--color-primary)",
                  height: "1.6rem",
                  width: "2rem",
                  marginTop: "-0.6rem",
                  backgroundColor: "var(--white)",
                }}
              />
            </div>
            <p className="w-[2.5rem] ml-[1.2rem] tablet:ml-[2.5rem] flex-shrink-0 
              text-[1.2rem] tablet:text-[1.4rem] font-regular text-right h-[3rem] flex items-center justify-end">
              {slider.descriptions[1]}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
