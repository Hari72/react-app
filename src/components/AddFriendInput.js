import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './AddFriendInput.css';

class AddFriendInput extends Component {

  render () {
    return (
      <div>
        <div>
          <input
            type="text"
            autoFocus="true"
            className={classnames('form-control', styles.addFriendInput)}
            placeholder="Type the name of a friend"
            value={this.state.name}
            onChange={this.handleChange.bind(this)} />
        </div>
        <div>
            <span className={styles.sexLabel}><strong> Sex </strong></span>
            <span></span>
            <label className={styles.sex}>Male
              <input
              type="radio"
              value="Male" 
              name="radio"
              onChange={this.handleToggle.bind(this)}
              checked={this.state.sex === 'Male'} />
              <span className={styles.checkmark}></span>
            </label>
            <span> </span>
            <label className={styles.sex}>Female
              <input
              type="radio"
              value="Female" 
              name="radio"
              onChange={this.handleToggle.bind(this)} 
              checked={this.state.sex === 'Female'} />
              <span className={styles.checkmark}></span>
            </label>
          <button 
            className={styles.addButton}
            onClick={this.handleSubmit.bind(this)}>Add</button>
        </div>
      </div>        
    );
  }

  constructor (props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || '',
      sex: this.props.sex || '',
    };
  }

  handleChange (e) {
    this.setState({ name: e.target.value });
  }

  handleToggle (e) {
    this.setState({ sex: e.target.value });
  }

  handleSubmit (e) {
    const name = this.state.name;
    const sex = this.state.sex;
    console.log('handleSubmit called ' + name + ' and ' + sex);
    if (name !== '' && sex !== '') {
      this.props.addFriend(name, sex);
      this.setState({
       name: '',
       sex: ''
     });
    }
  }

}

AddFriendInput.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default AddFriendInput
