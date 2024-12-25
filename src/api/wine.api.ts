import instance from "./api";

// 이미지 업로드
export const uploadWineImage = async (imgFile: File): Promise<string> => {
  const accessToken = `Bearer ${localStorage.getItem("accessToken")}`;
  const formData = new FormData();
  formData.append("image", imgFile, btoa(encodeURI(imgFile.name)));

  const response = await instance({
    method: "POST",
    url: "/images/upload",
    data: formData,
    headers: {
      Authorization: accessToken,
    },
  });

  return response.data.url;
};

// 와인 상세 정보 POST
export const postWineDetail = async (wineData: {
  name: string;
  region: string;
  price: number;
  type: string;
  image: string;
}) => {
  const response = await instance({
    method: "POST",
    url: "/wines",
    data: wineData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export async function deleteWine({ id }: { id: number }) {
  const response = await instance<{
    id?: number;
    message?: string;
  }>({
    method: "DELETE",
    url: `/wines/${id}`,
  });

  return response;
}

export async function deleteReview({ id }: { id: number }) {
  const response = await instance<{
    id?: number;
    message?: string;
  }>({
    method: "DELETE", 
    url: `/reviews/${id}`,
  });
 
  return response;
 }