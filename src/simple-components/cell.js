import React from 'react';

export default class Cell extends React.PureComponent {
	render() {
		const {rowIndex, cellIndex, value, className, onClick} = this.props;

		return (
			<td className={className || undefined} onClick={() => onClick(rowIndex, cellIndex)}>
				{value}
			</td>
		);
	}
}
