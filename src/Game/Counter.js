import React from 'react';
import * as digits from './images/digits';
import styles from './_game.module.scss';

const Counter = props => (
  <div className={styles.counter}>
    {props.value
      .toString()
      .padStart(3, '0')
      .split('')
      .map((v, idx) => (
        <img key={idx} src={digits[`digit${+v}`] || digits.digit_} alt={v} />
      ))}
  </div>
);

export default Counter;
