
import { expect } from 'chai';
import { getWinner } from './winner';

describe('getWinner tests', () => {
	it('Main diagonal test', () => {
		const result = getWinner([[1, null, 1], [0, 1, null], [0, null, 1]]);

		expect(result).to.eql({
			orientation: 'main-diagonal',
			id: 1,
			indices: [[0, 0], [1, 1], [2, 2]],
		});
	});

	it('Secondary diagonal test', () => {
		const result = getWinner([[1, null, 1], [0, 1, null], [1, null, 0]]);

		expect(result).to.eql({
			orientation: 'secondary-diagonal',
			id: 1,
			indices: [[0, 2], [1, 1], [2, 0]],
		});
	});

	it('Column test', () => {
		const result = getWinner([[1, null, 1], [1, 0, null], [1, null, 0]]);

		expect(result).to.eql({
			orientation: 'column',
			id: 1,
			indices: [[0, 0], [1, 0], [2, 0]],
		});
	});

	it('Row test', () => {
		const result = getWinner([[1, 1, 1], [0, 0, null], [null, null, 0]]);

		expect(result).to.eql({
			orientation: 'row',
			id: 1,
			indices: [[0, 0], [0, 1], [0, 2]],
		});
	});
});
