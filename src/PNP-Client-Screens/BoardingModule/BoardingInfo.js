import React, { Component } from 'react'
import '../CSS/BoardingCSS/BoardingInfo.css'
import Services from '../Services/Services';
import PetInteraction from '../EntryScreens/PetInteraction';

let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));

export class BoardingInfo extends Component {

  constructor(props){
    super(props);
  }

  state={
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

  boardingSuccess=()=>{
    const obj={
      client_id : userData.id,
      service_id : this.state.preview_data.service_id,
      pet_id : this.state.preview_data.pet_id,
      extra_addons : this.state.preview_data.extra_addons,
      from_date : this.state.preview_data.from_date,
      to_date : this.state.preview_data.to_date,
      latitude : this.state.preview_data.latitude,
      longitude : this.state.preview_data.longitude,
      message : this.state.message,
    }
    Services.getInstance().boardingBookings(obj).then((result)=>{
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

    Bookingpage=()=>{
        this.props.history.push({
            pathname : "/boarding-booking",
            back_preview_data : this.props.location.previewData,
            returned_back : "true"
          })
    }
  render() {
    console.log(this.state.preview_data);
    return (
      <div class="home-pnp prv">

        <div class="fltr-prv-hd">
            <img src="q-arrow.png" onClick={this.Bookingpage}/>
            <h3>Booking Summary</h3>
        </div>
        <div class="fltr-prv-cnt">
          {/* <span>Change</span> */}

          <div class="fltr-pet">
            <div class="fltr-pet-lft">
              <div class="fltr-pet-img">
                <img src="fltr-pet.png" />
              </div>
              <p>Your Pet</p>
            </div>
            <div class="fltr-pet-rht">
              <h5>{this.state.preview_data.pet_name}</h5>
            </div>
          </div>

          <div class="fltr-pet">
            <div class="fltr-pet-lft">
              <div class="fltr-pet-img">
                <img src="fltr-calndr.png" />
              </div>
              <p>Date</p>
            </div>
            <div class="fltr-pet-rht dt">
              <h5>{this.state.preview_data.from_date}</h5>
              <small>to</small>
              <h5>{this.state.preview_data.to_date}</h5>
            </div>
          </div>
          <div class="fltr-add-ons-prv">
            <h5>Add-Ons</h5>
           
            {this.state.preview_data.extra_addons && this.state.preview_data.extra_addons.length > 0 ?
                <div class="add-on-prv-list">
                  {this.state.preview_data.extra_addons && this.state.preview_data.extra_addons.length > 0 ? this.state.preview_data.extra_addons.map((data, index)=>{
                    return(
                      <div class="add-on-prv-item">
                      <img src="fltr-checked.png" />
                      <p>{data.name}</p>
                    </div>
                    )
                  }) : ""}

                </div>
                : ""}
            </div>
           
          <div class="fltr-prv-note">
            <h5>Additional Notes</h5>
            <div class="note-txt">
              <p>{this.state.preview_data.message}</p>
            </div>

          </div>

        </div>

        <div class="fltr-prv-btn">
          <button onClick={this.boardingSuccess}>Submit</button>
        </div>
      
      </div>
     
    )
  }
}

export default BoardingInfo