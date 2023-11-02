import React, { Component } from 'react'
import '../CSS/TrainingCSS/TrainingInfo.css'
import Services from '../Services/Services';
import PetInteraction from '../EntryScreens/PetInteraction';







let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));
const longitude = localStorage.getItem(`serivce_provider_long`);
const latitude = localStorage.getItem(`serivce_provider_lat`);
let location = localStorage.getItem(`client-location`);


export class TrainingInfo extends Component {
  constructor(props){
    super(props);
  }

  state = {
    message : "",
    preview_data : this.props.location.previewData,
    pet_Interaction_popup : false,
  }
  handleChange = e=>{
    const {name,value}= e.target;
    this.setState({
      [name]:value
    }
     ,()=>{console.log(this.state)}
    );
  }

  closedogPopUp = () =>{
    this.setState({
      pet_Interaction_popup : false,
    })
  }


  TrainSuccess=()=>{
    const obj={
      client_id : userData.id,
      service_id : this.state.preview_data.service_id,
      pet_id : this.state.preview_data.pet_id,
      package_id : this.state.preview_data.package_id,
      extra_addons : this.state.preview_data.extra_addons,
      booking_date : this.state.preview_data.booking_date,
      booking_time : this.state.preview_data.booking_time,
      latitude : latitude,
      longitude : longitude,
      message : this.state.message,
    }
    Services.getInstance().trainingBookings(obj).then((result)=>{
      console.log(result);
      if(result.status === true) {
        this.props.history.push({
          pathname : "/quotation"
        })
       
      }
      else if(result.status === false){
        this.setState({
          error_messgae: result.msg,
        })
       
      }
    })
  }


  closeInfo = () =>{
    this.props.history.push({
      pathname : "/train-booking"
    })
  }


  render() {
    return (
        <div class="body_section">
        <div class="header_section2">
          <div class="logo_symbol" onClick={this.closeInfo}>
            <img src="q-arrow.png" />
          </div>
          <div class="symbol_text">
            <h4>Booking Summary</h4>
          </div>
        </div>
        <div class="body_page">
          <div class="design_inside">
            <div class="pet_parent">
              <div class="change_txt">
                {/* <span>Change</span> */}
              </div>
            </div>
            <div class="pets_inform">
              <div class="pet_imgs">
                <img src="dog_img.png" />
                <div class="pet_text">
                  <h4>Your Pet</h4>
                </div>
              </div>
              <div class="zoro_txt">
                <span>{this.state.preview_data.pet_name}</span>
              </div>    
            </div>
          </div>
           <div class="packageble">
            <div class="package">
              <div class="pack_image">
                <img src="star.png" />
                  <div class="pack_txt">
                    <h4>Package</h4>
                  </div>
              </div>
            </div>
          </div>
          <div class="parent_basic">
            <div class="info_basic">
              <i class="fa fa-solid fa-check"></i>
              <div class="basic_txt">
                <h4>{this.state.preview_data.package_name}</h4>
              </div>
            </div>
          </div>

          {/* <div class="add_on p-t">
            <h4>General AddOn</h4>
          </div> */}
          {/* <div class="two_tickes p-t">
              <div class="tickes">
          <div class="info_clean">
                        <i class="fa fa-solid fa-check"></i>
                      <div class="clean_txt">
                          <h4>{this.state.preview_data.general_addons}</h4>
                      </div>
                </div>
                </div>
                </div> */}


          <div class="add_on p-t">
              <h4>Add On</h4>
            </div>
            <div class="two_tickes p-t">
                <div class="tickes">
                  {this.state.preview_data.general_addons && this.state.preview_data.general_addons.length > 0 ? this.state.preview_data.general_addons.map((general_addons,index)=>{
                      return(
                        <div class="info_clean">
                          <i class="fa fa-solid fa-check"></i>
                        <div class="clean_txt">
                            <h4>{general_addons.name}</h4>
                        </div>
                  </div>
                      )
                  }) : " "}
                  
                  
                </div>
          </div>    

          <div class="add_on p-t">
            <h4>Add On</h4>
          </div>
           <div class="two_tickes p-t">
              <div class="tickes">
                {this.state.preview_data.extra_addons && this.state.preview_data.extra_addons.length > 0 ? this.state.preview_data.extra_addons.map((extra_addons,index)=>{
                    return(
                      <div class="info_clean">
                        <i class="fa fa-solid fa-check"></i>
                      <div class="clean_txt">
                          <h4>{extra_addons.name}</h4>
                      </div>
                </div>
                    )
                }) : " "}
                
                
              </div>
            </div>
            <div class="section_date">
              <div class="date_parent">
                <div class="date_img">
                  <img src="ins-calender.png" />
                  <div class="date_txt">
                    <h4>Date</h4>
                  </div>
                </div>
                <div class="info_date">
                 <span>{this.state.preview_data.booking_date}</span>
                </div>
              </div>
            </div>
            <div class="section_time">
              <div class="time_parent">
                <div class="time_img">
                  <img src="ins-clock.png" />
                  <div class="date_txt">
                    <h4>Time</h4>
                  </div>
                </div>
                <div class="info_date">
                 <span>{this.state.preview_data.booking_time}</span>
                </div>
              </div>
            </div>
            <div class="additional_txt">
              <div class="notes_txt">
                <h4>Additional Note*</h4>
                <textarea 
                  placeholder="e.g.."
                  name='message'  
                  onChange={this.handleChange}
                >
              </textarea>
            </div>
          </div>
           
        </div>
        <div class="button_txt">
          <button onClick={this.TrainSuccess}>Submit</button>
        </div>

      </div>
    )
  }
}

export default TrainingInfo