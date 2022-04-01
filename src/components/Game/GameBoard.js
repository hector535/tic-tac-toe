import { useState, useContext, useEffect } from "react";
import GameContext from "../../store/game-context";
import { MARK, BOARD_STATUS, GAME_MODE, PLAYER } from "../../utils/constants";
import {
  renderBoard,
  generateBoard,
  getBoardStatus,
  highlightWinnerCells,
  getCellIdToPlay,
} from "../../utils/game-board";
import classes from "./GameBoard.module.css";

const GameBoard = (props) => {
  const [board, setBoard] = useState([]);
  const [passTurn, setPassTurn] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const {
    players,
    mode,
    turn: currentTurn,
    nextRound,
    scoreboardReset,
    setTurn,
    setScoreboard,
    setNextRound,
    setWinner,
    setScoreboardReset,
  } = useContext(GameContext);

  const { status, mark: winnerMark, indexes } = getBoardStatus(board);
  const { WINNER, TIE } = BOARD_STATUS;

  const setMarkHandler = (cell) => {
    const updatedBoard = [...board];
    const cellIndex = board.findIndex((el) => el.id === cell.id);
    const updatedCell = { ...board[cellIndex] };

    if (currentTurn === MARK.X) {
      updatedCell.mark = MARK.X;
    } else {
      updatedCell.mark = MARK.O;
    }

    updatedBoard[cellIndex] = updatedCell;

    setBoard(updatedBoard);
    setPassTurn(true);
  };

  const setHighlightedMark = (cell) => {
    const updatedBoard = [...board];
    const cellIndex = board.findIndex((el) => el.id === cell.id);
    const updatedCell = { ...board[cellIndex] };

    updatedCell.isHover = true;

    updatedBoard[cellIndex] = updatedCell;

    setBoard(updatedBoard);
  };
  const removeHighlightedMark = (cell) => {
    const updatedBoard = [...board];
    const cellIndex = board.findIndex((el) => el.id === cell.id);
    const updatedCell = { ...board[cellIndex] };

    updatedCell.isHover = false;

    updatedBoard[cellIndex] = updatedCell;

    setBoard(updatedBoard);
  };

  let renderedBoard = [];

  if (board.length > 0) {
    renderedBoard = renderBoard(
      board,
      isGameFinished,
      currentTurn,
      setMarkHandler,
      setHighlightedMark,
      removeHighlightedMark
    );

    if (mode === GAME_MODE.SOLO) {
      const cpuMark = players.find((pl) => pl.name === PLAYER.CPU).mark;

      if (cpuMark === currentTurn && !passTurn && !isGameFinished) {
        const availableCells = board
          .filter((c) => c.mark === null)
          .map((c) => c.id);
        const cellId = getCellIdToPlay(availableCells);
        const cell = board.find((c) => c.id === cellId);
        setMarkHandler(cell);
      }
    }
  }

  if (scoreboardReset && !isGameFinished) {
    setBoard(generateBoard(classes["cell"], classes["icon"]));
    setIsGameFinished(true);
  }

  if (nextRound && isGameFinished) {
    setBoard(generateBoard(classes["cell"], classes["icon"]));
    setIsGameFinished(false);
  }

  useEffect(() => {
    setBoard(generateBoard(classes["cell"], classes["icon"]));
  }, []);

  const { X, O } = MARK;
  useEffect(() => {
    const nextTurn = currentTurn === X ? O : X;
    if (passTurn) {
      setTurn(nextTurn);
      setPassTurn(false);
    }
  }, [passTurn, setTurn, setPassTurn, currentTurn, X, O]);

  useEffect(() => {
    if (scoreboardReset) {
      setScoreboardReset(false);
      setIsGameFinished(false);
    }
  }, [scoreboardReset, setScoreboardReset, setIsGameFinished]);

  useEffect(() => {
    if (nextRound) {
      setNextRound(false);
    }
  }, [nextRound, setNextRound]);

  useEffect(() => {
    if (status === WINNER || status === TIE) {
      setScoreboard(winnerMark);
      setWinner(winnerMark);
    }
  }, [status, WINNER, TIE, winnerMark, setScoreboard, setWinner]);

  if (!isGameFinished) {
    if (status === WINNER || status === TIE) {
      const updatedBoard = highlightWinnerCells(board, winnerMark, indexes, {
        cellBlue: classes["cell--light-blue"],
        cellYellow: classes["cell--light-yellow"],
        iconNavy: classes["icon--semi-dark-navy"],
      });
      setBoard(updatedBoard);
      setIsGameFinished(true);
    }
  }

  return <main className={classes["game-board"]}>{renderedBoard}</main>;
};

export default GameBoard;
