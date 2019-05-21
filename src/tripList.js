import React, { Component } from 'react';


export default class TripList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inputValue: null,
      lastUserId: null,
      tripData: null,
    };

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(e) {
    console.log('value', e.target.value)
    this.props.onUserSelect(e.target.value)
  }

  render() {
    // if (this.props.userId !== this.state.lastUserId) {
    //   this.loadTrips(this.props.userId);
    // }
    if (this.props.tripData === null) {
      console.log('NULL tripData')
      return(<div><select /></div>);
    } else {
      console.log(this.props.tripData)
      return(
        <div>
          <select onChange={this.onSelect}>
            {this.props.tripData}
          </select>
        </div>
      )
    }
  }
}