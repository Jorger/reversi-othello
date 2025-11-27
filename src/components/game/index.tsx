import { GameState } from "../../logic";
import { PlayerId } from "rune-sdk";
import { useEffect, useState } from "react";
import { GridCell, GameWrapper, Grid, Disc } from "./components";
// import { TBoardColor } from "../../interfaces";
// Indicator

const Game = () => {
  const [game, setGame] = useState<GameState>();
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>();

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, yourPlayerId }) => {
        setGame(game);
        setYourPlayerId(yourPlayerId);

        console.log(game);
      },
    });
  }, []);

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return;
  }

  console.log(yourPlayerId);

  // const testColor: TBoardColor = "BLUE";

  return (
    <GameWrapper>
      <Grid>
        {/* <GridCell position={{ col: 0, row: 0 }}>
          <Indicator
            position={{ col: 0, row: 0 }}
            onClick={(data) => console.log(data)}
          />
        </GridCell>
        <GridCell position={{ col: 6, row: 7 }}>
          <Indicator
            position={{ col: 6, row: 7 }}
            onClick={(data) => console.log(data)}
          />
        </GridCell> */}
        <GridCell position={{ col: 3, row: 3 }}>
          <Disc color="RED" key={2} />
        </GridCell>
        <GridCell position={{ col: 4, row: 3 }}>
          <Disc color="BLUE" />
        </GridCell>
        <GridCell position={{ col: 3, row: 4 }}>
          <Disc color="BLUE" />
        </GridCell>
        <GridCell position={{ col: 4, row: 4 }}>
          <Disc color="RED" />
        </GridCell>
      </Grid>
    </GameWrapper>
  );
};

export default Game;
