import React, { Component } from 'react';


export default class DataSelect extends Component {

  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(e) {
    console.log('selected value', e.target.value)
    this.props.onSelect(e.target.value)
  }

  render() {
    console.log('data select loading', this.props.loading)
    if (this.props.selectData === null) {
      return(<div><select /></div>);
    } else if (this.props.loading === true) {
      return(<div>Loading...</div>);
    } else {
      return (
        <div>
          <select onChange={this.onSelect}>
              {this.props.selectData}
          </select>
        </div>
      );
    }
  }
}