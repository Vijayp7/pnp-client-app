import React, { Component } from 'react'
import '../CSS/GroomingCSS/GroomingInfo.css'
import Services from '../Services/Services';
import PetInteraction from '../EntryScreens/PetInteraction';





let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));
const longitude = localStorage.getItem(`serivce_provider_long`);
const latitude = localStorage.getItem(`serivce_provider_lat`);
let location = localStorage.getItem(`client-location`);



export class GroomingInfo extends Component {
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

  closeInfo = () =>{
    this.props.history.push({
      pathname : "/groom-booking"
    })
  }

  closedogPopUp = () =>{
    this.setState({
      pet_Interaction_popup : false,
    })
  }

  GroomSuccess=()=>{
    const obj={
      client_id : userData.id,
      service_id : this.state.preview_data.service_id,
      pet_id : this.state.preview_data.pet_id,
      booking_date : this.state.preview_data.booking_date,
      booking_time : this.state.preview_data.booking_time,
      package_id : this.state.preview_data.package_id,
      hair_cut : this.state.preview_data.hair_cut,
      general_addons : this.state.preview_data.general_addons,
      extra_addons :this.state.preview_data.extra_addons,
      latitude : latitude,
      longitude : longitude,
      message : this.state.message,
    }
    Services.getInstance().GroomingBookings(obj).then((result)=>{
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



  render() {
    console.log(this.state.preview_data);
    return (
        <div class="body_class">
        <div class="header_section2">
          <div class="logo" onClick={this.closeInfo}>
            <img src="q-arrow.png" />
          </div>
          <div class="logo_text">
            <h3>Booking Summary</h3>
          </div>
        </div>

        <div class="main_body">
          <div class="inside_design">
            <div class="parent_pet">
              <div class="change">
            {/* <span>Change</span> */}
              </div>
            </div>
            <div class="pet_info p-t">
              <div class="pet_img">
                <img src="my-pet.png" />
                <div class="pet_text">
                  <h4>Your Pet</h4>
                </div>
              </div>
              <div class="zoro">
                <span>{this.state.preview_data.pet_name}</span>
              </div>    
            </div>
            
          </div>
          <div class="package">
           
              <div class="pack_img">
                <img src="star.png" />
                  <div class="package_text">
                    <h4>Package</h4>
                  </div>
              </div>
            
          </div>
          <div class="basic_parent p-t">
            <div class="basic_info">
              <i class="fa fa-solid fa-check"></i>
              <div class="basic_text">
                <h4>{this.state.preview_data.package_name}</h4>
              </div>
            </div>
          </div>
          <div class="add_on p-t">
            <h4>General AddOn</h4>
          </div>
          <div class="three_tickets p-t">
            
          {this.state.preview_data.general_addons && this.state.preview_data.general_addons.length > 0 ?
              <div class="tickets">
                {this.state.preview_data.general_addons && this.state.preview_data.general_addons.length > 0 ? this.state.preview_data.general_addons.map((add, index)=>{
                    return(
                      <div class="clean_info" key={index}>
                      <i class="fa fa-solid fa-check"></i>
                      <div class="clean_text">
                        <h4>{add.name}</h4>
                      </div>
                    </div>
                    )
                })  : ""}
                </div>  
          :""}
                </div>
          <div class="add_on p-t">
            <h4>Add On</h4>
          </div>
          <div class="three_tickets p-t">
            <div class="tickets">
              <div class="clean_info">
                <i class="fa fa-solid fa-check"></i>
                <div class="clean_text">
                  <h4>{this.state.preview_data.hair_cut}</h4>
                </div>
              </div>

             

              {this.state.preview_data.extra_addons && this.state.preview_data.extra_addons.length > 0 ? this.state.preview_data.extra_addons.map((extra_addons,index)=>{
                return(
                  <div class="clean_info">
                  <i class="fa fa-solid fa-check"></i>
                  <div class="clean_text">
                    <h4>{extra_addons.name}</h4>
                  </div>
                </div>
                )
              }) : ""}
              {/* <div class="clean_info">
                <i class="fa fa-solid fa-check"></i>
                <div class="clean_text">
                  <h4>Tick Bath</h4>
                </div>
              </div> */}

            </div>
          </div>
          <div class="date_section">
            <div class="parent_date">
              <div class="img_date">
                <img src="ins-calender.png" />
                <div class="date">
                  <h4>Date</h4>
                </div>
              </div>
              <div class="date_info">
               <span>{this.state.preview_data.booking_date}</span>
              </div>
            </div>
          </div>
            <div class="time_section">
            <div class="parent_time">
              <div class="img_time">
                <img src="ins-clock.png" />
                <div class="date">
                  <h4>Your Prefferable Time</h4>
                </div>
              </div>
            </div>
          </div>



          <div class="p-time prv">
          {this.state.preview_data.booking_time < "12:00" ?
            <div class="p-item">
              <p>Morning</p>
              <div class="trng-adons">
                <div class="ad-ons-cst">
                <span>{this.state.preview_data.booking_time}</span>
              </div>
              <small>AM</small>
              </div>
            </div>
            :
            this.state.preview_data.booking_time >"12:00" && this.state.preview_data.booking_time < "17:00" ?
              <div class="p-item">
                <p>Afternoon</p>
                <div class="trng-adons">
                  <div class="ad-ons-cst">
                  <span>{this.state.preview_data.booking_time}</span>
                </div>
                <small>PM</small>
                </div>
              </div>
            :
              <div class="p-item">
                <p>Evening</p>
                <div class="trng-adons">
                  <div class="ad-ons-cst">
                  <span>{this.state.preview_data.booking_time}</span>
                </div>
                <small>PM</small>
                </div>
              </div>
          }
          </div>



          <div class="additional">
            <div class="note">
              <h4>Additional Notes</h4>
            </div>
          </div>
          <div class="eg_section">
            <textarea 
              placeholder="e.g.."
              name='message'  
              onChange={this.handleChange}
              >
              </textarea>
          </div>
  
        </div>

         <div class="button">
            <button onClick={this.GroomSuccess}>Submit</button>
          </div>

          
  
      </div>
    )
  }
}

export default GroomingInfo