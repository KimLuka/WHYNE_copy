import {
  DeleteReviewRequest,
  GetReviewRequest,
  PostWineReviewRequest,
  UpdateReviewRequest,
} from '@/types/review.request';
import {
  DeleteReviewResponse,
  GetReviewResponse,
  PostWineReviewResponse,
} from '@/types/review.response';

import instance from '@/api/api';

export const getReview = async ({ ...params }: GetReviewRequest) => {
  const response = await instance<GetReviewResponse>({
    method: 'GET',
    url: `/reviews/${params.id}`,
  });
  return response;
};

export const postWineReview = async (reviewData: PostWineReviewRequest) => {
  const response = await instance<PostWineReviewResponse>({
    method: 'POST',
    url: '/reviews',
    data: reviewData,
  });
  return response;
};

export const updateReview = async ({ ...params }: UpdateReviewRequest) => {
  const response = await instance<PostWineReviewResponse>({
    method: 'PATCH',
    url: `/reviews/${params.reviewId}`,
    data: params.data,
  });
  return response.data;
};

export const deleteReview = async ({ ...params }: DeleteReviewRequest) => {
  const response = await instance<DeleteReviewResponse>({
    method: 'DELETE',
    url: `/reviews/${params.id}`,
  });
  return response;
};