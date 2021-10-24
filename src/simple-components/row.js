import React from 'react';

import Cell from 'simple-components/cell';

const Row = ({ rowIndex, className, cellData, onCellClick }) => (
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

export default Row;
