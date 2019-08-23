import React from 'react';
import { WindowProgram, Theme } from 'packard-belle';
import Game from './Game/Game';

const App = props => {
  return (
    <Theme>
      <WindowProgram
        title="Minesweeper"
        menuOptions={props.menuOptions}
        onClose={props.onClose}
        onMaximize={null}
        resizable={false}
        footer={[]}
      >
        <Game onWin={() => {}} onRestart={() => {}} gridSize={10} />
      </WindowProgram>
    </Theme>
  );
};

App.defaultProps = {
  onClose: () => {},
  onMinimize: () => {}
};

export default App;
