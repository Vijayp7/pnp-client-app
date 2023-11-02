import React, { Component } from 'react'
import '../CSS/EntryCSS/ResendQuotationPopup.css'

export class ResendQuotationPopup extends React.PureComponent {

  constructor(props){
    super(props);
  }

  state={
   
  }

 
  render() {
    return (
      <div>
        <div class="i-main-menu rsd" id='x' >
        <div class="i-menu rsd">
        <div class="loading-main rsd">
         <div class="my-qntn-popup">
      

      {/* <div class="cross-popup">
        <img src="qntn-popup-cross-icon.png"/>
      </div> */}

      <div class="woops-img">
        <img src="woops-dog.png"/>
      </div>

      <h6>Whoops!</h6>
      <p style={{background:"transparent"}}>Your request is not completed</p>


      <button class="qntn-resend" onClick={this.props.resendQuotation}>Resend Your Quotation</button>
      <button class="qntn-cnct" >Contact Our Team</button>
      {/* <a href={"tel:"+this.state.phone} onClick={this.start}>Start Call</a> */}


    </div>
    
       </div> 
      </div>
      </div>
      </div>
     
    )
  }
}

export default ResendQuotationPopup