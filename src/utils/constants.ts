import type {
  IUInteractions,
  TCellPosition,
  TNextCell,
  TOpositeBoardColor,
} from "../interfaces";

export const BASE_WIDTH = 412;
export const BASE_HEIGHT = 732;
export const BASE_CLASS_NAME_GAME = "game";
export const SIZE_GRID = Math.round(BASE_WIDTH * 0.9);
export const TOTAL_CELLS = 8;
export const TOTAL_CELLS_BOARD = TOTAL_CELLS ** 2;
export const GAP_GRID = 0.28;
export const SIZE_CELL = Math.round(SIZE_GRID / TOTAL_CELLS) + GAP_GRID;
export const BORDER_SIZE_GRID = 2;
export const FLIP_TIME = 1000;
export const DELAY_FLIP_TIME = Math.round(FLIP_TIME * 0.3);

export const TIME_COUNTDOWN = 500;
export const TIME_INTERVAL_CHRONOMETER = 100; // 100;

export enum EBoardColor {
  BLUE = "BLUE",
  RED = "RED",
}

export enum ETypeCell {
  INDICATOR = "INDICATOR",
  DISC = "DISC",
}

export enum GAME_ACTION_NAME {
  StateSync = "stateSync",
  OnSelectCell = "onSelectCell",
}

export enum ECellPosition {
  TOP_LEFT = "TOP_LEFT",
  TOP = "TOP",
  TOP_RIGHT = "TOP_RIGHT",
  RIGHT = "RIGHT",
  BOTTOM_RIGHT = "BOTTOM_RIGHT",
  BOTTOM = "BOTTOM",
  BOTTOM_LEFT = "BOTTOM_LEFT",
  LEFT = "LEFT",
}

export const JS_CSS_VARIABLES: Record<string, number> = {
  BASE_WIDTH,
  BASE_HEIGHT,
  SIZE_GRID,
  SIZE_CELL,
  BORDER_SIZE_GRID,
  GAP_GRID,
  FLIP_TIME,
  DELAY_FLIP_TIME,
};

export const OPOSITE_BOARD_COLOR: TOpositeBoardColor = {
  [EBoardColor.BLUE]: EBoardColor.RED,
  [EBoardColor.RED]: EBoardColor.BLUE,
};

export const INITIAL_UI_INTERACTIONS: IUInteractions = {
  showCounter: true,
  disableUI: false,
  startTimer: false,
  waitEffect: false,
  isGameOver: false,
};

export const NEXT_CELL_POSITION: TNextCell = {
  [ECellPosition.TOP_LEFT]: { row: -1, col: -1 },
  [ECellPosition.TOP]: { row: -1, col: 0 },
  [ECellPosition.TOP_RIGHT]: { row: -1, col: 1 },
  [ECellPosition.RIGHT]: { row: 0, col: 1 },
  [ECellPosition.BOTTOM_RIGHT]: { row: 1, col: 1 },
  [ECellPosition.BOTTOM]: { row: 1, col: 0 },
  [ECellPosition.BOTTOM_LEFT]: { row: 1, col: -1 },
  [ECellPosition.LEFT]: { row: 0, col: -1 },
};

export const NEXT_CELL_INDEX: TCellPosition[] = [
  ECellPosition.TOP_LEFT,
  ECellPosition.TOP,
  ECellPosition.TOP_RIGHT,
  ECellPosition.RIGHT,
  ECellPosition.BOTTOM_RIGHT,
  ECellPosition.BOTTOM,
  ECellPosition.BOTTOM_LEFT,
  ECellPosition.LEFT,
];

export const LABELS = {
  PERCENTAGE: "100",
  GO: "GO!",
  YOUR_TURN: "Your turn",
  OPPONENT_THINKS: "Opponent thinks",
};

export enum ESounds {
  COUNTER = "COUNTER",
  WHISTLE = "WHISTLE",
  GAME_OVER = "GAME_OVER",
  FLIP = "FLIP",
}
