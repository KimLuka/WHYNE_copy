export enum WineType {
  None = "",
  Red = "RED",
  White = "WHITE",
  Sparkling = "SPARKLING",
}

export interface NewWineData {
  name: string;
  region: string;
  image: string | File; // 수정
  price: number;
  type: WineType;
}
