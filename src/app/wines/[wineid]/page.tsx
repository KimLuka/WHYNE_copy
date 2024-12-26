import DetailWineCard from "@/components/wines/detail/detail-wine-card";
import DetailReviewCard from "@/components/wines/detail/detail-review-card";
import RatingDetails from "@/components/wines/detail/rating-details";

export default function WineDetailPage({
  params,
}: {
  params: { wineid: string };
}) {
  const wineid = params.wineid;

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <DetailWineCard id={wineid} />
        <div className="mx-auto mt-[6rem] flex gap-[6rem]">
          <DetailReviewCard wineid={wineid} />
          <RatingDetails id={wineid} />
        </div>
      </div>
    </div>
  );
}
