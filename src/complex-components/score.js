import React from 'react';

import Player from 'simple-components/player';

export default ({playerOne, playerTwo}) => (
	<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '20px 50px' }}>
		<Player data={playerOne} />
		<span style={{fontSize: 24}}>
			{playerOne.score}&nbsp;&nbsp;:&nbsp;&nbsp;{playerTwo.score}
		</span>
		<Player data={playerTwo} />
	</div>
);
