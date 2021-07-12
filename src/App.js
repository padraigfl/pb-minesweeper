import React from 'react';
import Game from './Game/Game';

const App = props => {
  return (
    <Game gameId={props.id} gridSize={props.gridSize} mines={props.mines} />
  );
};

App.defaultProps = {
  gameId: 1, // to trigger restart
  gridSize: [9, 9], // @todo needs to be an array
  mines: 11
};

export default App;
