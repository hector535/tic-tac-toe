import { useContext } from "react";
import GameContext from "../../store/game-context";
import ScorePanel from "./ScorePanel";
import { MARK } from "../../utils/constants";
import classes from "./ScoreBoard.module.css";
const ScoreBoard = () => {
  const { players, scoreboard } = useContext(GameContext);
  let xPlayerName = players.find((player) => player.mark === MARK.X).name;
  let oPlayerName = players.find((player) => player.mark === MARK.O).name;

  return (
    <div className={classes["score-board"]}>
      <ScorePanel
        color="blue"
        playerName={`x (${xPlayerName})`}
        score={scoreboard.x}
      />
      <ScorePanel color="silver" playerName="Ties" score={scoreboard.ties} />
      <ScorePanel
        color="yellow"
        playerName={`o (${oPlayerName})`}
        score={scoreboard.o}
      />
    </div>
  );
};

export default ScoreBoard;
