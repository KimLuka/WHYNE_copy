import Profile from "@/components/myprofile/profile";
import MyReviewCard from "@/components/myprofile/myReviewCard";
import MyWineCard from "@/components/myprofile/myWineCard";

export default function MyProfilePage() {
  return (
    <div>
      <div className="m-5">
        <Profile />
      </div>
      <div className="m-5">
        <MyReviewCard />
      </div>
      <div className="m-5">
        <MyWineCard />
      </div>
    </div>
  );
}
