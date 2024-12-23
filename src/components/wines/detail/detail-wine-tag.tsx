export type Aroma =
  | "CHERRY"
  | "BERRY"
  | "OAK"
  | "VANILLA"
  | "PEPPER"
  | "BAKING"
  | "GRASS"
  | "APPLE"
  | "PEACH"
  | "CITRUS"
  | "TROPICAL"
  | "MINERAL"
  | "FLOWER"
  | "TOBACCO"
  | "EARTH"
  | "CHOCOLATE"
  | "SPICE"
  | "CARAMEL"
  | "LEATHER";

export const AromaMapping: { [key in Aroma]: string } = {
  CHERRY: "체리",
  BERRY: "베리",
  OAK: "오크",
  VANILLA: "바닐라",
  PEPPER: "후추",
  BAKING: "제빵",
  GRASS: "풀",
  APPLE: "사과",
  PEACH: "복숭아",
  CITRUS: "시트러스",
  TROPICAL: "트로피컬",
  MINERAL: "미네랄",
  FLOWER: "꽃",
  TOBACCO: "담뱃잎",
  EARTH: "흙",
  CHOCOLATE: "초콜릿",
  SPICE: "스파이스",
  CARAMEL: "카라멜",
  LEATHER: "가죽",
};

interface DetailReviewTagProps {
  aromas: Aroma[];
}

export default function DetailWineTag({ aromas }: DetailReviewTagProps) {
  return (
    <div className="gap-[1rem] flex flex-wrap">
      {aromas.map((aroma) => (
        <div
          key={aroma}
          className="min-w-[4.2rem] h-[4.2rem] p-[0.8rem_1.5rem] border-solid border-gray-300 rounded-[10rem] bg-white border-[0.1rem]"
        >
          <p className="font-medium text-[1.6rem] leading-[2.6rem] text-gray-800">
            {AromaMapping[aroma]}
          </p>
        </div>
      ))}
      <div>
        <div></div>
      </div>
    </div>
  );
}
