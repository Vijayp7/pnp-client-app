import React, { Component } from 'react'
import '../CSS/WalkingCSS/WalkingInfo.css'
import Services from '../Services/Services';
import PetInteraction from '../EntryScreens/PetInteraction';

export class WalkingInfo extends Component {

  constructor(props){
    super(props);
  }

  state={
    message : "",
    preview_data : this.props.location.previewData,
    pet_Interaction_popup : false,
  }

  closedogPopUp = () =>{
		this.setState({
		  pet_Interaction_popup : false,
		})
	  }

  handleChange = e=>{
    const {name,value}= e.target;
    this.setState({
      [name]:value
    }
     ,()=>{console.log(this.state)}
    );
  }

  WalkSuccess=()=>{
    const obj={
      client_id : this.state.preview_data.client_id,
      service_id : this.state.preview_data.service_id,
      pet_id : this.state.preview_data.pet_id,
      package_id : this.state.preview_data.package_id,
      days_type : this.state.preview_data.days_type,
      day_walks : this.state.preview_data.day_walks,
      from_date : this.state.preview_data.from_date,
      to_date : this.state.preview_data.to_date,
      booking_time : this.state.preview_data.booking_time,
      latitude : this.state.preview_data.latitude,
      longitude : this.state.preview_data.longitude,
      message : this.state.message,
    }
    Services.getInstance().walkingBookings(obj).then((result)=>{
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
      pathname : "/walk-booking"
    })
  }







  render() {
    return (
      <div class="main-body">
            <div class="dog-book-head">
                <div class="x-icon" onClick={this.closeInfo}><img src="q-arrow.png" /></div> 
                <div class="heading"><h3>Booking Summary</h3></div>
            </div>
            <section class="pet-details">
              {/* <div class="pet-change-btn"><span> Change</span></div> */}
              <div class="pet-details-list">
                  <div class="pet-det-list-item">
                      <div class="pet-list-img-text">
                        <div class="pet-img">
                          <img src="dog.png" />
                        </div>
                        <div class="pet-text">
                          <p>Your Pet</p>
                        </div>                  
                      </div>
                      <div class="pet-list-zora">
                          <p>{this.state.preview_data.pet_name}</p>
                      </div>
                  </div>
                  <div class="pet-det-list-item">
                    <div class="pet-list-img-text">
                      <div class="pet-img">
                        <img src="dog-foot.png" />
                      </div>
                      <div class="pet-text">
                        <p>ServiceType</p>
                      </div>                  
                    </div>
                    <div class="pet-btn-text">
                      <div class="pet-list-package">
                        <p>{this.state.preview_data.package_name}</p>
                      </div>
                    </div>
                  </div>
                  {this.state.preview_data.days_type == "" ? <p></p> :
                  <div class="pet-det-list-item">
                    <div class="pet-list-img-text">
                      <div class="pet-img">
                        <img src="star2.png" />
                      </div>
                      <div class="pet-text">
                        <p>Service Day</p>
                      </div>                  
                    </div>
                    <div class="pet-btn-text">
                      <div class="pet-list-mon-sat">
                           <p>{this.state.preview_data.days_type}</p>
                      </div>
                    </div> 
                  </div>
                  }
                  <div class="pet-det-list-item">
                    <div class="pet-list-img-text">
                      <div class="pet-img">
                        <img src="belt-dog.png" />
                      </div>
                      <div class="pet-text">
                        <p>Required Walk</p>
                      </div>                  
                    </div>
                    <div class="pet-btn-text">
                      <div class="pet-list-times">
                          <p>{this.state.preview_data.day_walks}</p>
                      </div>
                    </div>
                  </div>             
              </div> 


              <div class="srvc-dtls-item tm">
                      <div class="srvc-dtls-item-lft">
                        <div class="srvc-dtls-pet-img">
                          <img src="srvc-dlts-img6.png" />
                        </div>
                        <h6>Your Preferable Date &amp; Time</h6>
                      </div>
              </div>

              <div class="p-time prv">

                      <div class="p-item">
                        <p>From</p>
                        <div class="trng-adons dt">
                          <div class="ad-ons-cst">
                            <span>{this.state.preview_data.from_date}</span>
                            <small></small>
                          </div>
                        </div>
                      </div>
                      <div class="p-item">
                        <p>To</p>
                        <div class="trng-adons dt">
                          <div class="ad-ons-cst">
                            <span>{this.state.preview_data.to_date}</span>
                            <small></small>
                          </div>
                        </div>
                      </div>

                    {this.state.preview_data.booking_time && this.state.preview_data.booking_time.length > 0 ? this.state.preview_data.booking_time.map((time,index)=>{
                      return(
                        <div class="p-item" key={index}>
                          {time.time > "05:00" && time.time < "12:00" ?
                            <div className='p2-time'>
                              <p>Morning</p>
                              <div class="trng-adons">
                                <div class="ad-ons-cst">
                                  <span>{time.time}</span>
                                </div>
                                <small>AM</small>
                              </div>
                            </div>
                          :
                          time.time > "12:00" && time.time< "17:00" ? 
                          <div className='p2-time'>
                              <p>Afternoon</p>
                              <div class="trng-adons">
                                <div class="ad-ons-cst">
                                  <span>{time.time}</span>
                                </div>
                                <small>PM</small>
                              </div>
                            </div>
                          :

                          <div className='p2-time'>
                              <p>Evening</p>
                              <div class="trng-adons">
                                <div class="ad-ons-cst">
                                  <span>{time.time}</span>
                                </div>
                                <small>PM</small>
                              </div>
                            </div>

                          }
                      </div>
                      )
                    }) : ""}
                    </div>






              <div class="pet-additional">
                  <h5>Additional notes*</h5>
                  <div class="pet-adtnl-textarea">
                     <textarea placeholder="e.g.."
                     name='message'
                     onChange={this.handleChange}
                     ></textarea>
                  </div>
              </div>
            </section>
            <section class="pet-sub-btn">
               <div class="pet-submit">
                  <button onClick={this.WalkSuccess}>Submit</button>
               </div>
            </section>
           
      </div>
       )
   }
}

export default WalkingInfo