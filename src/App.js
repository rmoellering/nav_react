import React, { Component } from 'react';
import './App.css';
import DataSelect from './dataSelect'
import IncidentReport from './incidentReport'
import styled from 'styled-components'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label, Legend, Text } from 'recharts';

const ReportLabel = styled.td`
  font-family: Avenir, Arial;
  font-size: 16px;
  color: blue;
`;

const BL = styled.div`
  display: inline-block;
`;

const GridContainer = styled.section`
  -webkit-box-sizing: border-box;
  margin: 0 auto;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 1000px;
  border: 1px solid #000000;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 48px 240px 44px auto;
}`;

const Container = styled.section`
  -webkit-box-sizing: border-box;
  margin: 0 auto;
  padding-left: 30px;
  padding-right: 30px;
  width: 90%;
  border: 1px solid #000000;
  border-radius: 5px;
}`;



export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      lastUserId: null,
      lastTripId: null,
      userData: null,
      tripData: null,
      tripLoading: false,
      incidentReportData: null
    }
    this.loadUsers = this.loadUsers.bind(this);
    this.userSelect = this.userSelect.bind(this);
    this.tripSelect = this.tripSelect.bind(this);
    this.loadUsers()
  }

  loadUsers() {
    console.log('Loading users...')
    fetch(`http://127.0.0.1:5010/api/get_users`)
      .then(response => response.json())
      .then(data => {
            const options = []
            let key = 0

            for (const item of data) {
              options.push(<option key={item.id} value={item.id}>{item.username} - {item.first_name} {item.last_name}</option>)
              key = key + 1
            }
            console.log(key, 'users loaded...')
            this.setState({userData: options})
          }
      )
      .catch(e => e)
  };

  userSelect(value) {
    console.log('APP', value)

    if (value === this.state.lastUserId) {
      console.log('No User Change')
    } else {

      this.setState({tripLoading: true});
      console.log('Loading trips for user_id', value)
      fetch(`http://127.0.0.1:5010/api/get_trips/` + value)
        .then(response => response.json())
        .then(data => {
              const options = [];
              let key = 0;

              for (const item of data) {
                options.push(<option key={key} value={item.id}>{item.start_time} - {item.end_time}</option>);
                key = key + 1;
              }
              console.log(key, 'trips loaded...')
              this.setState({tripData: options, lastUserId: value, tripLoading: false});
            }
        )
        .catch(e => e)
    }
  };

  tripSelect(value) {
    console.log('TRIP', value)

    if (value === this.state.lastTripId) {
      console.log('No User Change')
    } else {

      fetch(`http://127.0.0.1:5010/api/get_trip/` + value)
        .then(response => response.json())
        .then(data => {
              console.log(data)
              const rows = [];

              for (const item of data) {
                if (item.label === 'SPEED GRAPH') {
                  console.log('speed graph')
                  rows.push(
                    <tr>
                      <ReportLabel>
                        <td>{item.label}</td>
                      </ReportLabel>
                      <td>
                        <LineChart width={1000} height={400} data={item.value} margin={{ top: 20, right: 0, bottom: 5, left: 0 }}>
                          <Label value="Speed" offset={0} />
                          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                          <Line type="monotone" dataKey="speed" stroke="#0000AA" dot={false}/>
                          <XAxis dataKey="timestamp" />
                          <YAxis />           
                          <Tooltip />
                        </LineChart>                        
                      </td>
                    </tr>
                  );
                } else if (item.label === 'LINEAR G GRAPH') {
                  console.log('linear graph')
                  rows.push(
                    <tr>
                      <ReportLabel>
                        <td>{item.label}</td>
                      </ReportLabel>
                      <td>
                        <LineChart width={1000} height={400} data={item.value} margin={{ top: 20, right: 0, bottom: 5, left: 0 }}>
                          <Label value="Linear Gs" offset={0} />
                          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                          <Line type="monotone" dataKey="g-force" stroke="#AA0000" dot={false}/>
                          <XAxis dataKey="timestamp" />
                          <YAxis />           
                          <Tooltip />
                        </LineChart>                        
                      </td>
                    </tr>
                  );
                } else if (item.label === 'LATERAL G GRAPH') {
                  console.log('lateral graph')
                  rows.push(
                    <tr>
                      <ReportLabel>
                        <td>{item.label}</td>
                      </ReportLabel>
                      <td>
                        <LineChart width={1000} height={400} data={item.value} margin={{ top: 20, right: 0, bottom: 5, left: 0 }}>
                          <Label value="Lateral Gs" offset={0} />
                          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                          <Line type="monotone" dataKey="g-force" stroke="#00AA00" dot={false}/>
                          <XAxis dataKey="timestamp" />
                          <YAxis />           
                          <Tooltip />
                        </LineChart>                        
                      </td>
                    </tr>
                  );
                } else {
                  rows.push(
                    <tr>
                      <ReportLabel>
                        <td>{item.label}</td>
                      </ReportLabel>
                      <td>{item.value}</td>
                    </tr>
                  );
                }
              }
              console.log('trip loaded')
              // console.log(rows)
              this.setState({incidentReportData: rows, lastTripId: value});
            }
        )
        .catch(e => e)
    }
  };

  render() {
    return (
      <React.Fragment>
        <br/>
        <GridContainer>
            <div>User:</div>
            <div><DataSelect onSelect={this.userSelect} selectData={this.state.userData}/></div>
            <div>Trip:</div>
            <div><DataSelect onSelect={this.tripSelect} selectData={this.state.tripData} loading={this.state.tripLoading}/></div>
        </GridContainer>
        <Container>
          <div>
            <IncidentReport incidentReportData={this.state.incidentReportData}/>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}
