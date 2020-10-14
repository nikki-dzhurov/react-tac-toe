import React from 'react';

export default ({
	rowIndex,
	cellIndex,
	value,
	className,
	onClick,
}) => (
	<td className={className || undefined} onClick={onClick ? () => onClick(rowIndex, cellIndex) : undefined}>
		{value}
	</td>
);
