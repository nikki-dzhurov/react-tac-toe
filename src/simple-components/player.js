import React from 'react';

export default ({ data: { sign, name, color } }) => (
	<span style={{ fontSize: 20 }}>
		(<span style={{color}}>{sign}</span>)
		{name}
	</span>
);
