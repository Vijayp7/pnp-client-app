import React, { Component } from 'react'
import '../CSS/PetPurchase/Petpurchase.css'

export class PetPurchase extends Component {
  render() {
    return (
      <div>
<div class="pet-prchs">
      
      <div class="pet-prchs-hd">
        <div class="pet-prchs-hd-left">
          <img src="left-arrow.png" />
        </div>
        <h3>Pet Purchase</h3>
        <p>Reset</p>
      </div>


      <div class="pet-prchs-main">
        
        <h4>Select Gender</h4>
        <div class="select-items">
          <select>
              <option>Male</option>
              <option>Female</option>
          </select>
          <h4>Pet Type</h4>
          <select class="pt-slct">
              <option>Dog</option>
              <option>Cat</option>
          </select>
          <h4>Breed</h4>
          <select class="brd-slct">
              <option>Select</option>
              <option>Cat</option>
          </select>
          <h4>Breed Quality</h4>
          <select class="bq-slct">
              <option>Select</option>
              <option>Cat</option>
          </select>
        </div>
        <div class="pet-prchs-btn">
          <button>Send Requirment</button>
        </div>

      </div>

    </div>








      </div>
    )
  }
}

export default PetPurchase