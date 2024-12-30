"use client";

import { useReviewModalStore } from "@/provider/usereviewmodals";
import Slider from "../common/Slider";

// interface sliderDataType {
//   label: string;
//   descriptions: [string, string];
// }

// const sliderData: sliderDataType[] = [
//   { label: "바디감", descriptions: ["가벼워요", "진해요"] },
//   { label: "타닌", descriptions: ["부드러워요", "떫어요"] },
//   { label: "당도", descriptions: ["드라이해요", "달아요"] },
//   { label: "산미", descriptions: ["안셔요", "많이셔요"] },
// ];

export default function TastesliderData() {
  const { lightBold, smoothTannic, drySweet, softAcidic, setReviewData } =
    useReviewModalStore();

  // const handlesliderDataChange = (index: number, value: number) => {
  //   const newTasteValues = [...tasteValues];
  //   newTasteValues[index] = value;
  //   setTasteValues(newTasteValues);
  // };

  const handlesliderDataChange = (key: string, value: number) => {
    setReviewData({ [key]: value }); // 특정 필드만 업데이트
  };

  return (
    <section className="whitespace-nowrap flex flex-col gap-[1rem]">
      {/* {sliderDataData.map((sliderData, index) => ( */}
      <div key="바디감" className="flex w-full">
        <div className="flex items-center w-full">
          <p
            className="mr-[1.9rem] tablet:mr-[2.4rem] w-[4rem] tablet:w-[4.5rem] h-[3rem] flex-shrink-0 rounded-[0.8rem] bg-gray-100 
              flex items-center justify-center text-[1.2rem] tablet:text-[1.4rem] font-medium text-gray-500"
          >
            바디감
          </p>
          <span
            className="mr-[0.5rem] tablet:mr-[0.8rem] w-[4rem] tablet:w-[6rem] flex-shrink-0 
              text-[1.2rem] tablet:text-[1.4rem] font-regular h-[3rem] flex items-center justify-center"
          >
            가벼워요
          </span>
          <div className="mt-[0.5rem] flex-1 mx-[1.2rem] tablet:mx-[0.8rem]">
            <Slider
              value={lightBold}
              mode="interactive"
              onChange={(value) => handlesliderDataChange("lightBold", value)}
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
          <span
            className="w-[2.5rem] ml-[1.2rem] tablet:ml-[2.5rem] flex-shrink-0 
              text-[1.2rem] tablet:text-[1.4rem] font-regular text-right h-[3rem] flex items-center justify-end"
          >
            진해요
          </span>
        </div>
      </div>
      <div key="타닌" className="flex w-full">
        <div className="flex items-center w-full">
          <p
            className="mr-[1.9rem] tablet:mr-[2.4rem] w-[4rem] tablet:w-[4.5rem] h-[3rem] flex-shrink-0 rounded-[0.8rem] bg-gray-100 
              flex items-center justify-center text-[1.2rem] tablet:text-[1.4rem] font-medium text-gray-500"
          >
            타닌
          </p>
          <span
            className="mr-[0.5rem] tablet:mr-[0.8rem] w-[4rem] tablet:w-[6rem] flex-shrink-0 
              text-[1.2rem] tablet:text-[1.4rem] font-regular h-[3rem] flex items-center justify-center"
          >
            부드러워요
          </span>
          <div className="mt-[0.5rem] flex-1 mx-[1.2rem] tablet:mx-[0.8rem]">
            <Slider
              value={smoothTannic}
              mode="interactive"
              onChange={(value) =>
                handlesliderDataChange("smoothTannic", value)
              }
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
          <span
            className="w-[2.5rem] ml-[1.2rem] tablet:ml-[2.5rem] flex-shrink-0 
              text-[1.2rem] tablet:text-[1.4rem] font-regular text-right h-[3rem] flex items-center justify-end"
          >
            떫어요
          </span>
        </div>
      </div>
      <div key="당도" className="flex w-full">
        <div className="flex items-center w-full">
          <p
            className="mr-[1.9rem] tablet:mr-[2.4rem] w-[4rem] tablet:w-[4.5rem] h-[3rem] flex-shrink-0 rounded-[0.8rem] bg-gray-100 
              flex items-center justify-center text-[1.2rem] tablet:text-[1.4rem] font-medium text-gray-500"
          >
            당도
          </p>
          <span
            className="mr-[0.5rem] tablet:mr-[0.8rem] w-[4rem] tablet:w-[6rem] flex-shrink-0 
              text-[1.2rem] tablet:text-[1.4rem] font-regular h-[3rem] flex items-center justify-center"
          >
            드라이해요
          </span>
          <div className="mt-[0.5rem] flex-1 mx-[1.2rem] tablet:mx-[0.8rem]">
            <Slider
              value={drySweet}
              mode="interactive"
              onChange={(value) => handlesliderDataChange("drySweet", value)}
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
          <span
            className="w-[2.5rem] ml-[1.2rem] tablet:ml-[2.5rem] flex-shrink-0 
              text-[1.2rem] tablet:text-[1.4rem] font-regular text-right h-[3rem] flex items-center justify-end"
          >
            달아요
          </span>
        </div>
      </div>
      <div key="산미" className="flex w-full">
        <div className="flex items-center w-full">
          <p
            className="mr-[1.9rem] tablet:mr-[2.4rem] w-[4rem] tablet:w-[4.5rem] h-[3rem] flex-shrink-0 rounded-[0.8rem] bg-gray-100 
              flex items-center justify-center text-[1.2rem] tablet:text-[1.4rem] font-medium text-gray-500"
          >
            산미
          </p>
          <span
            className="mr-[0.5rem] tablet:mr-[0.8rem] w-[4rem] tablet:w-[6rem] flex-shrink-0 
              text-[1.2rem] tablet:text-[1.4rem] font-regular h-[3rem] flex items-center justify-center"
          >
            안셔요
          </span>
          <div className="mt-[0.5rem] flex-1 mx-[1.2rem] tablet:mx-[0.8rem]">
            <Slider
              value={softAcidic}
              mode="interactive"
              onChange={(value) => handlesliderDataChange("softAcidic", value)}
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
          <span
            className="w-[2.5rem] ml-[1.2rem] tablet:ml-[2.5rem] flex-shrink-0 
              text-[1.2rem] tablet:text-[1.4rem] font-regular text-right h-[3rem] flex items-center justify-end"
          >
            많이셔요
          </span>
        </div>
      </div>
      {/* ))} */}
    </section>
  );
}
