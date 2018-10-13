import React from 'react';

import Cell from 'simple-components/cell';

export default class Row extends React.PureComponent {
	render() {
		const {rowIndex, className, cellData, onCellClick} = this.props;

		return (
			<tr className={className || undefined}>
				{cellData.map((data, idx) => (
					<Cell
						key={idx}
						rowIndex={rowIndex}
						cellIndex={idx}
						onClick={onCellClick}
						{...data}
					/>
				))}
			</tr>
		);
	}
}
