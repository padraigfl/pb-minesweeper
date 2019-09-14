import React from 'react';
import styles from './_game.module.scss';
import Counter from './Counter';

let timeTracker = 0;

const Timer = props => {
  const [time, updateTime] = React.useState(0);

  React.useEffect(() => {
    if (props.status === 'NEW') {
      timeTracker = 0;
      updateTime(timeTracker);
    }
    const x = window.setInterval(() => {
      if (props.status === 'ACTIVE') {
        timeTracker = timeTracker + 1;
        updateTime(timeTracker);
      }
    }, 1000);
    return () => {
      window.clearInterval(x);
    };
  }, [props.status]);
  return <Counter value={time % 1000} />;
};

const Status = props => (
  <div className={styles.status}>
    <Counter value={props.totalMines - props.numberFlagged} />
    <button className="" onClick={props.newGame} type="button" />
    <Timer status={props.gameState} />
  </div>
);

export default Status;
