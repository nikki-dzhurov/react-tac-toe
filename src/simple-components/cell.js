import React from 'react';

export default class Cell extends React.PureComponent {
	render() {
		const {rowIndex, cellIndex, value, className, onClick} = this.props;
		const clickHandler = onClick ? () => onClick(rowIndex, cellIndex) : undefined;

		return (
			<td className={className || undefined} onClick={clickHandler}>
				{value}
			</td>
		);
	}
}
