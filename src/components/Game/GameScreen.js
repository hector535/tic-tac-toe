import { Fragment, useContext } from "react";
import GameContext from "../../store/game-context";
import GameHeader from "./GameHeader";
import GameBoard from "./GameBoard";
import ScoreBoard from "./ScoreBoard";
import ModalOverlay from "../UI/Modal";
import GameFinishMessage from "./GameFinishMessage";
import ResetMessage from "./ResetMessage";

import classes from "./GameScreen.module.css";

const GameScreen = () => {
  const { winner, resetMessage } = useContext(GameContext);
  let modalContent = null;

  if (winner) {
    modalContent = <GameFinishMessage />;
  }

  if (resetMessage) {
    modalContent = <ResetMessage />;
  }

  return (
    <Fragment>
      <section className={classes["game-screen"]}>
        <div className={classes["container"]}>
          <GameHeader />
          <GameBoard />
          <ScoreBoard />
        </div>
      </section>
      {winner && <ModalOverlay>{modalContent}</ModalOverlay>}
      {resetMessage && <ModalOverlay>{modalContent}</ModalOverlay>}
    </Fragment>
  );
};

export default GameScreen;
