import { useState, useContext } from "react";
import GameContext from "../../store/game-context";
import { ReactComponent as XOutline } from "../../assets/icon-x-outline.svg";
import { ReactComponent as OOutline } from "../../assets/icon-o-outline.svg";
import { PLAYER, MARK } from "../../utils/constants";
import classes from "./MarkSelection.module.css";

const MarkSelection = () => {
  const [markSelected, setMarkSelected] = useState(MARK.O);
  const { selectMark } = useContext(GameContext);
  let xButtonClasses = classes["btn"];
  let xIconClasses = classes["icon"];
  let oButtonClasses = classes["btn"];
  let oIconClasses = classes["icon"];

  if (markSelected === MARK.X) {
    xButtonClasses += " " + classes["btn--active"];
    xIconClasses += " " + classes["icon--dark-navy"];
    oIconClasses += " " + classes["icon--silver"];
  } else {
    oButtonClasses += " " + classes["btn--active"];
    oIconClasses += " " + classes["icon--dark-navy"];
    xIconClasses += " " + classes["icon--silver"];
  }

  const selectMarkHandler = (mark) => {
    setMarkSelected(mark);
    selectMark(PLAYER.P1, mark);
  };

  return (
    <div className={classes["container"]}>
      <button
        className={xButtonClasses}
        onClick={selectMarkHandler.bind(this, MARK.X)}
      >
        <XOutline viewBox="0 0 64 64" className={xIconClasses} />
      </button>
      <button
        className={oButtonClasses}
        onClick={selectMarkHandler.bind(this, MARK.O)}
      >
        <OOutline viewBox="0 0 66 66" className={oIconClasses} />
      </button>
    </div>
  );
};

export default MarkSelection;
