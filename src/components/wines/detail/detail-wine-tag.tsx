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

export const mapTagToAroma = (tag: string): Aroma | undefined => {
  return Object.keys(AromaMapping).find(
    (key) => AromaMapping[key as Aroma] === tag,
  ) as Aroma | undefined;
};

interface DetailReviewTagProps {
  aromas: Aroma[];
}

export default function DetailWineTag({ aromas }: DetailReviewTagProps) {
  return (
    <div className="desktop:gap-[1rem] tablet:gap-[1rem] mobile:gap-[0.6rem] flex flex-wrap">
      {aromas.map((aroma) => (
        <div
          key={aroma}
          className="
          border-solid border-gray-300 rounded-[10rem] bg-white border-[0.1rem]
          desktop:min-w-[4.2rem] desktop:h-[4.2rem] destkop:p-[0.8rem_1.5rem] 
          tablet:min-w-[4.2rem] tablet:h-[4.2rem] tablet:p-[0.8rem_1.5rem] 
          mobile:min-w-[3.6rem] mobile:h-[3.6rem] mobile:p-[0.6rem_1rem] 
          "
        >
          <p className="font-medium text-gray-800 desktop:text-[1.6rem] desktop:leading-[2.6rem] tablet:text-[1.6rem] tablet:leading-[2.6rem] mobile:text-[1.4rem] mobile:leading-[2.4rem]">
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
