import React from 'react';

import Cell from 'simple-components/cell';

export default ({
	rowIndex,
	className,
	cellData,
	onCellClick,
}) => (
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
