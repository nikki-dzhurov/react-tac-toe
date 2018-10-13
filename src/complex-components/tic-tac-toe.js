import React from 'react';

import Grid from 'complex-components/grid';

const playerOneKey = 'p1';
const playerTwoKey = 'p2';

export default class TicTacToe extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			gameTable: this.getDefaultGameTable(),
			currentPlayerId: playerOneKey,
		};

		this.players = {
			[playerOneKey]: {sign: 'X'},
			[playerTwoKey]: {sign: 'O'},
		};

		this.startNewGame = this.startNewGame.bind(this);
		this.handleCellClick = this.handleCellClick.bind(this);
	}

	getDefaultGameTable() {
		// return [
		// 	[null, null, null],
		// 	[null, null, null],
		// 	[null, null, null],
		// ];
		return new Array(3).fill(
			new Array(3).fill(null)
		);
	}

	getNextPlayerId() {
		if (this.state.currentPlayerId === playerOneKey) {
			return playerTwoKey;
		}

		return playerOneKey;
	}

	handleCellClick(rowIdx, cellIdx) {
		console.log(`[${rowIdx},${cellIdx}] was clicked`);
		if (this.state.gameTable[rowIdx][cellIdx]) {
			return;
		}

		let {gameTable, currentPlayerId} = this.state;
		let newRow = gameTable[rowIdx].slice();
		newRow[cellIdx] = currentPlayerId;

		let newGameTable = [...gameTable];
		newGameTable[rowIdx] = newRow;

		this.setState({
			gameTable: newGameTable,
			currentPlayerId: this.getNextPlayerId(),
		});
	}

	getPlayerSignById(id) {
		const playerData = this.players[id];
		if (playerData) {
			return playerData.sign;
		}

		return null;
	}

	buildRowDataFromState() {
		return this.state.gameTable.map((row, idx) => ({
			className: '',
			cellData: row.map((playerId, idx) => ({
				className: '',
				value: this.getPlayerSignById(playerId),
			})),
		}));
	}

	startNewGame() {
		this.setState({
			currentPlayerId: playerOneKey,
			gameTable: this.getDefaultGameTable(),
		});
	}

	render() {
		const {containerClassName, className} = this.props;
		const rowData = this.buildRowDataFromState();

		return (
			<div className={containerClassName}>
				<button onClick={this.startNewGame}>
					New Game
				</button>
				<Grid
					className={className}
					rowData={rowData}
					onCellClick={this.handleCellClick}
				/>
			</div>
		);
	}
}
