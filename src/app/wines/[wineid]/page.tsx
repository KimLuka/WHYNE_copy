import DetailWineCard from "@/components/wines/detail/detail-wine-card";
import DetailReviewCard from "@/components/wines/detail/detail-review-card";

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
        <div className="mr-[34rem] mt-[6rem]">
          <DetailReviewCard wineid={wineid} />
        </div>
      </div>
    </div>
  );
}
