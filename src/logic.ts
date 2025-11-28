import { cellPositionInRage } from "./utils/indexInRange";
import { convertKeyToNumber } from "./utils/convertKeyToNumber";
import { getIndicators } from "./utils/getIndicators";
import { PlayerId } from "rune-sdk";
import { randomNumber } from "./utils/randomNumber";
import {
  EBoardColor,
  ETypeCell,
  NEXT_CELL_INDEX,
  NEXT_CELL_POSITION,
  OPOSITE_BOARD_COLOR,
  TOTAL_CELLS_BOARD,
} from "./utils/constants";
import type {
  GameState,
  Ikeycell,
  Player,
  TBoardColor,
  TCellPosition,
  TDataCell,
} from "./interfaces";

/**
 * Devuelve la información del jugador que ha hecho alguna acción...
 * @param game
 * @param playerId
 * @param allPlayerIds
 * @returns
 */
const getCurretPlayer = (players: Player[], playerId: PlayerId) => {
  const currentIndex = players.findIndex((v) => v.playerID === playerId);

  if (currentIndex < 0) {
    throw Rune.invalidAction();
  }

  return currentIndex;
};

/**
 * Busca aquellos discos que tengan el mismo color...
 * @param color
 * @param cells
 * @returns
 */
const getDiscsByColor = (baseColor: TBoardColor, cells: TDataCell) =>
  Object.keys(cells).filter((key) => {
    const { color, type } = cells[key as Ikeycell];

    return type === ETypeCell.DISC && color === baseColor;
  }) as Ikeycell[];

interface ValidateCellsByDisc {
  disc: Ikeycell;
  cellPosition: TCellPosition;
  opositeColor: TBoardColor;
  cells: TDataCell;
}

/**
 * Valida cada celda, dependiendo de su posición...
 * @param disc
 * @param opositeColor
 * @param cells
 */
const validateCellsByDisc = ({
  disc,
  cellPosition,
  opositeColor,
  cells,
}: ValidateCellsByDisc) => {
  /**
   * Guarda el listado de discos capturados...
   */
  const captureDiscs: Ikeycell[] = [];

  /**
   * Obtener el valor de fila y columna...
   */
  let [col, row] = convertKeyToNumber(disc);

  /**
   * Se obtiene el valor del incremento...
   */
  const { col: dx, row: dy } = NEXT_CELL_POSITION[cellPosition];

  /**
   * Se itera para validar que celdas derían validas...
   */
  while (true) {
    /**
     * Se obtiene la posición de la celda a evaluar...
     */
    col += dx;
    row += dy;

    /**
     * Valida si la coordenada está en el rango de la grilla...
     */
    if (!cellPositionInRage({ row, col })) {
      return { indicator: null, captureDiscs: [] };
    }

    /**
     * El key para cells...
     */
    const key: Ikeycell = `${col}-${row}`;

    /**
     * Se obtiene la celda en el key dado...
     */
    const cell = cells[key];

    /**
     * Saber si la celda existe...
     */
    if (cell) {
      // Si la celda es del color opuesto, se captura
      if (cell.color === opositeColor) {
        captureDiscs.push(key);
      } else {
        /**
         * Si es un indicador, se indica que es válido y se devuevel los valores
         * que tuviera...
         */
        if (cell.type === ETypeCell.INDICATOR) {
          return { indicator: key, captureDiscs };
        }

        // Es una pieza propia → no se puede capturar nada
        return { indicator: null, captureDiscs: [] };
      }
    } else {
      // Celda vacía
      const indicator = captureDiscs.length > 0 ? key : null;
      return { indicator, captureDiscs };
    }
  }
};

/**
 * Función que deja valores de lso discos únicos...
 * @param captureDiscs
 * @param newCaptureDiscs
 * @returns
 */
const getUniqueCaptureDiscs = (
  captureDiscs: Ikeycell[],
  newCaptureDiscs: Ikeycell[]
) => [...new Set([...captureDiscs, ...newCaptureDiscs])];

/**
 * Valida la captura de discos deopendiendo del color...
 * @param disc
 * @param baseColor
 * @param opositeColor
 * @param cells
 */
