import { useContext } from "react";
import GameContext from "../../store/game-context";
import { ReactComponent as XIcon } from "../../assets/icon-x.svg";
import { ReactComponent as OIcon } from "../../assets/icon-o.svg";
import { GAME_MODE, MARK, PLAYER } from "../../utils/constants";
import classes from "./GameFinishMessage.module.css";

const GameFinishMessage = (props) => {
  const { mode, players, winner, clear, setNextRound } =
    useContext(GameContext);

  let title = "";
  let iconToDisplay = null;
  let cssContent = classes["content"];

  const quitHandler = () => {
    clear();
  };

  const nextRoundHandler = () => {
    setNextRound(true);
  };

  if (winner !== MARK.T) {
    if (mode === GAME_MODE.SOLO) {
      const winnerName = players.find((player) => player.mark === winner).name;

      if (winnerName === PLAYER.CPU) {
        title = "Oh no, you lost...";
      } else {
        title = "You won!";
      }
    } else {
      const winnerName = players.find((player) => player.mark === winner).name;

      if (winnerName === PLAYER.P1) {
        title = "Player 1 wins!";
      } else {
        title = "Player 2 wins!";
      }
    }
  }

  if (winner === MARK.T) {
    cssContent += " " + classes["content--silver"];
  } else if (winner === MARK.X) {
    iconToDisplay = <XIcon viewBox="0 0 64 64" className={classes["icon"]} />;
    cssContent += " " + classes["content--blue"];
  } else {
    iconToDisplay = <OIcon viewBox="0 0 64 64" className={classes["icon"]} />;
    cssContent += " " + classes["content--yellow"];
  }

  return (
    <div className={classes["container"]}>
      <h2 className={classes["title"]}>{title}</h2>
      <div className={cssContent}>
        {winner !== MARK.T && iconToDisplay}
        <span className={classes["text-content"]}>
          {winner !== MARK.T ? "Takes the round" : "ROUND TIED"}
        </span>
      </div>

      <button
        className={`${classes["btn"]} ${classes["btn--silver"]}`}
        onClick={quitHandler}
      >
        Quit
      </button>
      <button
        className={`${classes["btn"]} ${classes["btn--yellow"]}`}
        onClick={nextRoundHandler}
      >
        Next Round
      </button>
    </div>
  );
};

export default GameFinishMessage;
