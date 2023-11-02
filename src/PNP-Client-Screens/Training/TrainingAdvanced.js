import React, { Component } from 'react'
import '../CSS/TrainingCSS/TrainingAdvanced.css'


export class TrainingAdvanced extends Component {
  constructor(props){
    super(props);
  }
  state={
    AdvCountClicks:0,
  }


 AdvAddExtras=(id,Adv_Count_Clicks)=>{
    if(id=="sniff" && Adv_Count_Clicks%2==0){
      document.getElementById(id).style.background = "#5fc2ed";
      this.setState({
        AdvCountClicks : Adv_Count_Clicks+1
      })
    }else{
      document.getElementById(id).style.background = "#fff";
      this.setState({
        AdvCountClicks : Adv_Count_Clicks+1
      })
    }
  }


  render() {
    return (
        <div class="traning_body">
        <div class="traning_slide">
          <div class="traning_text">
            <h3>Advance Training</h3>
          </div>
        </div>
        <div class="clouds_places">
          <div class="clouds_imgs">
            <img src="white-cloud.png" />
          </div>
          <div class="circle_img">
            <h3>15999/-<br/><strong>30 Session</strong></h3>
          </div> 
        </div>
          <div class="cloud_img-1">
            <img src="cloud-small-1.png" />
          </div>
         
          <div class="traning_tips">
            <div class="traning_tip1">
              <div class="traning_list">
                <i class="fa fa-solid fa-check"></i><span>Sit</span>
              </div>
              <div class="traning_list">
                <i class="fa fa-solid fa-check"></i><span>Stand/stay</span>
              </div>
              <div class="traning_list">
                <i class="fa fa-solid fa-check"></i><span>Come</span>
              </div>
              <div class="traning_list">
                <i class="fa fa-solid fa-check"></i><span>Fetch & Drop</span>
              </div>
              <div class="traning_list">
                <i class="fa fa-solid fa-check"></i><span>Spin</span>
              </div>
              <div class="traning_list">
                <i class="fa fa-solid fa-check"></i><span>Hi Fi</span>
              </div>
              <div class="traning_list">
                <i class="fa fa-solid fa-check"></i><span>Heal Walk</span>
              </div>
              <div class="traning_list">
                <i class="fa fa-solid fa-check"></i><span>Shake hand</span>
              </div>
              <div class="traning_list">
                <i class="fa fa-solid fa-check"></i><span>Jumping Control</span>
              </div>
            </div>
            <div class="traning_tip2">
              <div class="traning_list">
                <i class="fa fa-solid fa-check"></i><span>Sit</span>
              </div>
               <div class="traning_list">
                <i class="fa fa-solid fa-check"></i><span>Stand</span>
              </div>
               <div class="traning_list">
                <i class="fa fa-solid fa-check"></i><span>Pee & Poo</span>
              </div>
               <div class="traning_list">
                <i class="fa fa-solid fa-check"></i><span>Rset</span>
              </div>
               <div class="traning_list">
                <i class="fa fa-solid fa-check"></i><span>Sleep</span>
              </div>
               <div class="traning_list">
                <i class="fa fa-solid fa-check"></i><span>Down</span>
              </div>
            </div>
            <div class="traning-tip3">
              <div class="traning_images">
                <img src="Vector-img.png" />
              </div>
            </div>
          </div>
          <div class="cloud-img-2">
              <img src="cloud-small-2.png" />
          </div>
          <div class="extra_add">
            <h3>Add Extra</h3>
              <div class="traning_lists">
                <div class="list_train" id='sniff' onClick={()=>this.ObdAdvAddExtras("sniff" , this.state.AdvCountClicks)} style={{background : this.state.AdvCountClicks == "sniff" ? "#ffb3cf" : " "} }>Sniff</div>
                <div class="list_train">Search</div>
                <div class="list_train">Watch</div>
                <div class="list_train">Roll over</div>
                <div class="list_train">Crawl</div>
                <div class="list_train">Lie Down</div>
                <div class="list_train">Dont Eat</div>
                <div class="list_train">Gaurd</div>
                <div class="list_train">Dont Jump</div>
                <div class="list_train">Hurdle Jump</div>
                <div class="list_train">Cross Walk</div>
                <div class="list_train">Focus Heal</div>
                <div class="list_train">Walk in B/w the Legs</div>
                <div class="list_train">Eat</div>
              </div>
          </div>
        <div class="select_packages">
          <button>Select Package</button>
        </div>
      </div>
  
    )
  }
}

export default TrainingAdvanced