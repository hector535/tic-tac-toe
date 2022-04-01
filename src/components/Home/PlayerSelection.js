import MarkSelection from "./MarkSelection";
import classes from "./PlayerSelection.module.css";

const PlayerSelection = () => {
  return (
    <div className={classes["container"]}>
      <h1 className={classes["title"]}>Pick player 1's mark</h1>
      <MarkSelection />
      <p className={classes["info"]}>Remember : X goes first</p>
    </div>
  );
};

export default PlayerSelection;
