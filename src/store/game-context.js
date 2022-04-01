import React from "react";
import { MARK } from "../utils/constants";

const GameContext = React.createContext({
  players: [],
  mode: null,
  turn: MARK.X,
  winner: null,
  resetMessage: false,
  scoreboardReset: false,
  nextRound: false,
  scoreboard: {
    x: 0,
    o: 0,
    ties: 0,
  },
  selectMark: () => {},
  selectMode: () => {},
  setTurn: () => {},
  setScoreboard: () => {},
  setScoreboardReset: () => {},
  setResetMessage: () => {},
  setWinner: () => {},
  setNextRound: () => {},
  clear: () => {},
});

export default GameContext;
