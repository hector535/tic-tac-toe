import { useContext } from "react";
import GameContext from "../../store/game-context";
import classes from "./ResetMessage.module.css";

const ResetMessage = () => {
  const { setResetMessage, setScoreboardReset } = useContext(GameContext);

  const cancelHandler = () => {
    setResetMessage(false);
  };
  const restartHandler = () => {
    setScoreboardReset(true);
    setResetMessage(false);
  };

  return (
    <div className={classes["container"]}>
      <h2 className={classes["title"]}>Restart Game?</h2>

      <button
        className={`${classes["btn"]} ${classes["btn--silver"]}`}
        onClick={cancelHandler}
      >
        No, Cancel
      </button>
      <button
        className={`${classes["btn"]} ${classes["btn--yellow"]}`}
        onClick={restartHandler}
      >
        Yes, Restart
      </button>
    </div>
  );
};

export default ResetMessage;
