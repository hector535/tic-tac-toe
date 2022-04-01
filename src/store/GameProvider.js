import { useReducer, useCallback } from "react";
import GameContext from "./game-context";
import { MARK } from "../utils/constants";

const initialGameState = {
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
};

const gameReducer = (state, action) => {
  if (action.type === "SELECT_MARK") {
    const { player, mark } = action.payload;
    const updatedPlayers = [...state.players];
    const playerIndex = updatedPlayers.findIndex((pl) => pl.name === player);

    if (playerIndex !== -1) {
      const updatedPlayer = { ...updatedPlayers[playerIndex] };
      updatedPlayer.mark = mark;
      updatedPlayers[playerIndex] = updatedPlayer;
    } else {
      updatedPlayers.push({ name: player, mark: mark });
    }

    return {
      ...state,
      scoreboard: { ...state.scoreboard },
      players: updatedPlayers,
    };
  }
  if (action.type === "SELECT_MODE") {
    return {
      ...state,
      scoreboard: { ...state.scoreboard },
      mode: action.payload,
    };
  }
  if (action.type === "SET_TURN") {
    return {
      ...state,
      scoreboard: { ...state.scoreboard },
      turn: action.payload,
    };
  }
  if (action.type === "SET_SCOREBOARD") {
    const scoreboard = { ...state.scoreboard };
    const mark = action.payload;

    if (mark === MARK.X) {
      scoreboard.x += 1;
    } else if (mark === MARK.O) {
      scoreboard.o += 1;
    } else {
      scoreboard.ties += 1;
    }

    return {
      ...state,
      scoreboard: scoreboard,
    };
  }
  if (action.type === "SET_WINNER") {
    return {
      ...state,
      scoreboard: { ...state.scoreboard },
      winner: action.payload,
    };
  }
  if (action.type === "SET_RESET_MESSAGE") {
    return {
      ...state,
      scoreboard: { ...state.scoreboard },
      resetMessage: action.payload,
    };
  }
  if (action.type === "SET_SCOREBOARD_RESET") {
    return {
      ...state,
      scoreboardReset: action.payload,
      scoreboard: { x: 0, ties: 0, o: 0 },
    };
  }
  if (action.type === "SET_NEXT_ROUND") {
    return {
      ...state,
      scoreboard: { ...state.scoreboard },
      winner: null,
      nextRound: action.payload,
    };
  }
  if (action.type === "CLEAR") {
    return initialGameState;
  }

  return initialGameState;
};

const GameProvider = (props) => {
  const [gameState, dispatchGameAction] = useReducer(
    gameReducer,
    initialGameState
  );

  const selectMark = (player, mark) => {
    dispatchGameAction({ type: "SELECT_MARK", payload: { player, mark } });
  };

  const selectMode = (mode) => {
    dispatchGameAction({ type: "SELECT_MODE", payload: mode });
  };

  const setTurn = useCallback(
    (turn) => {
      dispatchGameAction({ type: "SET_TURN", payload: turn });
    },
    [dispatchGameAction]
  );

  const setScoreboard = useCallback(
    (mark) => {
      dispatchGameAction({ type: "SET_SCOREBOARD", payload: mark });
    },
    [dispatchGameAction]
  );

  const setWinner = useCallback(
    (winner) => {
      dispatchGameAction({ type: "SET_WINNER", payload: winner });
    },
    [dispatchGameAction]
  );

  const setResetMessage = (toggleMessage) => {
    dispatchGameAction({
      type: "SET_RESET_MESSAGE",
      payload: toggleMessage,
    });
  };

  const setScoreboardReset = useCallback(
    (flag) => {
      dispatchGameAction({ type: "SET_SCOREBOARD_RESET", payload: flag });
    },
    [dispatchGameAction]
  );

  const setNextRound = useCallback(
    (flag) => {
      dispatchGameAction({ type: "SET_NEXT_ROUND", payload: flag });
    },
    [dispatchGameAction]
  );

  const clear = () => {
    dispatchGameAction({ type: "CLEAR" });
  };

  const contextObj = {
    players: gameState.players,
    mode: gameState.mode,
    turn: gameState.turn,
    winner: gameState.winner,
    scoreboardReset: gameState.scoreboardReset,
    resetMessage: gameState.resetMessage,
    scoreboard: gameState.scoreboard,
    nextRound: gameState.nextRound,
    selectMark: selectMark,
    selectMode: selectMode,
    setTurn: setTurn,
    setScoreboard: setScoreboard,
    setResetMessage: setResetMessage,
    setScoreboardReset: setScoreboardReset,
    setNextRound: setNextRound,
    setWinner: setWinner,
    clear: clear,
  };

  return (
    <GameContext.Provider value={contextObj}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameProvider;
