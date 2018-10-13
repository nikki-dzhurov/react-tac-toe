import React from 'react';

import Cell from 'simple-components/cell';

export default class Row extends React.PureComponent {
	render() {
		const {rowIndex, className, cellData} = this.props;

		return (
			<tr className={className}>
				{cellData.map((data, idx) => (
					<Cell
						rowIndex={rowIndex}
						cellIndex={idx}
						{...data}
					/>
				))}
			</tr>
		);
	}
}
