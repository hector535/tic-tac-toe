import { useContext } from "react";
import GameContext from "../../store/game-context";
import { ReactComponent as GameLogo } from "../../assets/logo.svg";
import { ReactComponent as XIcon } from "../../assets/icon-x-outline.svg";
import { ReactComponent as OIcon } from "../../assets/icon-o-outline.svg";
import { ReactComponent as RestartIcon } from "../../assets/icon-restart.svg";
import { MARK } from "../../utils/constants";
import classes from "./GameHeader.module.css";

const iconProperties = {
  viewBox: "0 0 64 64",
  className: classes["icon"],
};

const GameHeader = (props) => {
  const { turn: currentTurn, setResetMessage } = useContext(GameContext);

  const resetHandler = () => {
    setResetMessage(true);
  };

  const iconToDisplay =
    currentTurn === MARK.X ? (
      <XIcon {...iconProperties} />
    ) : (
      <OIcon {...iconProperties} />
    );
  return (
    <header className={classes["header"]}>
      <GameLogo className={classes["logo"]} />
      <div className={classes["turn-displayer"]}>
        {iconToDisplay}
        <span className={classes["turn-displayer-text"]}>turn</span>
      </div>

      <div className={classes["btn-container"]}>
        <button className={classes["btn-reset"]} onClick={resetHandler}>
          <RestartIcon viewBox="0 0 20 20" className={classes["reset-icon"]} />
        </button>
      </div>
    </header>
  );
};

export default GameHeader;
