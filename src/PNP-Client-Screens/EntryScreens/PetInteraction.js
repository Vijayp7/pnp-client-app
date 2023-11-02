import React, { Component } from 'react'
import '../CSS/EntryCSS/PetInteraction.css'

export class PetInteraction extends React.PureComponent {
  constructor(props){
    super(props);
  }

  home=()=>{
    this.setState({
      pet_Interaction_popup : false
    })
    
  }

  Quotation=()=>{

    window.open("/quotation", "_self");
    
  }

 
  render() {
    return (
      <div class="i-main-menu" id='x' >
        <div class="i-menu">
          {/* <div class="ldng-bg">
            <div class="loading-main">
            <div class="dwn-flow">
            </div>
            <div class="dog-ldng">
              <img src="dog-ldng.gif" />
            </div>
            <h4>Your Service is On the Way</h4>

            <div class="progress-bar">
              <div class="progress-fill"></div>
            </div>
            <p onClick={this.Quotation}>View Your Quotation</p>
            </div>     
          </div> */}
       </div>
      </div>
    )
  }
}

export default PetInteraction