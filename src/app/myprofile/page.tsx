import Profile from "@/components/myprofile/profile";
import ProfileTab from "@/components/myprofile/profile-tab";

export default function MyProfilePage() {
  return (
    <div className="mt-[3.7rem] justify-center flex">
      <div className="flex flex-col tablet:flex-row ">
        <div className="mr-[6rem]">
          <Profile />
        </div>
        <ProfileTab />
      </div>
    </div>
  );
}
