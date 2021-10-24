import React from 'react';

const Player = ({ data: { sign, name, color } }) => (
	<span style={{ fontSize: 20 }}>
		{name}
		(<span style={{color}}>{sign}</span>)
	</span>
);

export default Player;
