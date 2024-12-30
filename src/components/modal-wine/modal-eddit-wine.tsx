"use client";

import { useState,useEffect } from "react";
import { WineType} from "@/types/tasting";
import Button from "@/components/common/Button";
import Input from "@/components/modal-wine/input";
import ImageInput from "@/components/modal-wine/image-input";
import WineTypeDropdown from "@/components/modal-wine/wine-type-drop-down";
import Modal from "@/components/common/modal-container";
import instance from "@/api/api";

interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: WineType;
}
interface Props {
  isOpen: boolean;
  wine: Wine;  // wine 정보 추가
  onClose: () => void;
  onUpdate: (updatedWine: Wine) => void;  // 성공 시 호출할 콜백 추가
}

interface NewWineData {
  name: string;
  region: string;
  image: string;
  price: number;
  type: WineType;
}


const useResponsiveMargin = () => {
  const [marginClass, setMarginClass] = useState('');
  const [buttonPaddingClass, setButtonPaddingClass] = useState('pt-[2rem]');
 
  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;
      console.log('Window size:', { width, height });
      
      // Set button padding based on height
      if (height >= 668) {
        setButtonPaddingClass('pt-[3rem]');
      } else {
        setButtonPaddingClass('pt-[2rem]');
      }

      // 태블릿 (744px 이상)
      if (width >= 744) {
        setMarginClass('h-screen flex items-center'); // 화면 중앙 정렬
      }
      // 모바일 (744px 미만)
      else {
        if (height >= 915) {
          setMarginClass('mt-[23rem]'); 
        } else if (height >= 900) {
          setMarginClass('mt-[25rem]'); 
        } else if (height >= 896) {
          setMarginClass('mt-[22rem]');
        } else if (height >= 844) {
          setMarginClass('mt-[17rem]'); 
        } else if (height >= 740) {
          setMarginClass('mt-[7rem]');
        } else if (height >= 720) {
          setMarginClass('mt-[3rem]');
        } else if (height <= 667) {
          setMarginClass('mt-[2rem]');
        } else {
          setMarginClass('mt-[9rem]'); 
        }
      }
    };
 
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  return { marginClass, buttonPaddingClass };
};



export default function AddWine({ isOpen, wine, onClose, onUpdate }: Props) {
  const { marginClass, buttonPaddingClass } = useResponsiveMargin();  
  const [values, setValues] = useState<NewWineData>({  // Partial 제거
    name: wine.name,
    region: wine.region,
    image: wine.image,
    price: wine.price,
    type: wine.type,
  });
  

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});


  // 이미지 업로드 함수 추가
  const uploadImage = async (file: File) => {
    // const token = localStorage.getItem("accessToken");
    // if (!token) throw new Error("인증 토큰이 없습니다.");

    const formData = new FormData();
    formData.append("image", file);
    console.log("FormData 확인:");
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const response = await instance.post<{ url: string }>(
        "/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("이미지 업로드 중...", response.data);
      return response.data.url;
    } catch (error) {
      console.error("이미지 업로드 실패", error);
      throw error; // ✨ 변경: 에러를 throw하도록 수정
    }
  };


    // 유효성 검사 함수
const validateField = (
      id: string,
      value: string | number | WineType | null | File | undefined
    ): string => {
      if (value === undefined || value === null) return "값을 입력해주세요.";
    
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
    //if (!imageFile) {
     // newErrors.image = "이미지를 선택해주세요.";
    //}

    console.log("검증 결과:", newErrors);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        let imageUrl = values.image; // 기존 이미지 유지
        if (imageFile) {
          // 새 이미지가 있을 경우에만 업로드
          imageUrl = await uploadImage(imageFile);
        }
  
        const updatedWineData = {
          name: values.name,
          region: values.region,
          price: values.price,
          type: values.type,
          image: imageUrl,
        };
  
        // PATCH 요청으로 변경
        const response = await instance.patch(
          `/wines/${wine.id}`,
          updatedWineData
        );
  
        console.log("와인 수정 성공:", response);
        
        // 성공 시 부모 컴포넌트에 알림
        onUpdate({
          ...wine,
          ...updatedWineData
        });
        
        onClose();
      } catch (error) {
        console.error("에러 발생:", error);
        setErrors((prev) => ({
          ...prev,
          global: "와인 수정 중 문제가 발생했습니다.",
        }));
      }
    }
  };


  const isSubmitDisabled =
  !values.name ||
  !values.region ||
  values.price === 0 ||
  values.type === WineType.None ||
  Object.keys(errors).length > 0;
    
  return (
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  className={
  `w-full tablet:max-w-[46rem] 
  h-full
  rounded-t-[2rem] tablet:rounded-[2rem] 
  flex flex-col
  ${marginClass}`}>


  <div className="flex flex-col w-full h-full ">
      <article className="flex-1 px-[2rem] pt-[1rem] py-0 tablet:px-[2.4rem]">
      <section className="flex justify-between items-center">
      <h1 className="text-[2rem] tablet:text-[2.4rem] font-bold mb-[3rem] tablet:mb-[4rem]">
          내가 등록한 와인
        </h1>
        <Button
            type="button"
            color="secondary"
            size="large"
            onClick={onClose}
            className="text-gray-500 text-2xl mt-[1rem] tablet:mt-[2.4rem] mb-[3rem] tablet:mb-[4rem]"
          >
            X
          </Button>
          </section>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className=" flex flex-col gap-[1.7rem] tablet:gap-[2.4rem]">
            <div className="flex flex-col gap-[1.4rem] tablet:gap-[2rem]">
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

            <div className="flex flex-col gap-[1.4rem]">
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

            <div className="flex flex-col gap-[1.4rem]">
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

            <div className="flex flex-col gap-[1.4rem]">
              <label
                htmlFor="type"
                className="text-[1.4rem] tablet:text-[1.6rem] font-medium"
              >
                타입
              </label>

              <WineTypeDropdown
  value={values.type as WineType}  // 타입 단언 사용
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
  initialImage={wine.image} 
/>
            </div>
          </div>

          <div className={`flex bg-white ${buttonPaddingClass} tablet:pt-[3rem] pb-[2.4rem] tablet:pb-[3rem] gap-[1rem]`}>


            
          <Button
  size="small"
  color="white"
  type="button"
  onClick={() => {
    setValues({  // 초기값으로 리셋
      name: wine.name,
      region: wine.region,
      image: wine.image,
      price: wine.price,
      type: wine.type,
    });
    onClose();
  }}
  addClassName="flex-1 text-primary font-bold min-h-[4rem] tablet:text-lg"
>
  취소
</Button>


            <Button
              size="small"
              color="primary"
              type="submit"
              disabled={isSubmitDisabled}
              addClassName="flex-[2.4] font-bold min-h-[4rem] tablet:text-lg"
            >
              와인 수정하기
            </Button>
          </div>
        </form>
      </article>
    </div>
  </Modal>
  );
}