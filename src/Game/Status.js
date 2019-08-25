import React from 'react';
import styles from './_game.module.scss';
import Counter from './Counter';

const Status = props => (
  <div className={styles.status}>
    <Counter value={props.totalMines - props.numberFlagged} />
    <button className="" onClick={props.newGame} type="button" />
    <Counter value={props.totalMoves} />
  </div>
);

export default Status;
