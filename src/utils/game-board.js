import { ReactComponent as XIcon } from "../assets/icon-x.svg";
import { ReactComponent as XOutlineIcon } from "../assets/icon-x-outline.svg";
import { ReactComponent as OIcon } from "../assets/icon-o.svg";
import { ReactComponent as OOutlineIcon } from "../assets/icon-o-outline.svg";
import { BOARD_STATUS, MARK } from "./constants";

export const generateBoard = (cssCell, cssIcon) => {
  let cells = [];

  for (let i = 0; i < 9; i++) {
    cells.push({
      id: (i + 1).toString(),
      mark: null,
      isHover: false,
      cssCell: cssCell,
      cssIcon: cssIcon,
      highlight: false,
    });
  }

  return cells;
};

const viewBoxValues = "0 0 64 64";

export const renderBoard = (
  board,
  isGameFinished,
  currentTurn,
  onClickCellFn,
  onMouseEnterFn,
  onMouseLeaveFn
) => {
  const cells = [];

  for (let i = 0; i < board.length; i++) {
    let cell = board[i];
    let cellContent = null;

    if (cell.mark === MARK.X) {
      cellContent = <XIcon viewBox={viewBoxValues} className={cell.cssIcon} />;
    } else if (cell.mark === MARK.O) {
      cellContent = <OIcon viewBox={viewBoxValues} className={cell.cssIcon} />;
    } else if (cell.isHover) {
      if (currentTurn === MARK.X) {
        cellContent = (
          <XOutlineIcon viewBox={viewBoxValues} className={cell.cssIcon} />
        );
      } else {
        cellContent = (
          <OOutlineIcon viewBox="0 0 66 66" className={cell.cssIcon} />
        );
      }
    }

    cells.push(
      <button
        key={cell.id}
        className={cell.cssCell}
        onClick={onClickCellFn.bind(this, cell)}
        onMouseEnter={onMouseEnterFn.bind(this, cell)}
        onMouseLeave={onMouseLeaveFn.bind(this, cell)}
        disabled={cell.mark || isGameFinished}
      >
        {cellContent}
      </button>
    );
  }

  return cells;
};

export const getBoardStatus = (board) => {
  if (board.length === 0)
    return { status: BOARD_STATUS.INPROGRESS, indexes: [], mark: null };

  const xWinCondition = "XXX";
  const oWinCondition = "OOO";
  const col1 = board[0].mark + board[3].mark + board[6].mark;
  const col2 = board[1].mark + board[4].mark + board[7].mark;
  const col3 = board[2].mark + board[5].mark + board[8].mark;
  const row1 = board[0].mark + board[1].mark + board[2].mark;
  const row2 = board[3].mark + board[4].mark + board[5].mark;
  const row3 = board[6].mark + board[7].mark + board[8].mark;
  const dg1 = board[0].mark + board[4].mark + board[8].mark;
  const dg2 = board[2].mark + board[4].mark + board[6].mark;

  if (col1 === xWinCondition || col1 === oWinCondition)
    return { status: BOARD_STATUS.WINNER, indexes: [0, 3, 6], mark: col1[0] };
  if (col2 === xWinCondition || col2 === oWinCondition)
    return { status: BOARD_STATUS.WINNER, indexes: [1, 4, 7], mark: col2[0] };
  if (col3 === xWinCondition || col3 === oWinCondition)
    return { status: BOARD_STATUS.WINNER, indexes: [2, 5, 8], mark: col3[0] };
  if (row1 === xWinCondition || row1 === oWinCondition)
    return { status: BOARD_STATUS.WINNER, indexes: [0, 1, 2], mark: row1[0] };
  if (row2 === xWinCondition || row2 === oWinCondition)
    return { status: BOARD_STATUS.WINNER, indexes: [3, 4, 5], mark: row2[0] };
  if (row3 === xWinCondition || row3 === oWinCondition)
    return { status: BOARD_STATUS.WINNER, indexes: [6, 7, 8], mark: row3[0] };
  if (dg1 === xWinCondition || dg1 === oWinCondition)
    return { status: BOARD_STATUS.WINNER, indexes: [0, 4, 8], mark: dg1[0] };
  if (dg2 === xWinCondition || dg2 === oWinCondition)
    return { status: BOARD_STATUS.WINNER, indexes: [2, 4, 6], mark: dg2[0] };

  const marks = board.map((c) => c.mark);
  const existAvailableCell = marks.findIndex((m) => m === null) !== -1;

  if (!existAvailableCell) {
    return { status: BOARD_STATUS.TIE, indexes: [], mark: MARK.T };
  }

  return { status: BOARD_STATUS.INPROGRESS, indexes: [], mark: null };
};

export const highlightWinnerCells = (board, winnerMark, indexes, cssObject) => {
  const updatedBoard = [...board];
  const cell1 = { ...board[indexes[0]] };
  const cell2 = { ...board[indexes[1]] };
  const cell3 = { ...board[indexes[2]] };
  const { cellBlue, cellYellow, iconNavy } = cssObject;

  if (winnerMark === MARK.X) {
    cell1.cssCell += " " + cellBlue;
    cell1.cssIcon += " " + iconNavy;
    cell2.cssCell += " " + cellBlue;
    cell2.cssIcon += " " + iconNavy;
    cell3.cssCell += " " + cellBlue;
    cell3.cssIcon += " " + iconNavy;
  } else {
    cell1.cssCell += " " + cellYellow;
    cell1.cssIcon += " " + iconNavy;
    cell2.cssCell += " " + cellYellow;
    cell2.cssIcon += " " + iconNavy;
    cell3.cssCell += " " + cellYellow;
    cell3.cssIcon += " " + iconNavy;
  }

  updatedBoard[indexes[0]] = cell1;
  updatedBoard[indexes[1]] = cell2;
  updatedBoard[indexes[2]] = cell3;

  return updatedBoard;
};

export const getCellIdToPlay = (availableCells) => {
  const availableCellsLength = availableCells.length;
  const indexAvailableCells = Math.floor(Math.random() * availableCellsLength);

  return availableCells[indexAvailableCells];
};
