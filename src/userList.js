import React, { Component } from 'react';


export default class UserList extends Component {

  constructor(props) {
    super(props);

    // inputValue: null
    this.state = {
      lastInputValue: null,
    };

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(e) {
    console.log('value', e.target.value)
    this.props.onUserSelect(e.target.value)
  }

  render() {
    if (this.props.userData === null) {
      return(<div><select /></div>);
    } else {
      return (
        <div>
          <select onChange={this.onSelect}>
              {this.props.userData}
          </select>
        </div>
      );
    }
  }
}