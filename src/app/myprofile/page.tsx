import Profile from "@/components/myprofile/profile";
import ProfileTab from "@/components/myprofile/profile-tab";

export default function MyProfilePage() {
  return (
    <div className="desktop:mt-[3.7rem] tablet:mt-[2rem] mobile:mt-[2rem] justify-center flex">
      <div className="flex desktop:flex-row tablet:flex-col mobile:flex-col">
        <div className="desktop:mr-[6rem] desktop:ml-0 tablet:mx-[2rem] mobile:mx-[1.8rem]">
          <Profile />
        </div>
        <div className="desktop:mt-0 tablet:mt-[4rem] mobile:mt-[3rem] desktop:mx-0 tablet:mx-[2rem] mobile:mx-[1.8rem]">
          <ProfileTab />
        </div>
      </div>
    </div>
  );
}
