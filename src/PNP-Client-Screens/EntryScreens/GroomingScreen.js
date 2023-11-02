import React, { Component } from 'react'

export class GroomingScreen extends React.PureComponent {

Login = () =>{
  this.props.history.push({
    pathname: "/login"
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
        <div className="main4-pnp">
        <div className="main4-head">
          <span onClick={this.Login}>Skip</span>
          <h5>Discover</h5>
        </div> 
        <div className="main4-pnp-info">
          <img src="person4-img.png" alt="img" />
          <h3>Pet Grooming</h3>
          <p>Hire verified Pet lover to watch your furry friend when your away</p>
        </div> 
        <div className="main4-pagenations">
        <div class="pagination">
            <span ></span>
            <span></span>
            <span></span>
            <span class="active"></span>
          </div>
          <a onClick={this.Login}>Let's Start</a>
        </div>
      </div>
    )
  }
}

export default GroomingScreen