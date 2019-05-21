import React, { Component } from 'react';
import styled from 'styled-components'
import logo from './static/navvid.jpeg';

const ReportLabel = styled.h2`
  font-family: Avenir, Arial;
  font-size: 24px;
`;

const GridContainer = styled.section`
  -webkit-box-sizing: border-box;
  margin: 0 0;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 800px;
  display: grid;
  grid-template-columns: 120px auto;
}`;

export default class IncidentReport extends Component {

  render() {
    if (this.props.incidentReportData) {
      return(
        <div>
          <GridContainer>
            <div><img src={logo} alt="NavVid Logo" width="100px" height="100px"></img></div>
            <div><ReportLabel><h2>NavVid Incident Report</h2></ReportLabel></div>
          </GridContainer>
          <table>
            <tbody>
              {this.props.incidentReportData}
            </tbody>
          </table>
        </div>
      )
    } else {
      console.log('No incidentReportData')
    }
    return(null);
  }
}
