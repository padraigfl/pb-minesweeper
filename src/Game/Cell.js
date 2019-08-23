import React from 'react';
import cx from 'classnames';
import styles from './_game.module.scss';

const Cell = props => {
  let Tag = 'button';
  if (props.clicked || props.flagged) {
    Tag = 'div';
  }

  return (
    <Tag
      className={cx(styles.this, props.className, {
        [styles.flagged]: props.flagged,
        [styles.clicked]: props.clicked,
        [styles.mine]: props.clicked && props.mine
      })}
      onClick={!props.clicked && !props.flagged && props.onClick}
      onContextMenu={!props.clicked && props.onFlag}
      value={props.id}
      data-warningcount={
        props.warningCount > 0 ? props.warningCount : undefined
      }
      data-mine={props.isMine}
    />
  );
};

export default Cell;
