import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import styles from './_game.module.scss';
import Counter from './Counter';

const getRelativePositionsOfSurroundingCells = (gridSize, idx) => {
  const surroundingCells = [idx - gridSize, idx + gridSize];
  const leftSide = [idx - gridSize - 1, idx - 1, idx + gridSize - 1];
  const rightSide = [idx - gridSize + 1, idx + 1, idx + gridSize + 1];

  const onLeftColumn = idx % gridSize === 0;
  const onRightColumn = idx % gridSize === gridSize - 1;

  if (!onLeftColumn && !onRightColumn) {
    surroundingCells.push(...leftSide, ...rightSide);
  } else if (!onLeftColumn) {
    surroundingCells.push(...leftSide);
  } else if (!onRightColumn) {
    surroundingCells.push(...rightSide);
  }
  return surroundingCells.filter(index => index > -1 && index < gridSize ** 2);
};

const setMines = gridSize => {
  const mines = [];
  for (let i = 0; i < gridSize; i += 1) {
    let nextMineIdx = -1;
    while (nextMineIdx === -1) {
      const suggestedIdx = Math.floor(Math.random() * gridSize ** 2);
      if (!mines.includes(suggestedIdx)) {
        nextMineIdx = suggestedIdx;
      }
    }
    mines.push(nextMineIdx);
  }
  return mines;
};

const initialize = gridSize => {
  const mineIndex = setMines(gridSize);
  return new Array(gridSize ** 2)
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

const clickEvent = (state, clickedIndex) => {
  console.log(clickedIndex);
  const surroundingCellIndexes = getRelativePositionsOfSurroundingCells(
    Math.sqrt(state.length),
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
      clickEvent(state, idx);
    } else {
      state[idx].clicked = true;
    }
  });

  return state;
};

const onClickCell = (state, clickedIndex) => {
  const stateCopy = JSON.parse(JSON.stringify(state));
  return clickEvent(stateCopy, clickedIndex);
};

const Grid = props => {
  const [boardState, updateBoard] = useState(initialize(props.gridSize));
  const [flagged, updateFlagged] = useState([]);

  useEffect(() => {});
  // useEffect(() => {
  //   updateBoard(initialize(props.gridSize));
  // }, []);

  const onClick = e => {
    if (boardState[e.target.value].isMine) {
      updateBoard(boardState.map(val => ({ ...val, clicked: true })));
      return;
    }
    const x = onClickCell(boardState, +e.target.value);
    updateBoard(x);
  };
  const onFlag = e => {
    const isFlagged = flagged.indexOf(e.target.value);
    if (isFlagged) {
      updateFlagged(flagged.filter((arr, i) => i !== isFlagged));
      return;
    }
    updateFlagged([...flagged, e.target.value]);
  };

  return (
    <div>
      <div>
        <Counter value={0} />
        <button>:)</button>
        <Counter value={0} />
      </div>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${props.gridSize}, 1fr)`
        }}
      >
        {boardState.map((cell, idx) => (
          <Cell
            mine={cell.isMine}
            clicked={cell.clicked}
            flagged={flagged.includes(idx)}
            warningCount={cell.warningCount}
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
  gridSize: 10
};

export default Grid;
