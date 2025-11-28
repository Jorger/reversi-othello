import { EBoardColor, ECellPosition, ETypeCell } from "../utils/constants";
import { PlayerId, RuneClient, Player as PlayerRune } from "rune-sdk";

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

/**
 * Listado de tipos...
 */
export type TBoardColor = keyof typeof EBoardColor;
export type TTypeCell = keyof typeof ETypeCell;
export type TCellPosition = keyof typeof ECellPosition;
export type IBackgroud = TBoardColor | "INITIAL";
export type Ikeycell = `${number}-${number}`;
export type TDataCell = Record<Ikeycell, IDataCell>;
export type TOpositeBoardColor = Record<TBoardColor, TBoardColor>;
export type TNextCell = Record<TCellPosition, IMatrix>;

export type GameActions = {
  onSelectCell: (cellPosition: IMatrix) => void;
};

/**
 * Listado de interfaces...
 */
export interface IMatrix {
  row: number;
  col: number;
}

export interface IDataCell {
  type: TTypeCell;
  color: TBoardColor;
  isAnimate: boolean;
  captureDiscs: Ikeycell[];
}

// Para el player del game state...
export interface Player {
  playerID: PlayerId;
  color: TBoardColor;
  score: number;
}

export interface GameState {
  playerIds: PlayerId[];
  players: Player[];
  turnID: PlayerId;
  isGameOver: boolean;
  cells: TDataCell;
}

export interface IUInteractions {
  /**
   * Muestra el contador inicial del juego...
   */
  showCounter: boolean;
  /**
   * Bloquea el UI hasta que exista una nueva acción...
   */
  disableUI: boolean;
  /**
   * Inicia el tiempo restante para que un jugador haga su movimiento...
   */
  startTimer: boolean;

  /**
   * Valida si activa el efecto para esperar la animación de flip...
   */
  waitEffect: boolean;

  /**
   * Para saber si es el game over...
   */
  isGameOver: boolean;
}

export interface PlayerScore extends PlayerRune {
  score: number;
  color: TBoardColor;
}
