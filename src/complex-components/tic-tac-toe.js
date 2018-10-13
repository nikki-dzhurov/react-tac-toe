import React from 'react';

import Grid from 'complex-components/grid';

export default class TicTacToe extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	handleCellClick(rowIdx, cellIdx) {
		console.log(`[${rowIdx},${cellIdx}] was clicked`);
	}

	render() {
		const {containerClassName, className} = this.props;
		const rowData = new Array(3).fill({
			className: '',
			cellData: new Array(3).fill({
				className: '',
				value: null,
			}),
		});

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
