import React from 'react';

export default class Cell extends React.PureComponent {
	render() {
		return (
			<td className={this.props.className}>
				{this.props.data}
			</td>
		);
	}
}
