import React, { Component } from 'react'
import '../../All.css'





export class PaymentAlert extends React.PureComponent {
    constructor(props){
        super(props);
    }








  render() {
    return (
        <div class="p-cnt-p rlse">
        <img src="question-mark.png" />
        <h6>Are you sure!</h6>
        <p>you want to release payment?</p>
        <div class="rlse-s-btns">
        <button class="okay-btn y" onClick={this.props.openpay}>Yes</button>
        <button class="cncl-btn n">No</button>
        </div>
      </div>
    )
  }
}

export default PaymentAlert