import React, { Component } from 'react'

export class TrainingScreen extends React.PureComponent {

    handleNext = () =>{
      this.props.history.push({
        pathname: "/groomingentry"
      })
    }

    Login=()=>{
      this.props.history.push({
        pathname : "/login"
      })
    }

    componentDidMount = () =>{
      if(navigator.onLine){}
      else{
        this.props.history.push({
          pathname : "/internet"
        })
      }
    }
  render() {
    return (
        <div className="main3-pnp">
        <div className="main3-head">
          <span onClick={this.Login}>Skip</span>
          <h5>Discover</h5>
        </div> 
        <div className="main3-pnp-info">
          <img src="person3-img.png" alt="img" />
          <h3>Pet Training</h3>
          <p>Hire verified Pet lover to watch your furry friend when your away</p>
        </div> 
        <div className="main3-pagenations">
        <div class="pagination">
            <span></span>
            <span></span>
            <span class="active"></span>
            <span></span>
          </div>
          <a onClick={this.handleNext}><img src="arrow.png" alt="arrow" /></a>
        </div>
      </div>
    )
  }
}

export default TrainingScreen