export interface Filters {
  limit: number;
  type: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
}

export interface Wine {
  id: number;
  image: string;
  name: string;
  region: string;
  price: number;
  avgRating: number;
  reviewCount: number;
  recentReview?: {
    content?: string | null;
  };
}

export interface Rating {
  rating: number;
}

export interface Price {
  minPrice: number;
  maxPrice: number;
}
