import React from 'react';

import Row from 'simple-components/row';

export default class Grid extends React.Component {
	render() {
		const {rowData, className} = this.props;

		return (
			<table className={className}>
				{rowData.map((data, idx) => (
					<Row rowIndex={idx} {...data} />
				))}
			</table>
		);
	}
}
