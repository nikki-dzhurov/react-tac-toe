import React from 'react';
import TicTacToe from 'complex-components/tic-tac-toe';

export default class App extends React.Component {
	render() {
		return (
			<TicTacToe className='tic-tac-toe' />
		);
	}
}
