import { ChangeEvent, useState } from "react";
import NextImage from "next/image";

interface ImageInputProps {
  id: string;
  initialImage?: string | null;
  hasPreview?: boolean;
  onChangeImage: (image: File | null) => void;
  error?: string;
}

export default function ImageInput({
  id,
  initialImage = null,
  hasPreview = false,
  onChangeImage,
}: ImageInputProps) {
  const [previewImg, setPreviewImg] = useState<string | null>(initialImage);

  // image file extension checker
  const imageExtensionValidCheck = (fileName: string) => {
    const imageExtensions = ["jpg", "jpeg", "png", "bmp", "webp"];
    const extension = fileName.split(".").pop()?.toLowerCase();

    if (!extension) return false;

    return imageExtensions.includes(extension);
  };

  // file input change handler
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!hasPreview) return;

    // 파일 선택창을 눌렀다가 취소하는 경우에 선택된 파일을 전부 제거
    if (previewImg) {
      URL.revokeObjectURL(previewImg);
      onChangeImage(null);
      setPreviewImg(null);
    }

    // 파일을 제대로 선택한 경우
    if (e.target?.files) {
      const currentImgFile = e.target.files[0];

      e.target.value = "";

      if (!currentImgFile) return;

      // 이미지 파일 확장자 검사
      if (!imageExtensionValidCheck(currentImgFile.name)) {
        alert("이미지 확장자는 jpg, jpeg, png, bmp, webp만 가능합니다!");
        return;
      }

      onChangeImage(currentImgFile);
      setPreviewImg(URL.createObjectURL(currentImgFile));
    }
  };

  // preview image del button handler
  const handleDelBtnClick = () => {
    URL.revokeObjectURL(previewImg!); // 절대 null일 수 없음
    onChangeImage(null);
    setPreviewImg(null);
  };

  return (
    <>
      <div className="flex gap-3">
        <label htmlFor={id} className="cursor-pointer">
          <div className="flex h-[12rem] w-[12rem] items-center justify-center rounded-xl border-[0.1rem] border-solid border-gray-300 md:h-[14rem] md:w-[14rem] md:rounded-2xl">
            <NextImage
              width={32}
              height={32}
              src="/icons/photo.svg"
              alt="포토 아이콘"
            />
          </div>
        </label>
        {hasPreview && previewImg && (
          <div className="relative h-[12rem] w-[12rem] md:h-[14rem] md:w-[14rem]">
            <NextImage
              fill
              className="h-[15rem] w-[15rem] rounded-lg object-cover"
              src={previewImg}
              alt="프리뷰 이미지"
            />
            <button
              type="button"
              onClick={handleDelBtnClick}
              className="absolute right-1 top-1"
            >
              <NextImage
                width={20}
                height={20}
                src="/icons/close.svg"
                alt="이미지 제거 버튼"
              />
            </button>
          </div>
        )}
      </div>
      <input
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
}