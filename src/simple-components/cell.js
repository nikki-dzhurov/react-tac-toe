import React from 'react';

const Cell = ({ rowIndex, cellIndex, value, className, onClick }) => (
	<td className={className || undefined} onClick={onClick ? () => onClick(rowIndex, cellIndex) : undefined}>
		{value}
	</td>
);

export default Cell;
