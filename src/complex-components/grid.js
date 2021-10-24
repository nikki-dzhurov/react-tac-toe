import React from 'react';

import Row from 'simple-components/row';

const Grid = ({ rowData, className, onCellClick }) => (
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

export default Grid;
