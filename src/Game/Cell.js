import React from 'react';
import cx from 'classnames';
import styles from './_game.module.scss';
import * as images from './images/board';

const Cell = props => {
  let Tag = 'button';
  let image;
  if (props.clicked || props.flagged || props.questioned) {
    Tag = 'div';
  }

  if (props.end) {
    image = images.mineDeath;
  } else if (props.flagged && props.gameOver) {
    image = images.misflag;
  } else if (props.flagged) {
    image = images.flag;
  } else if (props.questioned) {
    image = images.question;
  } else if (props.gameOver && props.mine) {
    image = images.mine;
  } else if (props.clicked && props.warningCount && !props.mine) {
    image = images[`warning${props.warningCount}`];
  }

  return (
    <Tag
      className={cx(styles.cell, props.className, {
        [styles.flagged]: props.flagged,
        [styles.questioned]: props.questioned,
        [styles.clicked]: props.clicked,
        [styles.mine]: props.clicked && props.mine,
        [styles.end]: props.end
      })}
      onClick={Tag !== 'div' ? props.onClick : undefined}
      onContextMenu={!props.clicked ? props.onFlag : undefined}
      value={props.id}
      data-value={props.id}
      key={props.id}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    />
  );
};

export default Cell;
