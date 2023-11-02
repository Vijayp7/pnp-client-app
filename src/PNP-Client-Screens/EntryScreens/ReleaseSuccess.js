import React, { Component } from 'react'


export class ReleaseSuccess extends React.PureComponent {
    constructor(props){
        super(props);
    }

    moveToHome = () =>{
      window.open("#/homepage", "_self");
    }
  render() {
    return (
        // <div class="p-sucess-main">
      
        <div class="p-cnt-p">
            
            <img src="correct.png" />

            <h6>Successfully</h6>
            
            <p>Payment Release Request Submitted</p>

            <button class="okay-btn" onClick={this.moveToHome}>Okay</button>

        </div>
    // </div>
    )
  }
}

export default ReleaseSuccess