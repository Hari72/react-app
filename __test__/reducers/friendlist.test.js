import friends from '../../src/reducers/friendlist';
import * as types from '../../src/constants/ActionTypes';

describe('Friend list', () => {
	it('has a default state', () => {
		expect(friends(undefined, { type: 'unexpected' })).toEqual({
			friendsById: [
		      {
		        name: 'Theodore Roosevelt',
		        sex: 'Male',
		        starred: true
		      },
		      {
		        name: 'Abraham Lincoln',
		        sex: 'Male',
		        starred: false
		      },
		      {
		        name: 'George Washington',
		        sex: 'Male',
		        starred: false
		      }
  			]
		})
	});

	it('can handle ADD_FRIEND', () => {
		expect(friends(undefined, { 
			type: types.ADD_FRIEND,
			name: 'Hariharan',
			sex: 'Male'
	 	})).toEqual({
			friendsById: [
			    {
			      name: 'Theodore Roosevelt',
			      sex: 'Male',
			      starred: true
			    },
			    {
			      name: 'Abraham Lincoln',
			      sex: 'Male',
			      starred: false
			    },
			    {
			      name: 'George Washington',
			      sex: 'Male',
			      starred: false
			    },
			    {
			      name: 'Hariharan',
			      sex: 'Male'		
			    }
  			]
		})
	});

	it('can handle DELETE_FRIEND', () => {
		expect(friends(undefined, { 
			type: types.DELETE_FRIEND,
			id: 0
	 	})).toEqual({
			friendsById: [
			    {
			      name: 'Abraham Lincoln',
			      sex: 'Male',
			      starred: false
			    },
			    {
			      name: 'George Washington',
			      sex: 'Male',
			      starred: false
			    }
  			]
		})
	});

	it('can handle STAR_FRIEND', () => {
		expect(friends(undefined, { 
			type: types.STAR_FRIEND,
			id: 2
	 	})).toEqual({
			friendsById: [
			    {
		        name: 'Theodore Roosevelt',
		        sex: 'Male',
		        starred: true
		      	},
			    {
			      name: 'Abraham Lincoln',
			      sex: 'Male',
			      starred: false
			    },
			    {
			      name: 'George Washington',
			      sex: 'Male',
			      starred: true
			    }
  			]
		})
	});
});