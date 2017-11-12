import React, { Component, PropTypes } from 'react';
import styles from './FriendList.css';
import FriendListItem from './FriendListItem';
import FriendListPagination from './FriendListPagination';

class FriendList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startIndex: 1,
      endIndex: 2
    }
  }

  onChangePage(startIndex, endIndex) {
    this.setState({
      startIndex: startIndex,
      endIndex: endIndex
    });
  }

  render () {
    // count is used along with startIndex to load only the necessary friends' entries
    let count = 0;

    return (
      <div>
        <ul className={styles.friendList}>
          {
            this.props.friends.map((friend, index) => {
              if (index >= this.state.startIndex && count < 2) {
                count++;
                return (
                  <FriendListItem
                    key={index}
                    id={index}
                    name={friend.name}
                    sex={friend.sex}
                    starred={friend.starred}
                    {...this.props.actions} />
                );
              }
            })
          }
        </ul>
        <FriendListPagination friends={this.props.friends} onChangePage={this.onChangePage.bind(this)} />
      </div>

    );
  }

}

FriendList.propTypes = {
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default FriendList;
