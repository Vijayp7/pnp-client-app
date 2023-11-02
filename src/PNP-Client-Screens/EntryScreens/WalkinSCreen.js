import React, { Component } from 'react'

export class WalkinSCreen extends React.PureComponent {

    handleNext = () =>{
      this.props.history.push({
        pathname: "/trainingentry"
      })
    }

    Login=()=>{
      this.props.history.push({
        pathname : "/login"
      })
    }

    componentDidMount = () =>{
      if(navigator.onLine){
      }
      else{
        this.props.history.push({
          pathname : "/internet"
        })
      }
    }

  render() {
    return (
        <div className="main2-pnp">
        <div className="main2-head">
          <span onClick={this.Login}>Skip</span>
          <h5>Discover</h5>
        </div> 
        <div className="main2-pnp-info">
          <img src="person2-img.png" alt="img" />
          <h3>Pet Walking</h3>
          <p>Hire verified Pet lover to watch your furry friend when your away</p>
        </div> 
        <div className="main2-pagenations">
        <div class="pagination">
            <span></span>
            <span class="active"></span>
            <span></span>
            <span></span>
          </div>
          <a onClick={this.handleNext}><img src="arrow.png" alt="arrow" /></a>
        </div>
      </div>
    )
  }
}

export default WalkinSCreen