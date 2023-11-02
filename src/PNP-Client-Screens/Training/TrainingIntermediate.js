import React, { Component } from 'react'
import '../CSS/TrainingCSS/TrainingIntermediate.css'

export class TrainingIntermediate extends Component {
  constructor(props){
    super(props);
  }
  state={
    
    IntCountClicks:0,
    
  }
  ObdIntAddExtras=(id,Int_Count_Clicks)=>{
   
    if(id=="aggressive_correction" && Int_Count_Clicks%2==0){
      document.getElementById(id).style.background = "#ffb3cf";
      this.setState({
        IntCountClicks : Int_Count_Clicks+1
      })
    }else{
      document.getElementById(id).style.background = "#fff";
      this.setState({
        IntCountClicks : Int_Count_Clicks+1
      })
    }
  }  
   

  render() {
    return (
        <div class="slide_body">
        <div class="parent_slide">
          <div class="traning">
            <h3>Intermediate Training</h3>
          </div>
        </div>
        <div class="main-cnt">
          <div class="clouds">
            <div class="clouds_img">
              <img src="white-cloud.png" />
            </div>
            <div class="circle">
              <h3>12999/-<br/><strong>20 Session</strong></h3>
            </div> 
          </div>
          <div class="cloud-1">
            {/* <img src="cloud-small-1.png" /> */}
          </div>
          <div class="traning_skills">
            <div class="traning_steps1">
              <div class="traning_steps">
                <i class="fa fa-solid fa-check"></i><span>Leash Walk</span>
              </div>
              <div class="traning_steps">
                <i class="fa fa-solid fa-check"></i><span>Sit/Stay</span>
              </div>
              <div class="traning_steps">
                <i class="fa fa-solid fa-check"></i><span>Stand/stay</span>
              </div>
              <div class="traning_steps">
                <i class="fa fa-solid fa-check"></i><span>Rest</span>
              </div>
              <div class="traning_steps">
                <i class="fa fa-solid fa-check"></i><span>Sleep</span>
              </div>
              <div class="traning_steps">
                <i class="fa fa-solid fa-check"></i><span>Hi Fi</span>
              </div>
              <div class="traning_steps">
                <i class="fa fa-solid fa-check"></i><span>Excssive Barking</span>
              </div>
              <div class="traning_steps">
                <i class="fa fa-solid fa-check"></i><span>Shake hand</span>
              </div>
              <div class="traning_steps">
                <i class="fa fa-solid fa-check"></i><span>Jumping Control</span>
              </div>
            </div>
            <div class="traning_steps2">
              <div class="traning_steps">
                <i class="fa fa-solid fa-check"></i><span>Down</span>
              </div>
               <div class="traning_steps">
                <i class="fa fa-solid fa-check"></i><span>Stand</span>
              </div>
               <div class="traning_steps">
                <i class="fa fa-solid fa-check"></i><span>Pee & Poo</span>
              </div>
               <div class="traning_steps">
                <i class="fa fa-solid fa-check"></i><span>Rset</span>
              </div>
               <div class="traning_steps">
                <i class="fa fa-solid fa-check"></i><span>Sleep</span>
              </div>
               <div class="traning_steps">
                <i class="fa fa-solid fa-check"></i><span>Sit</span>
              </div>
            </div>
            <div class="traning-step3">
              <div class="traning_img">
                <img src="traning_img.png" />
              </div>
            </div>
          </div>
          <div class="cloud-2">
              <img src="cloud-small-2.png" />
          </div>
          <div class="add_extra">
            <h3>Add Extra</h3>
              <div class="carring_lists">
                <div class="list" id='aggressive_correction' onClick={()=>this.ObdIntAddExtras("aggressive_correction" , this.state.IntCountClicks)} style={{background : this.state.IntCountClicks == "aggressive_correction" ? "#ffb3cf" : " "} }>Aggressive Correction</div>
                <div class="list">Hyper Active</div>
                <div class="list">Seperation Anxities</div>
                <div class="list">Fear Anxities</div>
                <div class="list">Growling</div>
                <div class="list">Lunging</div>
                <div class="list">Socilazitation With pets and Human</div>
              </div>
          </div>
        </div>
        <div class="package_btn">
          <button>Select Package</button>
        </div>
  
        
  
      </div>
    )
  }
}

export default TrainingIntermediate