import React, { Component, PropTypes } from 'react';
import styles from './FriendListPagination.css';

class FriendListPagination extends Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        // set page if friends array isn't empty
        if (this.props.friends && this.props.friends.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if friends array has changed
        if (this.props.friends !== prevProps.friends) {
            // if the last friend from the last page is deleted then go to previous page
            if (this.props.friends < prevProps.friends && this.props.friends.length === this.state.pager.startIndex) {
              this.setPage(this.state.pager.currentPage - 1);
            } else {
              // for all other cases
              this.setPage(this.state.pager.currentPage);
            }
        }
    }

    setPage(page) {
        let friends = this.props.friends;
        let pager = this.state.pager;

        if (friends.length <= 2) {

          // send startIndex and endIndex as 0 and 1 respectively to parent
          this.props.onChangePage(0, 1);

          // update state with default values when there is only one page
          this.setState({
            pager: {
              totalfriends: friends.length,
              currentPage: page,
              pageSize: 2,
              totalPages: 1,
              startPage: 1,
              endPage: 1,
              startIndex: 0,
              endIndex: 1,
              pages: [1]
            }
          });

            return;
        }

        // get new pager object for specified page
        pager = this.getPager(friends.length, page);

        // update state
        this.setState({ pager: pager });

        // call to onChangePage function in parent component
        this.props.onChangePage(pager.startIndex, pager.endIndex);
    }

    getPager(totalfriends, currentPage, pageSize) {

        // default to first page
        currentPage = currentPage || 1;

        // default page size is 2
        pageSize = pageSize || 2;

        // calculate total pages
        let totalPages = Math.ceil(totalfriends / pageSize);

        let startPage, endPage;
        /*set startPage and endPage based on no.of totalPages*/
        if (totalPages <= 2) {
            startPage = 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1; 
        }

        // calculate start and end indexes of friends
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.max(Math.min(startIndex + pageSize - 1, totalfriends - 1), 0);

        // create an array of pages to be displayed. Maximum no.of pages is 3
        let pages = [];
        if (currentPage > 1) {
          pages.push(currentPage - 1);
        }
        pages.push(currentPage);
        if (currentPage < totalPages) {
          pages.push(currentPage + 1)
        }

        // return object with all pager properties required by the view
        return {
            totalfriends: totalfriends,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        let pager = this.state.pager;

        // don't display pager if there are 2 or less friends
        if (!this.props.friends || this.props.friends.length <= 2) {
            return null;
        }

        return (
            <ul className={styles.pagination}>
                <li className={pager.currentPage === 1 ? 'disabled' : ''} onClick={() => this.setPage(1)}>&#171;</li>
                <li className={pager.currentPage === 1 ? 'disabled' : ''} onClick={() => this.setPage(pager.currentPage - 1)}>&#8249;</li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 'active' : ''} onClick={() => this.setPage(page)}>{page}</li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''} onClick={() => this.setPage(pager.currentPage + 1)}>&#8250;</li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''} onClick={() => this.setPage(pager.totalPages)}>&#187;</li>
            </ul>
        );
    }
}

FriendListPagination.propTypes = {
    friends: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number
};

FriendListPagination.defaultProps = {
    initialPage: 1
};

export default FriendListPagination;