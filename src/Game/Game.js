import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Cell from './Cell';
import styles from './_game.module.scss';
import Status from './Status';

const getRelativePositionsOfSurroundingCells = (gridSize, idx) => {
  const gridColSize = gridSize[0];
  const surroundingCells = [idx - gridColSize, idx + gridColSize];
  const leftSide = [idx - gridColSize - 1, idx - 1, idx + gridColSize - 1];
  const rightSide = [idx - gridColSize + 1, idx + 1, idx + gridColSize + 1];

  const onLeftColumn = idx % gridColSize === 0;
  const onRightColumn = idx % gridColSize === gridColSize - 1;

  if (!onLeftColumn && !onRightColumn) {
    surroundingCells.push(...leftSide, ...rightSide);
  } else if (!onLeftColumn) {
    surroundingCells.push(...leftSide);
  } else if (!onRightColumn) {
    surroundingCells.push(...rightSide);
  }
  return surroundingCells.filter(
    index => index > -1 && index < gridSize[0] * gridSize[1]
  );
};

const setMines = (gridSize, minesCount) => {
  const mines = [];
  for (let i = 0; i < minesCount; i += 1) {
    let nextMineIdx = -1;
    while (nextMineIdx === -1) {
      const suggestedIdx = Math.floor(
        Math.random() * gridSize[0] * gridSize[1]
      );
      if (!mines.includes(suggestedIdx)) {
        nextMineIdx = suggestedIdx;
      }
    }
    mines.push(nextMineIdx);
  }
  return mines;
};

const initialize = (gridSize, mines) => {
  const mineIndex = setMines(gridSize, mines);
  return new Array(gridSize[0] * gridSize[1])
    .fill({
      clicked: false,
      flagged: false
    })
    .map((entry, idx) => {
      const surroundingCells = getRelativePositionsOfSurroundingCells(
        gridSize,
        idx
      );
      let warningCount = 0;
      surroundingCells.forEach(val => {
        if (mineIndex.includes(val)) {
          warningCount += 1;
        }
      });
      return {
        ...entry,
        isMine: mineIndex.includes(idx),
        warningCount
      };
    });
};

const clickEvent = (state, gridSize, clickedIndex) => {
  const surroundingCellIndexes = getRelativePositionsOfSurroundingCells(
    gridSize,
    clickedIndex
  );
  if (clickedIndex > state.length - 1) {
    return state;
  }

  state[clickedIndex].clicked = true;

  surroundingCellIndexes.forEach(idx => {
    if (!state[idx] || state[idx].isMine || state[idx].clicked) {
      return;
    }
    if (!state[idx].warningCount) {
      clickEvent(state, gridSize, idx);
    } else {
      state[idx].clicked = true;
    }
  });

  return state;
};

const onClickCell = (state, gridSize, clickedIndex) => {
  const stateCopy = JSON.parse(JSON.stringify(state));
  return clickEvent(stateCopy, gridSize, clickedIndex);
};

const Grid = props => {
  const [boardState, updateBoard] = useState(
    initialize(props.gridSize, props.mines)
  );
  const [flagged, updateFlagged] = useState([]);
  const [questioned, updateQuestioned] = useState([]);
  const [movesCount, updateMovesCount] = useState(0);
  const [endState, setEndState] = useState(null);

  const restart = () => {
    updateBoard(initialize(props.gridSize, props.mines));
    updateFlagged([]);
    updateQuestioned([]);
    setEndState(null);
  };

  useEffect(() => {
    const remaining = boardState.filter(cell => !cell.clicked).length;
    if (remaining === 0) {
      setEndState({ lose: true });
    } else if (remaining === props.mines) {
      setEndState({ win: true });
    }
  }, boardState);

  useEffect(restart, [props.gameId]);

  const onClick = e => {
    const value = +e.target.dataset.value;
    updateMovesCount(movesCount + 1);
    if (boardState[value].isMine) {
      const updatedBoard = boardState.map(val => ({ ...val, clicked: true }));
      updatedBoard[value].end = true;
      updateBoard(updatedBoard);
      return;
    }
    const x = onClickCell(boardState, props.gridSize, value);
    updateBoard(x);
  };

  const onFlag = e => {
    const value = +e.target.dataset.value;
    e.preventDefault();
    e.stopPropagation();
    const alreadyFlagged = flagged.includes(value);
    const alreadyQuestioned = questioned.includes(value);
    if (alreadyQuestioned) {
      updateQuestioned(questioned.filter(val => val !== value));
      return;
    }
    if (alreadyFlagged) {
      updateFlagged(flagged.filter(val => val !== value));
      updateQuestioned([...questioned, value]);
      return;
    }
    updateFlagged([...flagged, value]);
  };

  return (
    <div
      className={cx(styles.minesweeper, {
        [styles.win]: endState && endState.win,
        [styles.lose]: endState && endState.lose
      })}
    >
      <Status
        totalMines={props.mines}
        numberFlagged={flagged.length}
        newGame={restart}
        totalMoves={movesCount}
        endState={endState}
      />
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${props.gridSize[0]}, 1fr)`
        }}
      >
        {boardState.map((cell, idx) => (
          <Cell
            mine={cell.isMine}
            clicked={cell.clicked}
            end={cell.end}
            flagged={flagged.includes(idx)}
            questioned={questioned.includes(idx)}
            warningCount={cell.warningCount}
            gameOver={endState}
            onClick={onClick}
            onFlag={onFlag}
            id={idx}
          />
        ))}
      </div>
    </div>
  );
};

Grid.defaultProps = {
  gridSize: [9, 9],
  mines: 10
};

export default Grid;
