import React, { useContext } from "react";
import GameContext from "../../store/game-context";
import PlayerSelection from "./PlayerSelection";
import { ReactComponent as GameLogo } from "../../assets/logo.svg";
import { PLAYER, MARK, GAME_MODE } from "../../utils/constants";
import classes from "./HomeScreen.module.css";

const HomeScreen = () => {
  const { players, selectMark, selectMode } = useContext(GameContext);

  const selectModeHandler = (mode) => {
    const didFirstPlayerSelect = players.length > 0;
    let secondPlayerMark = "";

    if (didFirstPlayerSelect) {
      const firstPlayerMark = players[0].mark;
      secondPlayerMark = firstPlayerMark === MARK.X ? MARK.O : MARK.X;
    } else {
      selectMark(PLAYER.P1, MARK.O);
      secondPlayerMark = MARK.X;
    }

    if (mode === GAME_MODE.SOLO) {
      selectMark(PLAYER.CPU, secondPlayerMark);
    } else {
      selectMark(PLAYER.P2, secondPlayerMark);
    }

    selectMode(mode);
  };

  return (
    <section className={classes["home-screen"]}>
      <div className={classes["container"]}>
        <GameLogo className={classes["logo"]} />
        <PlayerSelection />
        <button
          className={`${classes["btn"]} ${classes["btn--yellow"]}`}
          onClick={selectModeHandler.bind(this, GAME_MODE.SOLO)}
        >
          New game (vs cpu)
        </button>
        <button
          className={`${classes["btn"]} ${classes["btn--blue"]}`}
          onClick={selectModeHandler.bind(this, GAME_MODE.MULTIPLAYER)}
        >
          New game (vs player)
        </button>
      </div>
    </section>
  );
};

export default HomeScreen;
