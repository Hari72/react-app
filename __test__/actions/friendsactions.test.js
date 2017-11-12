import { addFriend, deleteFriend, starFriend } from '../../src/actions/FriendsActions';
import * as types from '../../src/constants/ActionTypes';

describe('Friends Actions', () => {

	it('can add a friend', () => {
		expect(addFriend('Hariharan', 'Male')).toEqual({
			type: types.ADD_FRIEND,
			name: 'Hariharan',
			sex: 'Male'
		})
	});

	it('can handle delete a friend', () => {
		expect(deleteFriend(0)).toEqual({
			type: types.DELETE_FRIEND,
			id: 0
		})
	});

	it('can handle star a friend', () => {
		expect(starFriend(2)).toEqual({
			type: types.STAR_FRIEND,
			id: 2
		})
	});
});