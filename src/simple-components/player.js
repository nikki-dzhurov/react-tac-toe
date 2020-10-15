import React from 'react';

export default ({ data: { sign, name } }) => (
	<span style={{ fontSize: 20 }}>{sign} - {name}</span>
);
