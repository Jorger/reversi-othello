import { convertKeyToNumber } from "../../utils/convertKeyToNumber";
import { getIndicators } from "../../utils/getIndicators";
import { PlayerId } from "rune-sdk";
import { randomNumber } from "../../utils/randomNumber";
import type { IBackgroud, IMatrix, Player, TDataCell } from "../../interfaces";

/**
 * Obtener la información del jugador por id
 * @param id
 * @param players
 * @returns
 */
export const getPlayerByID = (id: PlayerId, players: Player[]) =>
  players.find((v) => v.playerID === id);

/**
 * Se obtiene el color del player que tiene el turno...
 * @param id
 * @param players
 * @returns
 */
export const getCurrentColor = (turnID: PlayerId, players: Player[]) => {
  let currentColor: IBackgroud = "INITIAL";

  /**
   * Se obtiene el jugado atual..
   */
  const currentPlayer = getPlayerByID(turnID, players);

  if (currentPlayer) {
    currentColor = currentPlayer.color;
  }

  return currentColor;
};

/**
 * Obtener un valor aleario para una celda..
 * @param cells
 * @returns
 */
export const getRandomCellPosition = (cells: TDataCell): IMatrix => {
  /**
   * Se obtienen los indicadores que se tengan disponibles...
   */
  const indicators = getIndicators(cells);

  /**
   * Total indicadores que se encontrarón...
   */
  const totalIndicators = indicators.length;

  /**
   * No se encontró indicadores en el board...
   */
  if (totalIndicators === 0) {
    return { row: -1, col: -1 };
  }

  /**
   * Indice aleatorio...
   */
  const index = randomNumber(0, totalIndicators - 1);

  /**
   * Valor de la celda...
   */
  const keycell = indicators[index];

  /**
   * Se obtiene el valor númerico de la celda...
   */
  const [col, row] = convertKeyToNumber(keycell);

  return { row, col };
};
