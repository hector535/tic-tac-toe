import classes from "./ScorePanel.module.css";
const ScorePanel = (props) => {
  return (
    <div className={`${classes["panel"]} ${classes["panel--" + props.color]}`}>
      <span className={classes["title"]}>{props.playerName}</span>
      <span className={classes["score"]}>{props.score}</span>
    </div>
  );
};

export default ScorePanel;
