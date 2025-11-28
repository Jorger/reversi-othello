import { cellPositionInRage } from "../../utils/indexInRange";
import { getCurrentColor, getRandomCellPosition } from "./helpers";
import { PlayerId } from "rune-sdk";
import { useCallback, useEffect, useState } from "react";
import { useWait } from "../../hooks";
import {
  DELAY_FLIP_TIME,
  GAME_ACTION_NAME,
  INITIAL_UI_INTERACTIONS,
} from "../../utils/constants";
import {
  GameWrapper,
  Grid,
  GridCells,
  OpponentThinks,
  Score,
  ShowTurn,
  StartCounter,
} from "./components";
import type {
  GameState,
  IMatrix,
  IUInteractions,
  TBoardColor,
} from "../../interfaces";

const Game = () => {
  /**
   * Guarda el estado del juego que proviene del server...
   */
  const [game, setGame] = useState<GameState>();

  /**
   * Guarda el ID del usuario en cada sesión...
   */
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>();

  /**
   * Guarda los estados de las interacciones de la UI...
   */
  const [uiInteractions, setUiInteractions] = useState<IUInteractions>(
    INITIAL_UI_INTERACTIONS
  );

  /**
   * Se cálcula el ID del usuario que tien el turno
   */
  const turnID = game?.turnID || "";

  /**
   * Se indica si el usuario tiene el turno...
   */
  const hasTurn = yourPlayerId === turnID;

  /**
   * Determinar si el juego ha terminado...
   */
  const isGameOver = game?.isGameOver || false;

  /**
   * Obtener el listado de jugadores...
   */
  const players = game?.players || [];

  /**
   * Extraer la información que se require de la interacción del UI
   */
  const { disableUI, showCounter, startTimer, waitEffect } = uiInteractions;

  /**
   * Si se muestra el mensaje del turno...
   */
  const showMessage = !showCounter && hasTurn;

  /**
   * Bloquea el UI, para prevenir cualquier acción por parte del usuario...
   */
  const isDisableUI = disableUI || !hasTurn || isGameOver;

  /**
   * Si se muestra el componente que indica que el oponenente está pensando...
   */
  const showOpponentThinks = !showCounter && !hasTurn && startTimer;

  /**
   * Se ontiene el color del board dependiendo del turno...
   */
  const currentColor = showCounter
    ? "INITIAL"
    : getCurrentColor(turnID, players);

  /**
   * Valida si se muestran los indicadores en el board...
   */
  const showIndicators = !isDisableUI && !showCounter && !isGameOver;

  /**
   * Efecto para configurar el SDK de Rune
   */
  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId, event }) => {
        /**
         * Determina si se ha reiniciado el juego
         */
        const isNewGame = (event?.name || "") === GAME_ACTION_NAME.StateSync;

        /**
         * Se guarda el estado del juego que proviene del servicio...
         */
        setGame(game);

        /**
         * Indica que es el evento inicial cuando inicia el juego
         */
        if (!action) {
          /**
           * Se guarda el id del player de la sesión actual...
           */
          setYourPlayerId(yourPlayerId);
        }

        /**
         * Si es un nuevo juego, se reinician los estados del juego y de las interacciones
         */
        if (isNewGame) {
          setUiInteractions(INITIAL_UI_INTERACTIONS);
        }

        /**
         * Actión que indica que se ha seleccionado una celda...
         */
        if (action?.name === GAME_ACTION_NAME.OnSelectCell) {
          /**
           * Se bloquea el UI y se pasa la validación de game over...
           */
          setUiInteractions((current) => {
            return {
              ...current,
              disableUI: true,
              startTimer: false,
              waitEffect: true,
              isGameOver: game.isGameOver,
            };
          });
        }
      },
    });
  }, []);

  /**
   * Función que se ejcuta cuando el counter inicial ha terminado...
   */
  const handleEndStartCounter = useCallback(() => {
    setUiInteractions({
      ...INITIAL_UI_INTERACTIONS,
      showCounter: false,
      startTimer: true,
    });
  }, []);

  /**
   * Función que se ejecuta cuando se selecciona una celda...
   * @param cellPosition
   */
  const handleClickCell = (cellPosition: IMatrix) => {
    if (!isDisableUI && cellPositionInRage(cellPosition)) {
      /**
       * Se emite al data al server...
       */
      Rune.actions.onSelectCell(cellPosition);

      /**
       * Se bloquea el UI y se detiene el timer de turno...
       */
      setUiInteractions((current) => {
        return {
          ...current,
          disableUI: true,
          startTimer: false,
        };
      });
    }
  };

  /**
   * Se termina el tiempo del turno...
   */
  const handleInterval = () => {
    if (hasTurn && !isGameOver && game?.cells) {
      const cellPosition = getRandomCellPosition(game.cells);

      if (cellPositionInRage(cellPosition)) {
        handleClickCell(cellPosition);
      }
    }
  };

  /**
   * Para habilitar el UI, una vez se ha hecho un lanzamiento...
   */
  const handleEnabledUI = useCallback(() => {
    setUiInteractions((current) => {
      if (current.isGameOver) {
        // playSound(ESounds.GAME_OVER);
        Rune.showGameOverPopUp();
      }

      return {
        ...current,
        disableUI: current.isGameOver,
        startTimer: !current.isGameOver,
        waitEffect: false,
      };
    });
  }, []);

  /**
   * Interrupción para habilitar el UI...
   */
  useWait(waitEffect, DELAY_FLIP_TIME, handleEnabledUI);

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return;
  }

  return (
    <GameWrapper disableUI={isDisableUI} currentColor={currentColor}>
      {showCounter && (
        <StartCounter handleEndStartCounter={handleEndStartCounter} />
      )}
      <Score
        players={players}
        yourPlayerId={yourPlayerId || ""}
        turnID={turnID}
        hasTurn={hasTurn}
        startTimer={startTimer && !isGameOver}
        currentColor={currentColor}
        handleInterval={handleInterval}
      />
      {showOpponentThinks && (
        <OpponentThinks currentColor={currentColor as TBoardColor} />
      )}
      <Grid>
        <GridCells
          showIndicators={showIndicators}
          cells={game.cells}
          onClick={handleClickCell}
        />
      </Grid>
      {showMessage && <ShowTurn currentColor={currentColor as TBoardColor} />}
    </GameWrapper>
  );
};

export default Game;
