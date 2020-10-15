import React from 'react';

import Grid from 'complex-components/grid';
import Score from 'complex-components/score';
import { getWinner } from 'utils/winner';

const playerOneKey = 'p1';
const playerTwoKey = 'p2';

export default class TicTacToe extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			winner: null,
			isDraw: false,
			gameTable: this.getDefaultGameTable(),
			currentPlayerId: playerOneKey,
			players: {
				[playerOneKey]: { sign: 'X', name: 'Red Player', score: 0, color: '#f00' },
				[playerTwoKey]: { sign: 'O', name: 'Blue Player', score: 0, color: '#00f' },
			},
		};
	}

	getDefaultGameTable() {
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

	handleCellClick = (rowIdx, cellIdx) => {
		if (this.state.gameTable[rowIdx][cellIdx]) {
			return;
		}

		let {gameTable, currentPlayerId} = this.state;
		let newRow = gameTable[rowIdx].slice();
		newRow[cellIdx] = currentPlayerId;

		let newGameTable = [...gameTable];
		newGameTable[rowIdx] = newRow;

		const winner = getWinner(newGameTable);

		let isDraw = false;
		if (!winner && newGameTable.every(row => row.every(el => el !== null))) {
			isDraw = true;
		}

		const players = { ...this.state.players };
		if (winner) {
			players[winner.id].score += 1;
		}

		this.setState({
			winner,
			isDraw,
			players,
			gameTable: newGameTable,
			currentPlayerId: this.getNextPlayerId(),
		});
	}

	getPlayerSignById(id) {
		const playerData = this.state.players[id];
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

	startNewGame = () => {
		this.setState({
			winner: null,
			isDraw: false,
			currentPlayerId: playerOneKey,
			gameTable: this.getDefaultGameTable(),
		});
	}

	render() {
		const { isDraw } = this.state;
		const {containerClassName, className} = this.props;
		const rowData = this.buildRowDataFromState();
		let winnerName = '';
		if (this.state.winner && this.state.players[this.state.winner.id]) {
			winnerName = this.state.players[this.state.winner.id].name;
		}

		return (
			<div className={containerClassName}>
				<Score
					playerOne={this.state.players[playerOneKey]}
					playerTwo={this.state.players[playerTwoKey]}
				/>

				<Grid
					className={className}
					rowData={rowData}
					onCellClick={!winnerName ? this.handleCellClick : undefined}
				/>

				{(winnerName || isDraw) && (
					<div className='winner-container'>
						<span className='winner-text'>{isDraw ? 'The game is draw' : `The winner is ${winnerName}!`}</span>
						<br />
						<button className='new-game-btn' onClick={this.startNewGame}>
							Continue
						</button>
					</div>
				)}
			</div>
		);
	}
}
