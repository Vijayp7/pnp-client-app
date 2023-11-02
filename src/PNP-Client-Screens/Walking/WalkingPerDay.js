import React, { Component } from 'react'
import '../CSS/WalkingCSS/WalkingPerDay.css'

export class WalkingPerDay extends Component {

  constructor(props){
    super(props);
  }


  state={
    required_Walk:"",
  }



  RequiredWalk=(req_walk)=>{
    this.setState({
        required_walk : req_walk
    })
    if(req_walk=="1"){
      document.getElementById("2_time").style.display="none" ;
      document.getElementById("3_time").style.display="none" ;
    }else if(req_walk=="2"){
      document.getElementById("2_time").style.display="block" ;
      document.getElementById("3_time").style.display="none" ;
    }else if(req_walk=="3"){
      document.getElementById("3_time").style.display="block" ;
      document.getElementById("2_time").style.display="block" ;
      document.getElementById("1_time").style.display="block" ;
    }else{
  
    }
  }
  render() {
    return (
        <div class="pet-select-pack"  style={{display : "none"}} id="per_day">
          <h5>Select Package</h5>
        <div class="pet-dog-main">
           <div class="pet-dog-walk">
             <img src="happy-dog-walk.png" />
             <h4>Dog Walking</h4>
           </div>
           <div class="pet-required-walk">
              <div class="pet-req-walk-pd">
                  <h5>Required Walk Per Day</h5>
                  <div class="pet-req-walk-list">
                     <div class="pet-req-list-item" id='1' onClick={()=>this.RequiredWalk("1")}style={{background : this.state.required_walk=="1" ? "#feef55" : " " , color : this.state.required_walk=="1" ? "#2b3440" : " "}}>1 Walk</div>
                     <div class="pet-req-list-item" id='2' onClick={()=>this.RequiredWalk("2")}style={{background : this.state.required_walk=="2" ? "#feef55" : " " , color : this.state.required_walk=="2" ? "#2b3440" : " "}}>2 Walk</div>
                     <div class="pet-req-list-item" id='3' onClick={()=>this.RequiredWalk("3")}style={{background : this.state.required_walk=="3" ? "#feef55" : " " , color : this.state.required_walk=="3" ? "#2b3440" : " "}}>3 Walk</div>
                  </div>
                  <div class="pet-daily-report">
                    <ul>
                      <li><img src="tick.png" /><span>Daily Walk Report</span></li>
                      <li><img src="tick.png" /><span>Money Back Guarantee</span></li>
                      <li><img src="tick.png" /><span>Professional Dog Walker Only</span></li>
                      <li><img src="tick.png" /><span>Secure Payment</span></li>
                      <li><img src="tick.png" /><span>Walk Distance</span></li>
                    </ul>
                  </div>
                  <div class="pet-gril-walk-img">
                     <img src="girl-dog-walk.png" />
                  </div>
                  <div class="pet-select-btn">
                      <button >Select Package</button>
                  </div>
              </div>
           </div>
        </div>
    </div>
    )
  }
}

export default WalkingPerDay