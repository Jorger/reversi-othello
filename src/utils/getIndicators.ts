import { ETypeCell } from "./constants";
import { Ikeycell, TDataCell } from "../interfaces";

/**
 * Devuelve el listado de indicaores que existe en la matriz...
 * @param cells
 * @returns
 */
export const getIndicators = (cells: TDataCell) =>
  Object.keys(cells).filter(
    (key) => cells[key as Ikeycell].type === ETypeCell.INDICATOR
  ) as Ikeycell[];
