"use client";
import { createContext, useContext, useState, useCallback } from "react";

type ReviewState = {
  content: string;
  aroma: string[];
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  wineId?: number;
  wineName?: string;
  rating: number;
  id: number | undefined;
  setContent: (content: string) => void;
  setAroma: (tags: string[]) => void;
  setLightBold: (value: number) => void;
  setSmoothTannic: (value: number) => void;
  setDrySweet: (value: number) => void;
  setSoftAcidic: (value: number) => void;
  setWineId: (id: number) => void;
  setRating: (rating: number) => void;
  setId: (id: number) => void;
  setReviewData: (
    data: Partial<Omit<ReviewState, "setReviewData" | "resetReview">>,
  ) => void;
  resetReview: () => void;
};

export const ReviewContext = createContext<ReviewState | null>(null);

const ReviewProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState("");
  const [aroma, setAroma] = useState<string[]>([]);
  const [lightBold, setLightBold] = useState(0);
  const [smoothTannic, setSmoothTannic] = useState(0);
  const [drySweet, setDrySweet] = useState(0);
  const [softAcidic, setSoftAcidic] = useState(0);
  const [wineId, setWineId] = useState<number>();
  const [wineName] = useState<string>();
  const [rating, setRating] = useState(0);
  const [id, setId] = useState<number | undefined>(undefined);

  const setReviewData = useCallback((data: Partial<ReviewState>) => {
    if (data.content !== undefined) setContent(data.content);
    if (data.aroma !== undefined) setAroma(data.aroma);
    if (data.lightBold !== undefined) setLightBold(data.lightBold);
    if (data.smoothTannic !== undefined) setSmoothTannic(data.smoothTannic);
    if (data.drySweet !== undefined) setDrySweet(data.drySweet);
    if (data.softAcidic !== undefined) setSoftAcidic(data.softAcidic);
    if (data.wineId !== undefined) setWineId(data.wineId);
    if (data.rating !== undefined) setRating(data.rating);
    if (data.id !== undefined) setId(data.id);
  }, []);

  const resetReview = useCallback(() => {
    setContent("");
    setAroma([]);
    setLightBold(0);
    setSmoothTannic(0);
    setDrySweet(0);
    setSoftAcidic(0);
    setRating(0);
    setId(undefined);
  }, []); // useCallback으로 감싸기

  const value = {
    content,
    aroma,
    lightBold,
    smoothTannic,
    drySweet,
    softAcidic,
    wineId,
    wineName,
    rating,
    id,
    setContent,
    setAroma,
    setLightBold,
    setSmoothTannic,
    setDrySweet,
    setSoftAcidic,
    setWineId,
    setRating,
    setId,
    setReviewData,
    resetReview,
  };

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
};

export default ReviewProvider;

export function useReviewModalStore() {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReviewModalStore must be used within a ReviewProvider");
  }
  return context;
}

// "use client";
// import instance from "@/api/api";
// import { createContext, useContext, useEffect, useState } from "react";

// type ReviewState = {
//   id: number | undefined;
//   setId: (id: number) => void;
//   data: GetWineDetailResponse | null;
// };

// type GetWineDetailResponse = {
//   id: number;
//   rating: number;
//   lightBold: number;
//   smoothTannic: number;
//   drySweet: number;
//   softAcidic: number;
//   aroma: string[];
//   content: string;
//   createdAt: Date;
//   updatedAt: Date;
//   user: {
//     id: number;
//     nickname: string;
//     image: string;
//   };
//   isLiked: boolean;
//   wineId: number;
//   teamId: string;
// };

// export const ReviewContext = createContext<ReviewState | null>(null);

// const ReviewProviderV2 = ({ children }: { children: React.ReactNode }) => {
//   const [reviewId, setReviewId] = useState<number | undefined>(undefined);
//   const [data, setData] = useState<GetWineDetailResponse | null>(null);

//   async function handleChangedId(id: number) {
//     setReviewId(id);
//   }

//   useEffect(() => {
//     async function fetchWineDetail() {
//       if (!reviewId) {
//         return;
//       }
//       return instance.get<GetWineDetailResponse>(`/reviews/${reviewId}`);
//     }

//     fetchWineDetail().then((response) => {
//       if (response) setData(response.data);
//     });
//   }, [reviewId]);

//   return (
//     <ReviewContext.Provider
//       value={{
//         id: reviewId,
//         setId: handleChangedId,
//         data,
//       }}
//     >
//       {children}
//     </ReviewContext.Provider>
//   );
// };

// export default ReviewProviderV2;

// export function useReviewModalStoreV2() {
//   const context = useContext(ReviewContext);
//   if (!context) {
//     throw new Error("useReviewModalStore must be used within a ReviewProvider");
//   }
//   return context;
// }
