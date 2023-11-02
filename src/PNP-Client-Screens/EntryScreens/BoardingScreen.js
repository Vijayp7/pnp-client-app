import React, { Component } from 'react'
import '../../../src/All.css';

export class BoardingScreen extends React.PureComponent {


    handleNext = () =>{
      this.props.history.push({
        pathname: "/walkingentry"
      })
    }

    login=()=>{
      this.props.history.push({
        pathname : "/login"
      })
    }

    componentDidMount = () =>{
      if(navigator.onLine){
        //
      }
      else{
        this.props.history.push({
          pathname : "/internet"
        })
      }
    }

  render() {
    return (
        <div className="main1-pnp">
        <div className="main1-head">
          <span onClick={this.login}>Skip</span>
          <h5>Discover</h5>
        </div> 
        <div className="main1-pnp-info">
          <img src="person-img.png" alt="img" />
          <h3>Pet Boarding</h3>
          <p>Hire verified Pet lover to watch your furry friend when your away</p>
        </div> 
        <div className="main1-pagenations">
        <div class="pagination">
            <span class="active"></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <a onClick={this.handleNext}><img src="arrow.png" alt="arrow" /></a>
        </div>
      </div>
    )
  }
}

export default BoardingScreen