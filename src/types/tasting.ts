export enum WineType {
  None = "",
  Red = "RED",
  White = "WHITE",
  Sparkling = "SPARKLING",
}


export interface NewWineData {
  name: string;
  region: string;
  image: string | null;
  price: number;
  type: WineType;
}