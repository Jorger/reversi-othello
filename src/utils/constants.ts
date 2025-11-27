export const BASE_WIDTH = 412;
export const BASE_HEIGHT = 732;
export const BASE_CLASS_NAME_GAME = "game";
export const SIZE_GRID = Math.round(BASE_WIDTH * 0.9);
export const TOTAL_CELLS = 8;
export const GAP_GRID = 0.28;
export const SIZE_CELL = Math.round(SIZE_GRID / TOTAL_CELLS) + GAP_GRID;
export const BORDER_SIZE_GRID = 2;

export enum EBoardColor {
  BLUE = "BLUE",
  RED = "RED",
}

export const JS_CSS_VARIABLES: Record<string, number> = {
  BASE_WIDTH,
  BASE_HEIGHT,
  SIZE_GRID,
  SIZE_CELL,
  BORDER_SIZE_GRID,
  GAP_GRID,
};
