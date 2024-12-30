import { Metadata } from "next";

export const META = {
  title: "WHYNE: 한 곳에서 관리하는 나만의 와인창고",
  siteName: "WHYNE | 와인",
  description:
    "매달 새롭게 만나는 와인 추천 콘텐츠, 다양한 필터로 찾는 내 맞춤 와인, 직관적인 리뷰 시스템",
  keyword: [
    "WHYNE",
    "이 달의 추천 와인",
    "와인 추천",
    "와인",
    "맞춤 와인",
    "와인 타입",
    "와인 가격",
    "와인 평점",
    "와인 리뷰",
  ],
  url: "https://whyne.vercel.app/",
  googleVerification: "https://whyne.vercel.app/",
  naverVerification: "https://whyne.vercel.app/",
  ogImage: "/purple_logo.svg",
} as const;

interface generateMetadataProps {
  title?: string;
  description?: string;
  asPath?: string;
  ogImage?: string;
}

export const getMetadata = (metadataProps?: generateMetadataProps) => {
  const { title, description, asPath, ogImage } = metadataProps || {};

  const TITLE = title ? `${title} | WHYNE` : META.title;
  const DESCRIPTION = description || META.description;
  const PAGE_URL = asPath ? asPath : "";
  const OG_IMAGE = ogImage || META.ogImage;

  const metadata: Metadata = {
    metadataBase: new URL(META.url),
    alternates: {
      canonical: PAGE_URL,
    },
    title: TITLE,
    description: DESCRIPTION,
    keywords: [...META.keyword],
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      siteName: TITLE,
      locale: "ko_KR",
      type: "website",
      url: PAGE_URL,
      images: {
        url: OG_IMAGE,
      },
    },
    verification: {
      google: META.googleVerification,
      other: {
        "naver-site-verification": META.naverVerification,
      },
    },
    twitter: {
      title: TITLE,
      description: DESCRIPTION,
      images: {
        url: OG_IMAGE,
      },
    },
  };

  return metadata;
};
