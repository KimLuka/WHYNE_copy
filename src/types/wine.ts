export interface Filters {
  limit: number;
  type: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
}

export interface WineParam {
  limit: number;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  name?: string;
  cursor?: number;
}

interface User {
  id: number;
  nickname: string;
  image: string | null;
}

interface Review {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  likes: [
    user: {
      id: number;
    },
  ];
}

export interface WineType {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: Review | null;
}

export interface WineListType {
  list: WineType[];
  nextCursor: number | null;
  totalCount: number;
}

export interface Rating {
  rating: number;
}

export interface Price {
  minPrice: number;
  maxPrice: number;
}
