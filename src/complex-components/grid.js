import React from 'react';

import Row from 'simple-components/row';

export default class Grid extends React.Component {
	render() {
		const {rowData, className, onCellClick} = this.props;

		return (
			<table className={className}>
				<tbody>
					{rowData.map((data, idx) => (
						<Row
							key={idx}
							rowIndex={idx}
							onCellClick={onCellClick}
							{...data}
						/>
					))}
				</tbody>
			</table>
		);
	}
}
