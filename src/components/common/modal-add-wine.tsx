"use client";

import { useState } from "react";
import { NewWineData, WineType } from "@/types/tasting";
import Button from "@/components/common/Button";
import Input from "@/components/common/input";
import ImageInput from "@/components/common/image-input";
import WineTypeDropdown from "@/components/common/wine-type-drop-down";
import api from "@/api/api";

interface Props {
  onClose: () => void;
}

export default function AddWine({ onClose }: Props) {
  const [values, setValues] = useState<NewWineData>({
    name: "",
    region: "",
    image: "",
    price: 0,
    type: WineType.None,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // 이미지 업로드 함수 추가
  const uploadImage = async (file: File) => {
    const token = localStorage.getItem("accessToken"); // ✨ 변경
    if (!token) throw new Error("인증 토큰이 없습니다."); // ✨ 추가

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await api.post<{ url: string }>(
        "/images/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✨ 변경
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data.url;
    } catch (error) {
      console.error("이미지 업로드 실패", error);
      throw error; // ✨ 변경: 에러를 throw하도록 수정
    }
  };

  // 유효성 검사 함수
  const validateField = (
    id: string,
    value: string | number | WineType | null | File,
  ): string => {
    if (value === null) return "값을 입력해주세요.";

    switch (id) {
      case "name":
        return !value || (typeof value === "string" && value.trim() === "")
          ? "와인 이름을 입력해주세요."
          : "";

      case "price":
        if (!value || Number(value) === 0) return "가격을 입력해주세요.";
        return Number(value) < 0 || Number(value) > 1000000
          ? "유효한 가격 범위는 0~1,000,000원입니다."
          : "";

      case "region":
        return !value || (typeof value === "string" && value.trim() === "")
          ? "원산지를 입력해주세요."
          : "";

      case "type":
        return value === WineType.None ? "와인 타입을 선택해주세요." : "";

      case "image":
        if (value instanceof File) {
          return imageFile ? "" : "이미지를 선택해주세요.";
        }
        return "";

      default:
        return "";
    }
  };

  const shouldShowError = (fieldName: string) => {
    return touched[fieldName] && errors[fieldName];
  };

  const handleBlur = (id: string) => {
    setTouched((prev) => ({
      ...prev,
      [id]: true,
    }));

    if (id === "name" || id === "region" || id === "price" || id === "image") {
      const errorMessage = validateField(id, values[id]);
      if (errorMessage) {
        setErrors((prev) => ({ ...prev, [id]: errorMessage }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[id];
          return newErrors;
        });
      }
    }
  };

  const handleChangeImage = (image: File | null) => {
    if (image) {
      setImageFile(image);
      setTouched((prev) => ({ ...prev, image: true }));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.image;
        return newErrors;
      });
    } else {
      setImageFile(null);
      setErrors((prev) => ({ ...prev, image: "이미지를 선택해주세요." }));
    }
  };

  const updateFieldValue = (id: string, value: string | number | WineType) => {
    const newValues = {
      ...values,
      [id]: value,
    };
    setValues(newValues);

    setTouched((prev) => ({
      ...prev,
      [id]: true,
    }));

    const errorMessage = validateField(id, value);
    if (errorMessage) {
      setErrors((prev) => ({ ...prev, [id]: errorMessage }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleWineValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    updateFieldValue(id, id === "price" ? Number(value) : value);
  };

  const handleTypeChange = (value: WineType) => {
    updateFieldValue("type", value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("폼 제출 시작");

    const allFields = ["name", "price", "region", "type"]; // image 필드 제외
    console.log("현재 values:", values);
    console.log("현재 imageFile:", imageFile);

    const allTouched = allFields.reduce(
      (acc, field) => ({
        ...acc,
        [field]: true,
      }),
      {},
    );
    setTouched(allTouched);

    const newErrors: Record<string, string> = {};
    allFields.forEach((field) => {
      const value = values[field as keyof NewWineData];
      const errorMessage = validateField(field, value);
      console.log(`${field} 검증:`, { value, errorMessage });
      if (errorMessage) {
        newErrors[field] = errorMessage;
      }
    });

    // 이미지 파일 별도 검증
    if (!imageFile) {
      newErrors.image = "이미지를 선택해주세요.";
    }

    console.log("검증 결과:", newErrors);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("검증 통과, API 호출 시도");
      try {
        if (!imageFile) {
          console.log("이미지 파일 누락");
          throw new Error("이미지 파일이 등록되지 않았습니다.");
        }

        const token = localStorage.getItem("accessToken");
        console.log("실제 토큰 값:", token); // ✨ 추가
        console.log("토큰 확인:", token ? "존재" : "없음");

        if (!token) {
          throw new Error("인증 토큰이 없습니다.");
        }

        // 이미지 업로드
        console.log("이미지 업로드 시도");
        const imageUrl = await uploadImage(imageFile);
        console.log("이미지 업로드 결과:", imageUrl);

        if (!imageUrl) {
          throw new Error("이미지 업로드에 실패했습니다.");
        }

        // 와인 데이터 등록
        console.log("와인 데이터 제출 시도", {
          name: values.name,
          region: values.region,
          price: values.price,
          type: values.type,
          image: imageUrl,
        });

        const response = await api.post(
          "/wines",
          {
            name: values.name,
            region: values.region,
            price: values.price,
            type: values.type,
            image: imageUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("와인 등록 성공:", response);
        onClose();
      } catch (error) {
        console.error("에러 발생:", error);
        setErrors((prev) => ({
          ...prev,
          global: "와인 등록 중 문제가 발생했습니다.",
        }));
      }
    } else {
      console.log("검증 실패로 API 호출 중단");
    }
  };
  const isSubmitDisabled =
    !values.name ||
    !values.region ||
    values.price === 0 ||
    values.type === WineType.None ||
    !imageFile ||
    Object.keys(errors).length > 0;

  return (
    <div className="flex flex-col h-full">
      <article className="flex-1 px-[2.4rem]">
        <h1 className="text-[2rem] tablet:text-[2.4rem] font-bold mt-[2.4rem] mb-[3.2rem] tablet:mb-[4rem]">
          와인 등록
        </h1>

        <form className="flex flex-col h-full" onSubmit={handleSubmit}>
          <div className="flex-1 flex flex-col gap-[3.2rem] tablet:gap-[2.4rem]">
            <div className="flex flex-col gap-[1.6rem]">
              <label
                htmlFor="name"
                className="text-[1.4rem] tablet:text-[1.6rem] font-medium"
              >
                와인 이름
              </label>
              <Input
                id="name"
                placeholder="와인 이름 입력"
                onChange={handleWineValueChange}
                onBlur={() => handleBlur("name")}
                value={values.name}
                error={shouldShowError("name") ? errors.name : ""}
              />
            </div>

            <div className="flex flex-col gap-[1.6rem]">
              <label
                htmlFor="price"
                className="text-[1.4rem] tablet:text-[1.6rem] font-medium"
              >
                가격
              </label>
              <Input
                id="price"
                placeholder="가격 입력"
                type="number"
                min="0"
                onChange={handleWineValueChange}
                onBlur={() => handleBlur("price")}
                value={values.price === 0 ? "" : String(values.price)}
                error={shouldShowError("price") ? errors.price : ""}
              />
            </div>

            <div className="flex flex-col gap-[1.6rem]">
              <label
                htmlFor="region"
                className="text-[1.4rem] tablet:text-[1.6rem] font-medium"
              >
                원산지
              </label>
              <Input
                id="region"
                placeholder="원산지 입력"
                onChange={handleWineValueChange}
                onBlur={() => handleBlur("region")}
                value={values.region}
                error={shouldShowError("region") ? errors.region : ""}
              />
            </div>

            <div className="flex flex-col gap-[1.6rem]">
              <label
                htmlFor="type"
                className="text-[1.4rem] tablet:text-[1.6rem] font-medium"
              >
                타입
              </label>
              <WineTypeDropdown
                value={values.type}
                onChange={handleTypeChange}
                onBlur={() => handleBlur("type")}
                error={shouldShowError("type") ? errors.type : ""}
              />
            </div>

            <div className="flex flex-col gap-[1.6rem]">
              <label
                htmlFor="image"
                className="text-[1.4rem] tablet:text-[1.6rem] font-medium"
              >
                와인 사진
              </label>
              <ImageInput
                id="image"
                onChangeImage={handleChangeImage}
                hasPreview
                error={shouldShowError("image") ? errors.image : ""}
              />
            </div>
          </div>

          <div className="flex gap-[1rem] mt-[2rem] tablet:mt-[2.4rem] sticky bottom-0 bg-white py-[1.6rem]">
            <Button
              size="small"
              color="white"
              type="button"
              onClick={onClose}
              addClassName="flex-1 text-primary font-bold min-h-[4rem] text-base tablet:text-lg"
            >
              취소
            </Button>
            <Button
              size="small"
              color="primary"
              type="submit"
              disabled={isSubmitDisabled}
              addClassName="flex-[2.4] font-bold min-h-[4rem] text-base tablet:text-lg"
            >
              와인 등록하기
            </Button>
          </div>
        </form>
      </article>
    </div>
  );
}