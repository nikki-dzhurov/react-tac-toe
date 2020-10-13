
const generateWinnerIndices = (count, fn) => {
	let result = [];
	for (let i = 0; i < count; i++) {
		result.push(fn(i));
	}

	return result;
};

const areIdsEqual = ids => {
	if (!Array.isArray(ids) || ids.length === 0) {
		return false;
	}

	return ids.every(id => id === ids[0]);
};

const generateResult = (tableLength, winnerId, orientation, idxGeneratorFn) => ({
	orientation,
	id: winnerId,
	indices: generateWinnerIndices(tableLength, idxGeneratorFn),
});

const getWinner = gameTable => {
	const tableLength = gameTable.length;

	// check for horizontal or vertical winner
	// assume gameTable is a square
	let mainDiagonalIds = [];
	let secondaryDiagonalIds = [];
	for (let i = 0; i < tableLength; i++) {
		if (gameTable[i][0] && areIdsEqual(gameTable[i])) {
			return generateResult(tableLength, gameTable[i][0], 'row', col => [i, col]);
		}

		let verticalIds = [];
		for (let k = 0; k < tableLength; k++) {
			verticalIds.push(gameTable[k][i]);
		}

		if (verticalIds[0] && areIdsEqual(verticalIds)) {
			return generateResult(tableLength, verticalIds[0], 'column', row => [row, i]);
		}

		let secondaryIdx = tableLength - 1 - i;
		mainDiagonalIds.push(gameTable[i][i]);
		secondaryDiagonalIds.push(gameTable[i][secondaryIdx]);
	}

	// check for diagonal winner
	if (mainDiagonalIds[0] && areIdsEqual(mainDiagonalIds)) {
		return generateResult(tableLength, mainDiagonalIds[0], 'main-diagonal', idx => [idx, idx]);
	}

	if (secondaryDiagonalIds[0] && areIdsEqual(secondaryDiagonalIds)) {
		return generateResult(tableLength, secondaryDiagonalIds[0], 'secondary-diagonal', row => [row, tableLength - 1 - row]);
	}

	return null;
};

export {
	getWinner,
};
