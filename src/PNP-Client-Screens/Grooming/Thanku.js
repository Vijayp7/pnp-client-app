import React, { Component } from 'react'
import '../CSS/EntryCSS/Thanku.css'

export class Thanku extends Component {

  homepage=()=>{
    this.props.history.push({
      pathname : "/homepage"
    })
  }
  render() {
    return (
      <div id="wrapper">
     

      <div class="succesfull-popup">
        
        <div class="container-sr">

          <div class="sucs-pp-main">
              <div class="cross-div">
                  <img src="r-cross-icon.png" alt=""/>
              </div>
              <div class="sucs-div">
                <img src="sucs-icon.png" alt="image"/>
              </div>
              <h4>Your booking request has been submitted</h4>
              {/* <p>Please</p> */}
              <button onClick={this.homepage}>Ok</button>
          </div>

        </div>
       



      </div>











      
    </div>
    )
  }
}

export default Thanku