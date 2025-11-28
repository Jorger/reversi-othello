import type { Ikeycell } from "../interfaces";

/**
 * Convierte el key dle objeto de celdas a valores númericos...
 * @param keyCell
 * @returns
 */
export const convertKeyToNumber = (keyCell: Ikeycell) =>
  keyCell.split("-").map(Number);
