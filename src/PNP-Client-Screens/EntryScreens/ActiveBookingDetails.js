import React, { Component } from 'react'
import '../CSS/EntryCSS/ConfirmationViewDetails.css'
import Services from '../Services/Services';
import ReleasePayment from './ReleasePayment';
import PaymentAlert from './PaymentAlert';
import LoadingSymbol from './LoadingSymbol';
import ReleaseSuccess from './ReleaseSuccess';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from './DarkBackground';






let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));
const activeJob = JSON.parse(localStorage.getItem("client-active-booking"));

export class ActiveBookingDetails extends React.PureComponent {
  constructor(props){
    super(props);
  }

  state={
    confirm_data : this.props.location.confirm_data,
    ClientBookingDetails : {},
    title : "",
    open_release_payment : false,
    service_id : "",
    selected_breakdownID : "",
    addons : [],
    genaddons : [],
    payment_alert : false,
    open_success : false,
    loading : false
  }

  componentDidMount=()=>{
    if(navigator.onLine){
        this.setState({
          loading : true
        })
        console.log(this.state.confirm_data)
        if(this.state.confirm_data != undefined){
          const obj={
            userId : userData.id,
            bookingId : this.state.confirm_data.bookingId,
            serviceId : this.state.confirm_data.serviceId,
          }
          Services.getInstance().getClientBookingDetails(obj).then((result)=>{
            this.setState({
              ClientBookingDetails : result,
              addons : result.addons,
              genaddons : result.genAddon,
              title : result.packName,
              loading : false
            })
            console.log(result);
        })
      }
      else{
        this.setState({
          confirm_data : activeJob
        },()=>{
          const obj={
            userId : userData.id,
            bookingId : this.state.confirm_data.bookingId,
            serviceId : this.state.confirm_data.serviceId,
          }
          Services.getInstance().getClientBookingDetails(obj).then((result)=>{
            this.setState({
              ClientBookingDetails : result,
              addons : result.addons,
              genaddons : result.genAddon,
              title : result.packName,
              loading : false
            })
            console.log(result);
        })
        })
      }
    }
    else{
      this.props.history.push({
        pathname : "/internet"
      })
    }


  }
  
    homepage=()=>{
        this.props.history.push({
            pathname : "/homepage"
        })
    }

    openReleasePayment = (id) =>{
      this.setState({
        service_id : id
      })
      if(id == "3"){
        document.getElementById("training-breakdowns").style.display = "block";
        this.setState({
          service_id : id
        })
      }
      else{
        this.setState({
          open_release_payment : true,
          service_id : id
        })
      }

    }




    viewDetails = (f_booking) =>{
      const obj = {
        spId : f_booking.spId,
        photo : f_booking.spPhoto
      }
      this.props.history.push({
        pathname : "/viewprofile",
        quote : obj
      })
    }




    openPayment = (breakdown_id, data, total_amount) =>{

      let req_amt=0;
      for(let i=0; i<data.length; i++){
        req_amt = Number(req_amt) + Number(data[i].amount);
      }
      if(req_amt == Number(total_amount)){
        this.setState({
          selected_breakdownID : breakdown_id,
          open_release_payment : true,
        })

      }
      else{
        this.setState({
          loading : true,
        })
        const obj = {
          serviceId : this.state.ClientBookingDetails.serviceId,
          bookingId : this.state.ClientBookingDetails.bookingId,
          quotId : this.state.ClientBookingDetails.quotId,
          spId : this.state.ClientBookingDetails.spId,
          clientId : this.state.ClientBookingDetails.clientId,
          brackDownId : breakdown_id,
          rating : "",
          comment : ""
      }
      Services.getInstance().releasePayment(obj).then((result)=>{
          console.log(result);
          this.setState({
            loading : false,
          })
          if(result[0]=="Updated"){
            const obj1 = {
              notification: {
                title: "Petsfolio",
                body: userData.name + " has released a payment and it will be credited in your account with in 24 hrs",
                sound: "default"
                },
                to: this.state.ClientBookingDetails.device_token
              }
              Services.getInstance().SendBookingNotificationToSP(obj1).then((result)=>{
                console.log(result);
              })
            this.setState({
              err_message : "Payment has been released already",
              loading : false,
              open_success : true,
          })
          }

      })
      }

    }