const getCaptureDiscs = (
  disc: Ikeycell,
  baseColor: TBoardColor,
  opositeColor: TBoardColor,
  cells: TDataCell
) => {
  /**
   * Iterar todas las posibles posiciones de la celdas...
   */
  for (const cellPosition of NEXT_CELL_INDEX) {
    const cellsByDisc = validateCellsByDisc({
      disc,
      cellPosition,
      opositeColor,
      cells,
    });

    /**
     * Validar si se ha encontrado algo para ese disco...
     */
    if (cellsByDisc.indicator) {
      /**
       * Validar si ya existe...
       */
      if (cells[cellsByDisc.indicator]) {
        /**
         * Como existe, hay que validar que no existan discos repetidos...
         */
        cells[cellsByDisc.indicator].captureDiscs = getUniqueCaptureDiscs(
          cells[cellsByDisc.indicator].captureDiscs,
          cellsByDisc.captureDiscs
        );
      } else {
        /**
         * Se crea una nueva celda...
         */
        cells[cellsByDisc.indicator] = {
          type: ETypeCell.INDICATOR,
          color: baseColor,
          isAnimate: false,
          captureDiscs: cellsByDisc.captureDiscs,
        };
      }
    }
  }
};

/**
 * Busca los indicadores para seleccionar la celda...
 * @param baseColor
 * @param cells
 */
const searchIndicators = (baseColor: TBoardColor, cells: TDataCell) => {
  /**
   * Se obtiebe el listado de discos a evaluar...
   */
  const cellsWithDisc = getDiscsByColor(baseColor, cells);

  /**
   * El color opuesto al disco que se evalúa...
   */
  const opositeColor = OPOSITE_BOARD_COLOR[baseColor];

  /**
   * Se iteran las celdas con los discos...
   */
  for (const disc of cellsWithDisc) {
    getCaptureDiscs(disc, baseColor, opositeColor, cells);
  }
};

/**
 * Genera los discos base del juego...
 * @param baseColor
 * @returns
 */
const getBaseDiscs = (baseColor: TBoardColor) => {
  const opositeColor = OPOSITE_BOARD_COLOR[baseColor];

  /**
   * Valores base al iniciar el juego...
   */
  const baseCell: TDataCell = {
    "3-3": {
      type: ETypeCell.DISC,
      color: opositeColor,
      isAnimate: false,
      captureDiscs: [],
    },
    "4-3": {
      type: ETypeCell.DISC,
      color: baseColor,
      isAnimate: false,
      captureDiscs: [],
    },
    "3-4": {
      type: ETypeCell.DISC,
      color: baseColor,
      isAnimate: false,
      captureDiscs: [],
    },
    "4-4": {
      type: ETypeCell.DISC,
      color: opositeColor,
      isAnimate: false,
      captureDiscs: [],
    },
  };

  return baseCell;
};

/**
 * Genera la data inicial de cada jugador...
 * @param allPlayerIds
 * @returns
 */
