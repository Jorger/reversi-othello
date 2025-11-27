import { EBoardColor } from "../utils/constants";

export type TBoardColor = keyof typeof EBoardColor;
export type IBackgroud = TBoardColor | "INITIAL";

// TODO: Revisar si se usa o no...
export interface ICoordinate {
  x: number;
  y: number;
}

export interface IMatrix {
  row: number;
  col: number;
}
