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

export interface WineType {
  id: number;
  image: string;
  name: string;
  region: string;
  price: number;
  avgRating: number;
  reviewCount: number;
  recentReview?: {
    user: {
      id: string;
      nickname: string;
      image: string;
    };
    updatedAt: string;
    createdAt: string;
    content: string;
    aroma: string[];
    rating: number;
    id: number;
  } | null;
  userId: number;
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
