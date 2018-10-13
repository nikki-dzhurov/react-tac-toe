import React from 'react';

import Grid from 'complex-components/grid';

export default class TicTacToe extends React.Component {
	render() {
		const {className} = this.props;
		const rowData = new Array(3).fill({
			className: '',
			cellData: new Array(3).fill({
				className: '',
				value: null,
			}),
		});

		return (
			<Grid
				className={className}
				rowData={rowData}
			/>
		);
	}
}