    moveToHome = () =>{
      this.props.history.push({
       pathname : "/homepage"
      })
   }



    closePopUp = () =>{
      this.setState({
        open_release_payment : false,
      })
    }



    rejectPayment = (breakdown_id) =>{
      this.setState({
        loading : true
      })
      const obj = {
        bookingId : this.state.ClientBookingDetails.bookingId,
        quotId : this.state.ClientBookingDetails.quotId,
        brackId : breakdown_id
      }
      console.log(obj);
      Services.getInstance().deleteTrainingBreakDown(obj).then((result)=>{
        console.log(result);
        if(result[0]=="Updated"){
          this.setState({
            err_message : "Request has been sent",
            loading : false
        }
        , ()=>{
          const timeout = setTimeout(() => {
                this.props.history.push({
                    pathname : "/homepage"
                })
            
        }, 2000);
        }
        )
        }

    })
      
    }


  render() {
    return (
      <div>
         <div class="quotation-n-main">
      <div class="quotation-n-hd">
          <h4>{this.state.title} Details</h4>
        <img src="q-arrow.png" onClick={this.homepage}/>
      </div>

      <div class="srvc-dtls-main sd-n">
          
            <div class="sd-pckg">
              
              <div class="sd-pckg-item">
                <div class="sd-pckg-item-lft">
                  <div class="sd-pckg-pet-img">
                    <img src="star-icon.png"/>
                  </div>
                  <h6>Package</h6>
                </div>
                <div class="sd-pckg-item-rht">
                  <div class="sd-pckg-item-img">
                    <img src="pckg-check-icon.png"/>
                  </div>
                  <h5>{this.state.ClientBookingDetails.packName}</h5>
                </div>
              </div>

              <div class="sd-pckg-item cost">
                <div class="sd-pckg-item-lft">
                  <div class="sd-pckg-pet-img">
                    <img src="sd-cash-icon.png"/>
                  </div>
                  <h6>Cost</h6>
                </div>
                <div class="sd-pckg-item-rht">
                  <h5>{this.state.ClientBookingDetails.cost}/-</h5>
                </div>
              </div>

              <div class="rqst-pymnt" onClick={()=>this.openReleasePayment(this.state.ClientBookingDetails.serviceId)}>
                <button>Release Payment</button>
              </div>


            </div>

            <div style={{backgroundColor : "#f5f5f5", display : "none",borderRadius : "20px"}} id='training-breakdowns'>

            <div class="sd-pckg ar">
                  <div class="ad-pckg-hd">
                    <div class="ad-pckg-lft"><p>No.of Sessions</p></div>
                    <div class="ad-pckg-rht"><p>Amount Request</p></div>
                  </div>

                 {this.state.ClientBookingDetails.brackDown && this.state.ClientBookingDetails.brackDown.length > 0 ? this.state.ClientBookingDetails.brackDown.map((breakdown, index)=>{
                  return(
                  //   <div class="sd-pckg-item cost">
                  //     <div class="sd-pckg-item-lft">
                  //       <div class="sd-pckg-pet-img">
                  //         <img src="sd-cash-icon.png"/>
                  //       </div>
                  //       <h6>{breakdown.amount}</h6>
                  //     </div>
                  //   <div class="rqst-pymnt" onClick={()=>this.openPayment(breakdown.id)} >
                  //   <button style={{backgroundColor : "green", width: "90px", minHeight:"30px"}}>Release</button>
                  // </div>
                  // </div>

                  <div class="ad-pckg-cnt">
                    <div class="ad-pckg-cnt-lft">
                      <p>{breakdown.sessions}</p>
                    </div>
                    <div class="ad-pckg-cnt-rht">
                      <span>{breakdown.amount}/-</span>
                      {breakdown.status == "1" ? 
                      <div class="ad-pckg-cnt-btns">
                        <button class="rjct" onClick={()=>this.rejectPayment(breakdown.id)}>Reject</button>
                        <button class="rls rls-btn" onClick={()=>this.openPayment(breakdown.id, this.state.ClientBookingDetails.brackDown, this.state.ClientBookingDetails.cost)}>Release</button>
                      </div>
                        :
                      <div class="ad-pckg-cnt-btns">
                        <button class="rjct" >Released</button>
                        <small>{breakdown.dateCreate}</small>
                      </div>
                      }
                    </div>
                  </div>

                  )
                 }) : "Payment request is not received yet"} 

                  { this.state.loading === true ? <LoadingSymbol /> : "" } 
                  <p style={{margin:"0 auto", textAlign:"center", color :"#ee8838"}}>{this.state.err_message}</p> 

              
            </div>
          
              
            </div>


            <h3>Pet Details</h3>

            <div class="sd-pet-details">

              <div class="sd-pet-details-item">
                <div class="sd-pet-details-lft">
                  <div class="sd-pet-details-img">
                    <img src="star-icon.png"/>
                  </div>
                  <h6>Pet Name</h6>
                </div>
                <div class="sd-pet-details-rht">
                  <h5>{this.state.ClientBookingDetails.petName}</h5>
                </div>
              </div>
              <div class="sd-pet-details-item">
                <div class="sd-pet-details-lft">
                  <div class="sd-pet-details-img">
                    <img src="srvc-dlts-img3.png"/>
                  </div>
                  <h6>Breed</h6>
                </div>
                <div class="sd-pet-details-rht">
                  <h5>{this.state.ClientBookingDetails.breed}</h5>
                </div>
              </div>
              
              <div class="sd-pet-details-item">
                <div class="sd-pet-details-lft">
                  <div class="sd-pet-details-img">
                    <img src="age-icon.png"/>
                  </div>
                  <h6>Age</h6>
                </div>
                <div class="sd-pet-details-rht">
                  <h5>{this.state.ClientBookingDetails.age}</h5>
                </div>
              </div>
              {/* {pre.bookingTime == ""?  
                      <div class="b-sumry-item">
                        <p>Time</p>
                        <span>{pre.fromTime}</span>
                      </div>
                        :
                      <div class="b-sumry-item">
                        <p>Time</p>
                        <span>{pre.bookingTime }</span>
                      </div>
                    } */}
                    {this.state.ClientBookingDetails.session > 0 ?
                    <div class="sd-pet-details-item">
                    <div class="sd-pet-details-lft">
                      <div class="sd-pet-details-img">
                        <img src="session-icon.png"/>
                      </div>
                      <h6>Session</h6>
                    </div>
                    <div class="sd-pet-details-rht">
                      <h5>{this.state.ClientBookingDetails.session}</h5>
                    </div>
                  </div>
                  
                  :""}
              
              <div class="sd-pet-details-item tm">
                <div class="sd-pet-details-lft">
                  <div class="sd-pet-details-img clndr">
                    <img src="srvc-dlts-img5.png"/>
                  </div>
                  <h6>Selected Preferable Date & Time</h6>
                </div>               
              </div>
              <div class="p-time prv">
              <div class="p-item">
                  <p>From</p>
                  <div class="trng-adons dt">
                    <div class="ad-ons-cst">
                      <span>{this.state.ClientBookingDetails.bookingDate}</span>
                      <small></small>
                    </div>
                  </div>
                </div>
                {this.state.ClientBookingDetails.toDate == "" ? "" : 
                <div class="p-item">
                  <p>To</p>
                  <div class="trng-adons dt">
                    <div class="ad-ons-cst">
                      <span>{this.state.ClientBookingDetails.toDate}</span>
                      <small></small>
                    </div>
                  </div>
                </div>
                }
              {this.state.ClientBookingDetails.bookingTime == "" ? "" : 
                <div class="p-item">
                  {this.state.ClientBookingDetails.bookingTime > "00:00" && this.state.ClientBookingDetails.bookingTime < "12:00" ? 
                    <p>Morning</p>:
                    this.state.ClientBookingDetails.bookingTime < "17:00" && this.state.ClientBookingDetails.bookingTime > "12:00" ?
                    <p>Afternoon</p> :
                    <p>Evening</p>

                  }
                  <div class="trng-adons dt">
                    <div class="ad-ons-cst">
                      {this.state.ClientBookingDetails.bookingTime > "00:00" && this.state.ClientBookingDetails.bookingTime < "12:00" ? 
                      <span>{this.state.ClientBookingDetails.bookingTime} AM</span> :
                      <span>{this.state.ClientBookingDetails.bookingTime} PM</span>
                      }
                      <small></small>
                    </div>
                  </div>
                </div>
                }


              {this.state.ClientBookingDetails.spmorning == "" ? "" : 
                <div class="p-item">
                  {this.state.ClientBookingDetails.spmorning > "00:00" && this.state.ClientBookingDetails.spmorning < "12:00" ? 
                    <p>Morning</p>:
                    this.state.ClientBookingDetails.spmorning < "17:00" && this.state.ClientBookingDetails.spmorning > "12:00" ?
                    <p>Afternoon</p> :
                    <p>Evening</p>
                  }
                  <div class="trng-adons dt">
                    <div class="ad-ons-cst">
                      {this.state.ClientBookingDetails.spmorning > "00:00" && this.state.ClientBookingDetails.spmorning < "12:00" ? 
                      <span>{new Date('1970-01-01T' + (this.state.ClientBookingDetails.spmorning) + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})}</span> :
                      <span>{new Date('1970-01-01T' + (this.state.ClientBookingDetails.spmorning) + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})}</span> 
                      }
                      <small></small>
                    </div>
                  </div>
                </div>
                }


