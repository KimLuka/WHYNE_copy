"use client";

import { useReviewModalStore } from "@/provider/usereviewmodals";
import Chips from "@/components/common/Chips";
import { useEffect } from "react";

interface TagSelctorProps {
  aroma: string[];
}

export default function TagSelector({ aroma }: TagSelctorProps) {
  const { setAroma } = useReviewModalStore();

  useEffect(() => {
    setAroma(aroma);
  }, [aroma, setAroma]);

  const handleTagClick = (tag: string) => {
    if (aroma.includes(tag)) {
      setAroma(aroma.filter((t) => t !== tag));
    } else {
      setAroma([...aroma, tag]);
    }
  };

  const tags = [
    "체리",
    "베리",
    "오크",
    "바닐라",
    "후추",
    "제빵",
    "풀",
    "사과",
    "복숭아",
    "시트러스",
    "트로피컬",
    "미네랄",
    "꽃",
    "담뱃잎",
    "흙",
    "초콜릿",
    "스파이스",
    "카라멜",
    "가죽",
  ];

  return (
    <div className="h-[16.8rem] tablet:h-[21.4rem] flex flex-wrap gap-[0.8rem] tablet:gap-[1rem]">
      {tags.map((tag) => (
        <Chips
          key={tag}
          label={tag}
          selected={aroma.includes(tag)}
          onClick={() => handleTagClick(tag)}
          isDisabled={false}
        />
      ))}
    </div>
  );
}
