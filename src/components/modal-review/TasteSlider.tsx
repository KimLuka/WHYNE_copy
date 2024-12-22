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
    <section className="whitespace-nowrap px-[1.2rem] flex flex-col gap-[1rem]">
      {sliderData.map((slider, index) => (
        <div key={slider.label} className="flex items-center justify-between">
          {" "}
          {/* justify-between 추가 */}
          <div className="flex items-center">
            {" "}
            {/* 왼쪽 컨텐츠를 감싸는 div */}
            <p
              className="mr-[1.2rem] w-[4.5rem] h-[3rem] flex-shrink-0 rounded-[0.8rem] bg-gray-100 
          flex items-center justify-center text-md 
font-medium text-gray-500 mobile:w-[5rem]"
            >
              {slider.label}
            </p>
            <p
              className="mr-[1rem] ml-[2rem] w-[3rem] flex-shrink-0 text-[1.4rem] font-regular 
h-[3rem] flex items-center justify-center"
            >
              {slider.descriptions[0]}
            </p>
            <div className="w-[23rem] mx-[2rem]">
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
          </div>
          <p
            className="mr-[1rem] ml-[2rem] w-[2.5rem] flex-shrink-0 text-md font-regular text-right
h-[3rem] flex items-center justify-end"
          >
            {slider.descriptions[1]}
          </p>
        </div>
      ))}
    </section>
  );
}
