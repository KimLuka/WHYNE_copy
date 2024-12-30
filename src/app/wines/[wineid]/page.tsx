import DetailWineCard from "@/components/wines/detail/detail-wine-card";
import DetailReviewCard from "@/components/wines/detail/detail-review-card";

interface WineDetailPageProps {
  params: Promise<{
    wineid: string;
  }>;
}

export default async function WineDetailPage(props: WineDetailPageProps) {
  const params = await props.params;
  const { wineid } = await params;
  return (
    <div className="flex flex-col desktop:mt-[2rem] tablet:mt-[2rem] mobile:mt-[1rem]">
      <DetailWineCard id={wineid} />
      <div className="mt-[6rem] flex justify-center w-full">
        <DetailReviewCard wineid={wineid} />
      </div>
    </div>
  );
}