const getPlayerData = (allPlayerIds: string[]): GameState => {
  /**
   * Listado de players..
   */
  const players: Player[] = [];
  /**
   * Determina el color inicial de forma aleatoria...
   */
  const initialColor = randomNumber(0, 1);
  /**
   * Se establecen los colores para cada jugador...
   */
  const colorPlayer1 = initialColor === 0 ? EBoardColor.BLUE : EBoardColor.RED;
  const colorPlayer2 = initialColor === 0 ? EBoardColor.RED : EBoardColor.BLUE;

  /**
   * Se crea la data para los jugadores...
   */
  players.push(
    {
      playerID: allPlayerIds[0],
      color: colorPlayer1,
      score: 0,
    },
    {
      playerID: allPlayerIds[1],
      color: colorPlayer2,
      score: 0,
    }
  );

  /**
   * Se obtiene aleatoriamente el jugador que inicia la partida...
   */
  const turnNumber = randomNumber(0, 1);

  /**
   * Y se guarda el id del usuario que inicia la partida, ya que con este
   * es el que se identifica el jugador no el número obtenido...
   */
  const turnID = allPlayerIds[turnNumber];

  /**
   * Se obtiene el color base del turno inicial, para así determinar
   * el orden de las celdas base...
   */
  const baseColor = players[turnNumber].color;

  /**
   * Se obtiene la información base de las celdas...
   */
  const cells = getBaseDiscs(baseColor);

  /**
   * Se busca los indicadores para las celdas base...
   */
  searchIndicators(baseColor, cells);

  return {
    playerIds: allPlayerIds,
    players,
    turnID,
    isGameOver: false,
    cells,
  };
};

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: (allPlayerIds) => getPlayerData(allPlayerIds),
  actions: {
    onSelectCell: (cellPosition, { game, playerId }) => {
      /**
       * Saber si la posición está en rango...
       */
      if (!cellPositionInRage(cellPosition)) {
        throw Rune.invalidAction();
      }

      /**
       * El key de la celda seleccioanda...
       */
      const keyCell: Ikeycell = `${cellPosition.col}-${cellPosition.row}`;

      /**
       * El indicador que el jugador ha seleccionado...
       */
      const selectedIndicator = game.cells[keyCell];

      /**
       * Validar si la posición dada existe...
       */
      if (!selectedIndicator) {
        throw Rune.invalidAction();
      }

      /**
       * El tipo de celda no es un indicador...
       */
      if (selectedIndicator.type !== ETypeCell.INDICATOR) {
        throw Rune.invalidAction();
      }

      /**
       * Se obtiene el index del usuario que hizo el lanzamiento...
       */
      const currentIndex = getCurretPlayer(game.players, playerId);

      /**
       * El indice del player contrario...
       */
      const oposieIndexPlayer = currentIndex === 0 ? 1 : 0;

      /**
       * Se obtiene el color del jugador que hizo el lanzamiento...
       */
      const colorCurrentPlayer = game.players[currentIndex].color;

      /**
       * Primero se cambia el tipo de celda de indicador a disco...
       */
      game.cells[keyCell].type = ETypeCell.DISC;
      game.cells[keyCell].color = colorCurrentPlayer;

      /**
       * Ahora de los discos capturados cambiarlos de color...
       */
      for (const key of game.cells[keyCell].captureDiscs) {
        if (game.cells[key] && game.cells[key].type === ETypeCell.DISC) {
          game.cells[key].color = colorCurrentPlayer;
          game.cells[key].isAnimate = true;
          game.cells[key].captureDiscs = [];
        }
      }

      /**
       * Se debe limpiar las celdas que se habían capturado...
       */
      game.cells[keyCell].captureDiscs = [];

      /**
       * Ahora se deben limpiar los indicadores que ya no se usan...
       */
      const indicators = getIndicators(game.cells);

      /**
       * Se debe eliminar esos indicadores del board...
       */
      for (const key of indicators) {
        delete game.cells[key];
      }

      /**
       * Calcular el total de celdas ya ocupadas...
       */
      let totalDiscs = 0;

      /**
       * Traer el total de discos por usuario para calcular el score...
       */
      for (let i = 0; i < game.players.length; i++) {
        /**
         * Se obtiene el número de discos por color, de cada jugador...
         */
        const total = getDiscsByColor(game.players[i].color, game.cells).length;

        /**
         * Se actualiza el score para cada jugador...
         */
        game.players[i].score = total;

        /**
         * Incrementar el total de discos en uso...
         */
        totalDiscs += total;
      }

      /**
       * Saber si el board ya está lleno...
       */
      const isFullBoard = totalDiscs === TOTAL_CELLS_BOARD;

      /**
       * Para validar si hay indicadores para el turno actual y
       * para el siguiente turno...
       */
      let hasIndicatorsCurrentTurn = false;
      let hasIndicatorsNexturn = false;

      if (!isFullBoard) {
        /**
         * Ahora se deben buscar las posibles celdas del jugador que tendrá el siguiente turno...
         */
        searchIndicators(game.players[oposieIndexPlayer].color, game.cells);

        /**
         * Se valida si se tiene indicadores para el turno siguiente...
         */
        hasIndicatorsNexturn = getIndicators(game.cells).length !== 0;

        /**
         * Si el siguiente turno no tiene indicadores,
         * se valida si el turno actual tiene indicadores...
         */
        if (!hasIndicatorsNexturn) {
          /**
           * Busca los indicadores para el turno actual...
           */
          searchIndicators(game.players[currentIndex].color, game.cells);

          /**
           * Valida si el turno actual tiene indicadores...
           */
          hasIndicatorsCurrentTurn = getIndicators(game.cells).length !== 0;
        }
      }

      /**
       * Si el board ya está lleno o si no existe indicadores se valida el
       * game over...
       */
      if (isFullBoard || (!hasIndicatorsNexturn && !hasIndicatorsCurrentTurn)) {
        /**
         * Se indica que el juego ha acabado...
         */
        game.isGameOver = true;

        /**
         * Validar si hay un empate...
         */
        const isTie = game.players[0].score === game.players[1].score;

        /**
         * Valida los ganadores...
         */
        const indexWinner =
          game.players[0].score > game.players[1].score ? 0 : 1;

        /**
         * Se determina que jugador es el ganador o el perdedor...
         */
        const winner = game.playerIds[indexWinner];
        const loser = game.playerIds[indexWinner === 0 ? 1 : 0];

        /**
         * Se muestra el mensaje de game over...
         */
        Rune.gameOver({
          players: {
            [winner]: !isTie ? "WON" : "TIE",
            [loser]: !isTie ? "LOST" : "TIE",
          },
          delayPopUp: true,
        });
      } else {
        /**
         * Ahora establecer el nuevo turno, sólo si tiene la opción de indicadores...
         */
        if (hasIndicatorsNexturn) {
          game.turnID = game.players[oposieIndexPlayer].playerID;
        }
      }
    },
  },
});
