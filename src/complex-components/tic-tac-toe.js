import React from 'react';

import Grid from 'complex-components/grid';

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
			new Array(3).fill(null)
		);
	}

	getWinner(gameTable) {
		const tableLength = gameTable.length;
		const generateResult = (winnerId, orientation, idxGeneratorFn) => ({
			orientation,
			id: winnerId,
			indices: this.generateWinnerIndices(tableLength, idxGeneratorFn),
		});

		// check for horizontal or vertical winner
		// assume gameTable is a square
		let mainDiagonalIds = [];
		let secondaryDiagonalIds = [];
		for (let i = 0; i < tableLength; i++) {
			if (gameTable[i][0] && this.areIdsEqual(gameTable[i])) {
				return generateResult(gameTable[i][0], 'row', col => [i, col]);
			}

			let verticalIds = [];
			for (let k = 0; k < tableLength; k++) {
				verticalIds.push(gameTable[k][i]);
			}

			if (verticalIds[0] && this.areIdsEqual(verticalIds)) {
				return generateResult(verticalIds[0], 'column', row => [row, i]);
			}

			let secondaryIdx = tableLength - 1 - i;
			mainDiagonalIds.push(gameTable[i][i]);
			secondaryDiagonalIds.push(gameTable[i][secondaryIdx]);
		}

		// check for diagonal winner
		if (mainDiagonalIds[0] && this.areIdsEqual(mainDiagonalIds)) {
			return generateResult(mainDiagonalIds[0], 'main-diagonal', idx => [idx, idx]);
		}

		if (secondaryDiagonalIds[0] && this.areIdsEqual(secondaryDiagonalIds)) {
			return generateResult(secondaryDiagonalIds[0], 'secondary-diagonal', row => [row, tableLength - 1 - row]);
		}

		return null;
	}

	generateWinnerIndices(count, fn) {
		let result = [];
		for (let i = 0; i < count; i++) {
			result.push(fn(i));
		}

		return result;
	}

	areIdsEqual(ids) {
		if (!Array.isArray(ids) || ids.length === 0) {
			return false;
		}

		return ids.every(id => id === ids[0]);
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

		let winner = this.getWinner(newGameTable);

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
