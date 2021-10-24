import React from 'react';

const Player = ({ data: { sign, name, color } }) => (
	<span style={{ fontSize: 20 }}>
		(<span style={{color}}>{sign}</span>)
		{name}
	</span>
);

export default Player;
