import React, { Component } from 'react'
import '../CSS/EntryCSS/MyBookings.css'
import Services from '../Services/Services';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from './DarkBackground';






let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));

export class MyBookings extends React.PureComponent {
  constructor(props){
    super(props);
  }
  state = {
    all_bookings : [],
    loading : false,
  }

  componentDidMount = () =>{

    if(navigator.onLine){
      this.setState({
        loading : true
      })
      const obj = {
        userId: userData.id
      }

      Services.getInstance().getClientBookings(obj).then((result)=>{
        this.setState({
          all_bookings : result,
          loading : false
        })
      })
    }
    else{
      this.props.history.push({
        pathname : "/internet"
      })
    }
  }

  goBack=()=>{
      this.props.history.push({
        pathname : "/homepage"
      })
    }



    ViewProfile = (booking) =>{
      const obj = {
        spId : booking.spId,
        photo : booking.spPhoto,
      }
      this.props.history.push({
        pathname : "/viewprofile",
        quote : obj,
      })
    }


    ReleaseAmount = (booking) =>{
      localStorage.setItem("client-active-booking",JSON.stringify(booking));
      this.props.history.push({
        pathname : "/activeDetails",
        confirm_data : booking,
      })
    }











  render() {
    return (
      <div>
        <div class="quotation-n-main">
      <div class="quotation-n-hd">
        <h4>My Bookings </h4>
        <img src="q-arrow.png" onClick={this.goBack}/>
      </div>
      <div class="qntn-n-profile-main">


      {this.state.all_bookings && this.state.all_bookings.length > 0 ? this.state.all_bookings.map((booking, index)=>{
        return(
          <div class="qntn-n-profile">
          
          <div class="qntn-n-lft">
            <img src={booking.spPhoto}/>
          </div>
          <div class="qntn-n-rht">
            
            <h6>{booking.spName}</h6>
            <span><img src="qntn-loc-icon.png"/>{booking.spCity}</span>

            <span class="loc-qntn"><img src="qntn-rtng-icon.png"/>{booking.spAvRating}</span>

            <div class="qntn-btns">
              <button class="qntn-vp" onClick={()=>this.ViewProfile(booking)}>View Profile</button>
              <button class="qntn-bns rp" onClick={()=>this.ReleaseAmount(booking)}>View Details</button>

            </div>
            {booking.pnpVerified == "0" ? "" : 
            <div class="qntn-strip">
              <img src="pnp-vrfd-strip.png"/>
            </div>
            }
            <div class="qntn-cost bkngs">
              <h5>₹{booking.packageCost}/-</h5>
              <span>Pkg.Cost</span>
            </div>

            <div class="qntn-srvc">
              <p>{booking.name}</p>
            </div>

          </div>



        </div>
        )
      }) : 

      <div class="no-ntfn nb">
        <img src='no-job-icon.png'/>
        <h5>No Bookings yet</h5>
        <p>Please book the service</p>
      </div>
      
      
      }


      </div>


    </div>
    <DarkBackground disappear={this.state.loading}>
            <LoadingOverlay
              active={true}
              spinner={true}
              text="Please Wait..."
            >
            </LoadingOverlay>
        </DarkBackground>



      </div>
    )
  }
}

export default MyBookings