              {this.state.ClientBookingDetails.spafternoon == "" ? "" : 
                <div class="p-item">
                  {this.state.ClientBookingDetails.spafternoon > "00:00" && this.state.ClientBookingDetails.spafternoon < "12:00" ? 
                    <p>Morning</p>:
                    this.state.ClientBookingDetails.spafternoon < "17:00" && this.state.ClientBookingDetails.spafternoon > "12:00" ?
                    <p>Afternoon</p> :
                    <p>Evening</p>
                  }
                  <div class="trng-adons dt">
                    <div class="ad-ons-cst">
                      {this.state.ClientBookingDetails.spafternoon > "00:00" && this.state.ClientBookingDetails.spafternoon < "12:00" ? 
                      <span>{new Date('1970-01-01T' + (this.state.ClientBookingDetails.spafternoon) + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})}</span> :
                      <span>{new Date('1970-01-01T' + (this.state.ClientBookingDetails.spafternoon) + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})}</span>
                      }
                      <small></small>
                    </div>
                  </div>
                </div>
                } 


              {this.state.ClientBookingDetails.spevening == "" ? "" : 
                <div class="p-item">
                  {this.state.ClientBookingDetails.spevening > "00:00" && this.state.ClientBookingDetails.spevening < "12:00" ? 
                    <p>Morning</p>:
                    this.state.ClientBookingDetails.spevening < "17:00" && this.state.ClientBookingDetails.spevening > "12:00" ?
                    <p>Afternoon</p> :
                    <p>Evening</p>
                  }
                  <div class="trng-adons dt">
                    <div class="ad-ons-cst">
                      {this.state.ClientBookingDetails.spevening > "00:00" && this.state.ClientBookingDetails.spevening < "12:00" ? 
                      <span>{new Date('1970-01-01T' + (this.state.ClientBookingDetails.spevening) + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})}</span> :
                      <span>{new Date('1970-01-01T' + (this.state.ClientBookingDetails.spevening) + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})}</span>
                      }
                      <small></small>
                    </div>
                  </div>
                </div>
                }






              </div>


              {this.state.addons.length > 0 || this.state.genaddons.length > 0 ?
              <div>

                <div class="sd-pet-details-item ve">
                  <div class="sd-pet-details-lft">
                    <div class="sd-pet-details-img">
                      <img src="session-icon.png" />
                    </div>
                    <h6>Package Includes</h6>
                  </div>
                  <div class="sd-pet-details-rht drpdwn" >
                    <h5 class="a-shw" id='view-btn' style={{display : "block"}}
                    onClick={
                      ()=>{
                        if(this.state.addons.length > 0){
                          document.getElementById("f-add-ons").style.display = "block";
                        }
                        if(this.state.genaddons.length > 0){
                          document.getElementById("f-genadd-ons").style.display = "block"
                        }
                        document.getElementById("view-btn").style.display = "none";
                        document.getElementById("hide-btn").style.display = "block";
                      }
                    }>View</h5>
                    <h5 class="a-shw" id='hide-btn' style={{display : "none"}}
                    onClick={
                      ()=>{
                        if(this.state.addons.length > 0){
                          document.getElementById("f-add-ons").style.display = "none";
                        }
                        if(this.state.genaddons.length > 0){
                          document.getElementById("f-genadd-ons").style.display = "none";
                        }
                        document.getElementById("view-btn").style.display = "block";
                        document.getElementById("hide-btn").style.display = "none";
                      }
                    }>Hide</h5>
                  </div>
                </div>

              {/* {this.state.genaddons} */}

              {this.state.genaddons && this.state.genaddons.length > 0 ?
                <div class="add-on-prv-list shw" id='f-genadd-ons' style={{display : "none", marginBottom: "5px"}}>
                {this.state.genaddons && this.state.genaddons.length > 0 ?
                    this.state.genaddons.map(str => {
                          return(
                            <div class="add-on-prv-item">
                            <img src="fltr-checked.png" />
                            <p>{str}</p>
                          </div>
                          )
                        })
                      
                  : ""}
                </div>
                : ""}

            {this.state.addons && this.state.addons.length > 0 ?
                <div class="add-on-prv-list shw" id='f-add-ons' style={{display : "none"}}>
                  {this.state.addons && this.state.addons.length > 0 ?
                    this.state.addons.map(str => {
                        return(
                          <div class="add-on-prv-item">
                          <img src="fltr-checked.png" />
                          <p>{str}</p>
                        </div>
                        )
                      })
                  
                  : ""}
                
                  </div>
            : ""}
              </div>
              : "" }




            </div>
























            <h3>Service Provider Details</h3>



            <div class="sd-pet-details sd-prvdr">

              <div class="sd-pet-details-item">
                <div class="sd-pet-details-lft">
                  <div class="sd-pet-details-img">
                    <img src="man-icon.png"/>
                  </div>
                  <h6>{this.state.ClientBookingDetails.spDetails}</h6>
                </div>
                <div class="sd-pet-details-rht" onClick={()=>this.viewDetails(this.state.ClientBookingDetails)}>
                  <h5>View Details</h5>
                </div>
              </div>
              <div class="sd-pet-details-item">
                <div class="sd-pet-details-lft">
                  <div class="sd-pet-details-img">
                    <img src="call-icon.png"/>
                  </div>                 
                  <h6>{this.state.ClientBookingDetails.spnumber}</h6>
                </div>
               
                <div class="sd-pet-details-rht call">
                  <h5> <a href={"tel:"+this.state.ClientBookingDetails.spnumber} onClick={this.start}>Call</a></h5>
                </div>
              </div>

            </div>

          {this.state.open_release_payment ? 
            <ReleasePayment
              serviceId = {this.state.ClientBookingDetails.serviceId}
              bookingId = {this.state.ClientBookingDetails.bookingId}
              quotId = {this.state.ClientBookingDetails.quotId}
              spId = {this.state.ClientBookingDetails.spId}
              clientId = {this.state.ClientBookingDetails.clientId}
              brackDownId = {this.state.ClientBookingDetails.brackDown}
              closePopUp = {this.closePopUp}
              selected_breakdownID ={this.state.selected_breakdownID}
              token = {this.state.ClientBookingDetails.device_token}

            />
            : "" }



          {this.state.open_success ? 
            <ReleaseSuccess
              moveToHome =  {this.moveToHome} 
          /> : ""}



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

export default ActiveBookingDetails