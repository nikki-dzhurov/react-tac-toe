import React from 'react';

import Grid from 'complex-components/grid';
import { getWinner } from 'utils/winner';

const playerOneKey = 'p1';
const playerTwoKey = 'p2';

export default class TicTacToe extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			winner: null,
			gameTable: this.getDefaultGameTable(),
			currentPlayerId: playerOneKey,
		};

		this.players = {
			[playerOneKey]: {sign: 'X', name: 'Player One'},
			[playerTwoKey]: {sign: 'O', name: 'Player Two'},
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
			new Array(3).fill(null),
		);
	}

	getNextPlayerId() {
		if (this.state.currentPlayerId === playerOneKey) {
			return playerTwoKey;
		}

		return playerOneKey;
	}

	handleCellClick(rowIdx, cellIdx) {
		if (this.state.gameTable[rowIdx][cellIdx]) {
			return;
		}

		let {gameTable, currentPlayerId} = this.state;
		let newRow = gameTable[rowIdx].slice();
		newRow[cellIdx] = currentPlayerId;

		let newGameTable = [...gameTable];
		newGameTable[rowIdx] = newRow;

		let winner = getWinner(newGameTable);

		this.setState({
			winner,
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
		return this.state.gameTable.map((row, rowIdx) => ({
			className: '',
			cellData: row.map((playerId, cellIdx) => {
				let cellClassName = '';
				if (this.state.winner && this.state.winner.indices.findIndex(el => el[0] === rowIdx && el[1] === cellIdx) !== -1) {
					cellClassName = 'line-' + this.state.winner.orientation;
				}

				return {
					className: cellClassName,
					value: this.getPlayerSignById(playerId),
				};
			}),
		}));
	}

	startNewGame() {
		this.setState({
			winner: null,
			currentPlayerId: playerOneKey,
			gameTable: this.getDefaultGameTable(),
		});
	}

	render() {
		const {containerClassName, className} = this.props;
		const rowData = this.buildRowDataFromState();
		let winnerName = '';
		if (this.state.winner && this.players[this.state.winner.id]) {
			winnerName = this.players[this.state.winner.id].name;
		}

		return (
			<div className={containerClassName}>
				<Grid
					className={className}
					rowData={rowData}
					onCellClick={!winnerName ? this.handleCellClick : undefined}
				/>
				{winnerName && (
					<div className='winner-container'>
						<span className='winner-text'>{`The winner is ${winnerName}!`}</span>
						<br />
						<button className='new-game-btn' onClick={this.startNewGame}>
							New Game
						</button>
					</div>
				)}
			</div>
		);
	}
}
