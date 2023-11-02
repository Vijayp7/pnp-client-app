import React, { Component } from 'react'
import '../CSS/EntryCSS/Quotation.css'
import Services from '../Services/Services';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PullToRefresh from 'react-simple-pull-to-refresh';
import Footer from './Footer';
import ResendQuotationPopup from '../EntryScreens/ResendQuotationPopup';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from './DarkBackground';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import DogsList from './DogList2';
import { prettyDOM } from '@testing-library/react';


let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));
let selected_pet_id = localStorage.getItem(`selected-pet-id`);
let selected_booking_id = localStorage.getItem(`selected-booking-id`);


export class Quotation extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    quotations: [],
    Service: [],
    Preview: [],
    service_id_1: "",
    dog_selected: false,
    bookingId_1: "",
    resend_popup: false,
    breed_type:"",
    quote_text: "Please Select the Pet for more details..",
    tabIndex: 0,
    checkbox1: false,
    user_checked_input: "",
    loading: false,
    delete_error: "",
    service_id_2: this.props.location.service_id_2,
    user_checked_input_2: this.props.location.user_checked_input_2,
    userdogs : []
  }

  componentDidMount = () => {
    if(navigator.onLine){
            this.setState({
              loading: true,
            })
            //Services List API
            const data = {
              customer_id: userData.id,
            }
            Services.getInstance().PetList(data).then((result) => {
              console.log(result);
              if (result.status === true) {
                this.setState({
                  userdogs: result.data
                }
                  ,()=>{
                    if(result.data.length >= 1){
                      document.getElementById(result.data[0].id).checked = true;
                      // this.DogInfo(result.data[0], result.data[0].id)
                      const obj1 = {
                        userId: userData.id,
                      }
          
                      Services.getInstance().bookingService(obj1).then((result) => {
                       
                        if (result.length > 0) {
                          this.setState({
                            Service: result,
                            service_id_1: result[0].service_id,
                            loading: false,
                          }, () => {
                            if (this.state.service_id_2 == "" || this.state.service_id_2 == null || this.state.service_id_2 == undefined) {
                              document.getElementById(result[0].service_id).classList.add("active")
                              this.DogInfo(this.state.userdogs[0], this.state.userdogs[0].id)
                              this.setState({
                                loading : false
                              })
                            }
                            else {
                              document.getElementById(this.state.service_id_2).classList.add("active");
                              this.DogInfo(this.state.userdogs[0], this.state.userdogs[0].id)
                              this.setState({
                                service_id_1: this.state.service_id_2,
                                user_checked_input: this.state.user_checked_input_2,
                                loading : false
                              })
                            }
                           
          
                          }
                          )
                        }
                        else{
                          this.setState({
                            loading : false
                          })
                        }
          
          
                      })
                    }
                  }
                )
              }
              else if (result.status === false) {
                this.setState({
                  error_messgae: result.msg,
                  quote_text: "Please add a Pet and book the service..",
                })
              }
            })






            // const obj1 = {
            //   userId: userData.id,
            // }

            // Services.getInstance().bookingService(obj1).then((result) => {
            //   if (result.length > 0) {
            //     this.setState({
            //       Service: result,
            //       service_id_1: result[0].service_id,
            //       loading: false,
            //     }, () => {
            //       if (this.state.service_id_2 == "" || this.state.service_id_2 == null || this.state.service_id_2 == undefined) {
            //         document.getElementById(result[0].service_id).classList.add("active")
            //         this.setState({
            //           loading : false
            //         })
            //       }
            //       else {
            //         document.getElementById(this.state.service_id_2).classList.add("active");
            //         this.setState({
            //           service_id_1: this.state.service_id_2,
            //           user_checked_input: this.state.user_checked_input_2,
            //           loading : false
            //         })
            //       }

            //     }
            //     )
            //   }
            //   else{
            //     this.setState({
            //       loading : false
            //     })
            //   }


            // })

    }
    else{
      this.props.history.push({
        pathname : "/internet"
      })
    }

  }

  Quote_service = (id, services_Array) => {
    for (let i = 0; i <= services_Array.length; i++) {
      if (id == services_Array[i].service_id) {
        document.getElementById(id).classList.add("active");
        this.getBookingPreview(id);
      }
      else {
        console.log("In active code");
        document.getElementById(services_Array[i].service_id).classList.remove("active");
      }
    }
  }
  getBookingPreview = (id) => {
    document.getElementById("petInt").style.display = "none";
    this.setState({
      loading: true
    })
    this.setState({
      Preview: [],
      quotations: [],
      tabIndex: 0
    })
    const obj = {
      userId: userData.id,
      serviceId: id,
      petId : this.state.user_checked_input.id
    }
    console.log(obj);

    Services.getInstance().getMyBooking(obj).then((result) => {
      if (result.length <= 0) {
        document.getElementById("petInt").style.display = "none";
        this.setState({
          Preview: [],
          quote_text: "No requirement has been submitted yet",
          loading: false
        })
      }
      else {
        this.setState({
          Preview: result,
        }, () => {
          localStorage.setItem("selected-booking-id", result[0].bookingId)
          this.setState({
            bookingId_1: result[0].bookingId,
            service_id_1: id,
            quote_text: "",
          })
          const obj1 = {
            userId: userData.id,
            serviceId: id,
            bookingId: result[0].bookingId,
          }
          // Quotations for My selected services
          Services.getInstance().myQuotes(obj1).then((result) => {
            if (result.length > 0) {
              this.setState({
                quotations: result,
                loading: false,
              })
              document.getElementById("petInt").style.display = "none";
            }
            else {
              document.getElementById("petInt").style.display = "block";
              this.setState({
                quotations: [],
                loading: false,
              })
            }
            console.log(result)
          })
        })
      }
    })
  }


  hideInteraction = () => {
    if (this.state.Preview.length > 0) {
      document.getElementById("petInt").style.display = "none";
    }
    
  }
  

  showInteraction = () => {
    if (this.state.Preview.length > 0 && this.state.quotations.length > 0) {
      document.getElementById("petInt").style.display = "none";
    }
    else if(this.state.Preview.length > 0 && this.state.quotations.length <= 0){
      document.getElementById("petInt").style.display = "block";
    }
    else {
      if(this.state.dog_selected){
        this.setState({
          quote_text : "No requirement has been submitted yet"
        })
      }
      else{
        this.setState({
          quote_text : "Please Select the Pet for more details.."
        })
      }

      document.getElementById("petInt").style.display = "none";
    }
  }

  ViewProfile = (quote) => {
    this.props.history.push({
      pathname: "/viewprofile",
      quote: quote,
      service_id_1: this.state.service_id_1,
      user_checked_input: this.state.user_checked_input,
    })
  }

  BookConfirm = (quoteData) => {
    localStorage.setItem("PNP-Booking-Data", JSON.stringify(quoteData));
    this.props.history.push({
      pathname: "/bookingconfirmation",
      quoteData: quoteData,
    })
  }

  closeresendPopUp = () => {
    this.setState({
      resend_popup: false,
    })
  }

  goBack = () => {
    this.props.history.push({
      pathname: "/homepage"
    })
  }

  resendQuotation = (index, pre) => {
    console.log(pre)
    this.setState({
      loading: true
    })
    console.log(this.state.service_id_1, this.state.bookingId_1);
    const obj = {
      userId: userData.id,
      serviceId: this.state.service_id_1,
      bookingId: pre.bookingId,
    }
    Services.getInstance().deleteMyBooking(obj).then((result) => {
      this.setState({
        loading: false
      })
      if (result.status == "some thing went wrong") {
        confirmAlert({
          title: '',
          message: 'This booking has quotations, You cannot delete this request',
          buttons: [
            {
              label: 'Ok',
              onClick: () => { }
            },
          ]
        });
        this.setState({
          delete_error: "This booking has quotations, You cannot delete this request"
        })
        // alert("This booking has quotations, You cannot delete this request")
      }
      else if (result.status == "success") {
        if (this.state.service_id_1 == "1") {
          this.props.history.push({
            pathname: "/boarding-booking"
          })
        }
        else if (this.state.service_id_1 == "2") {
          this.props.history.push({
            pathname: "/groom-booking"
          })
        }
        else if (this.state.service_id_1 == "3") {
          this.props.history.push({
            pathname: "/train-booking"
          })
        }
        else if (this.state.service_id_1 == "4") {
          this.props.history.push({
            pathname: "/walk-booking"
          })
        }
        else if (this.state.service_id_1 == "5") {
          this.props.history.push({
            pathname: "/vet-booking"
          })
        }
        else if (this.state.service_id_1 == "6") {
          this.props.history.push({
            pathname: "/sit-booking"
          })
        }
      }


    })
  }





  LikeQuote = (quote) => {
    this.setState({
      loading : true
    })
    if (quote.favorite == "0") {
      const obj = {
        bookingId: quote.bookingId,
        favorite: "1"
      }
      Services.getInstance().LikeQuotes(obj).then((result) => {
        if (result.status == "success") {
          const obj = {
            userId: userData.id,
            serviceId: this.state.service_id_1,
          }
          Services.getInstance().getMyBooking(obj).then((result) => {
            this.setState({
              bookingId_1: result[0].bookingId,
            })
            if (result.length <= 0) {
              // document.getElementById("no-bookings").style.display = "block";
            }
            else {
              this.setState({
                Preview: result,
              }, () => {
                const obj1 = {
                  userId: userData.id,
                  serviceId: this.state.service_id_1,
                  bookingId: result[0].bookingId,
                }
                console.log(obj1);
                Services.getInstance().myQuotes(obj1).then((result) => {
                  if (result.length > 0) {
                    this.setState({
                      quotations: result,
                      loading : false
                    })
                  }
                  else {
                    document.getElementById("petInt").style.display = "block";
                    this.setState({
                      quotations: [],
                      loading : false
                    })
                  }

                })
              })
            }
          })
        }
        else {
          alert("Please try again later")
        }
      })
    }
    else {
      const obj = {
        bookingId: quote.bookingId,
        favorite: "0"
      }
      Services.getInstance().LikeQuotes(obj).then((result) => {
        if (result.status == "success") {
          const obj = {
            userId: userData.id,
            serviceId: this.state.service_id_1,
          }
          Services.getInstance().getMyBooking(obj).then((result) => {
            this.setState({
              bookingId_1: result[0].bookingId,
            })
            if (result.length <= 0) {
              // document.getElementById("no-bookings").style.display = "block";
            }
            else {
              this.setState({
                Preview: result,
              }, () => {
                const obj1 = {
                  userId: userData.id,
                  serviceId: this.state.service_id_1,
                  bookingId: result[0].bookingId,
                }
                console.log(obj1);
                Services.getInstance().myQuotes(obj1).then((result) => {
                  if (result.length > 0) {
                    this.setState({
                      quotations: result,
                      loading : false
                    })
                  }
                  else {
                    document.getElementById("petInt").style.display = "block";
                    this.setState({
                      quotations: [],
                      loading : false
                    })
                  }

                })
              })
            }
          })
        }
        else {
          alert("Please try again later")
        }
      })
    }

  }

  handleDogChange = (e) => {
    this.setState({
      checkbox1: e.target.checked
    })
  }



// DogInfo=(dogdata,dog_input)=>{
//   console.log(dog_input);
  
//   if(document.getElementById(dog_input).checked === true){
//     this.setState({
//       user_checked_input : dogdata,
//       pet_name : dogdata.pet_name,
//     })
//   }
//   else if(document.getElementById(dog_input).checked === false){
//     this.setState({
//       user_checked_input : dogdata,
//     })
//   }
// }


dogForm = () => {
  window.open("#/create-dog-form", "_self");
}


  DogInfo = (dogdata, dog_input) => {
    this.setState({
      Preview: [],
      quotations: [],
      loading: true,
    })
    // console.log(dogdata);
    // console.log(dog_input);
    document.getElementById(dogdata.id).checked = true
      if (document.getElementById(dog_input).checked === true) {
        this.setState({
          user_checked_input: dogdata,
          pet_name: dogdata.pet_name,
          quote_text : "We are checking the dog details..",
          dog_selected : true,
          breed_type:dogdata.breed_type
        })
      }
      else if (document.getElementById(dog_input).checked === false) {
        this.setState({
          user_checked_input: dogdata,
        })
      }
    const obj = {
      userId: userData.id,
      serviceId: this.state.service_id_1,
      petId: dogdata.id
    }
    Services.getInstance().getMyBooking(obj).then((result) => {
      if (result.length <= 0 || result.length == 0) {
        this.setState({
          Preview: [],
          quotations: [],
          loading: false,
          quote_text: "No requirement has been submitted yet",
        })
        // document.getElementById("petInt").style.display = "block";
      }
      else {
        this.setState({
          Preview: result,
          quote_text: "",
        }, () => {
          localStorage.setItem("selected-booking-id", result[0].bookingId)
          const obj1 = {
            userId: userData.id,
            serviceId: this.state.service_id_1,
            bookingId: result[0].bookingId,
            petId: dogdata.id
          }
          console.log(obj1);
          Services.getInstance().myQuotes(obj1).then((result) => {
            if (result.length > 0) {
              document.getElementById("petInt").style.display = "none";
              this.setState({
                quotations: result,
                loading: false
              })
            }
            else {
              document.getElementById("petInt").style.display = "block";
              this.setState({
                quotations: [],
                loading: false
              })
            }

          })
        })
      }
    })
  }


  handleRefresh = () => {
    window.location.reload();
  }

  render() {
    return (
      <div class="quotation-n-main">
        <DarkBackground disappear={this.state.loading}>
            <LoadingOverlay
              active={true}
              spinner={true}
              text="Please Wait..."
            >
            </LoadingOverlay>
          </DarkBackground>
        <div class="quotation-n-hd">
          <h4>My Quotations </h4>
          <img src="q-arrow.png" onClick={this.goBack} />
        </div>
        <PullToRefresh onRefresh={this.handleRefresh}>
          <div class="quotation-n-list">
            {this.state.Service && this.state.Service.length > 0 ? this.state.Service.map((srvc, index) => {
              return (
                <div class="quotation-n-item" key={index} id={srvc.service_id} onClick={() => this.Quote_service(srvc.service_id, this.state.Service)}>
                  <p>{srvc.name}</p>
                </div>
              )
            }) : ""}
          </div>
          <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
            <TabList>
              <Tab onClick={this.showInteraction}>Quotations</Tab>
              <Tab onClick={this.hideInteraction}>Service Requested</Tab>
            </TabList>
            {/* <div class="pet-pr-my-pet qt">
              <DogsList style={{ margin: "20px" }}
                handleDogChange={this.handleDogChange}
                DogInfo={this.DogInfo}
              />
            </div> */}
      <div class="pet-pd-head-img" style={{padding:"0 18px"}}>
        {this.state.userdogs && this.state.userdogs.length > 0 ? this.state.userdogs.map((dogdata, index) => {
          return (
            <div class="pet-head-list-item" key={index} onClick={() =>
                this.DogInfo(dogdata, dogdata.id)
                }>
              <input
                type="radio"
                id={dogdata.id}
                value='dog_chk'
                name="dog"
                onChange={this.handleDogChange}
                onClick={() =>this.DogInfo(dogdata, dogdata.id)}
              ></input>
              <label for={dogdata.id}></label>
              <span class="checkmark"></span>
              <div class="pet-wl-list-img" >
                <img src="dog.png" />
              </div>
              <p>{dogdata.pet_name}</p>
            </div>
          )
        }) : ""
        }
        <div class="pet-head-list-item" >
          <div class="pet-wl-list-img2" onClick={this.dogForm}>
            <img src="plus2.png" />
          </div>
        </div>
        </div>
            <TabPanel>
              <div class="qntn-n-profile-main" id='quotation-data' style={{ display: "block" }}>
                {this.state.quotations && this.state.quotations.length > 0 ? this.state.quotations.map((quote, index) => {
                  return (
                    <div class="qntn-n-profile">
                      <div class="qntn-n-lft">
                        <img src={quote.photo} />
                      </div>
                      <div class="qntn-n-rht">
                        <h6>{quote.name}</h6>
                        <span><img src="qntn-loc-icon.png" />{quote.inkm}</span>
                        {/* <span class="loc-qntn"><img src="qntn-rtng-icon.png"/>{quote.rating}</span> */}
                        <span class="loc-qntn">{quote.review} reviews</span>
                        <div class="qntn-btns">
                          <button class="qntn-vp" onClick={() => this.ViewProfile(quote)}>View Profile</button>
                          <button class="qntn-bns" onClick={() => this.BookConfirm(quote)}>Book Now</button>
                        </div>
                        {quote.pnpVerif == "0" ? "" :
                          <div class="qntn-strip">
                            <img src="pnp-vrfd-strip.png" />
                          </div>
                        }
                        <div class="qntn-cost">
                          <h5>₹{quote.totalPrice}/-</h5>
                          <span>Pkg.Cost</span>
                        </div>
                        <div class="like-c" onClick={() => this.LikeQuote(quote)}>
                          {quote.favorite == "0" ? <img class="h-b" src="heart-p.png" /> : <img class="h-o" src="heart.png" />}
                        </div>
                        <div class="num-c">
                          <span>{index + 1}</span>
                        </div>
                      </div>
                    </div>
                  )
                }) : ""}
              </div>
            </TabPanel>
            <TabPanel>
              <div id='booking-data' style={{ display: "block" }}>
                {/* <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.delete_error}</div> */}
                {this.state.Preview && this.state.Preview.length > 0 ? this.state.Preview.map((pre, index) => {
                  return (
                    <div class="bk-sumry" key={index}>
                      <div class="b-sumry-main">
                        <div class="like-c" onClick={() => this.resendQuotation(index, pre)}>
                          <img class="h-b" src="trash.png" />
                        </div>
                        <div class="b-sumry-item">
                          <div class="fltrshw">
                            <div class="fltr-pet-img"><img src="fltr-pet.png" /></div>
                            <p>Pet Name</p>
                          </div>
                          <span>{pre.petName}</span>
                        </div>
                        <div class="b-sumry-item">
                          <div class="fltrshw">
                            <div class="fltr-pet-img"><img src="fltr-pet.png" /></div>
                            <p>Pet Breed</p>
                          </div>
                          <span>{this.state.breed_type}</span>
                        </div>
                        {pre.packName == "" ? "" :
                          <div class="b-sumry-item">
                            <div class="fltrshw">
                              <div class="fltr-pet-img"><img src="dog-foot.png" /></div>
                              <p>Package</p>
                            </div>
                            <span>{pre.packName}</span>
                          </div>
                        }
                        {pre.fromDate == "" ?  
                        <div class="b-sumry-item">
                          <div class="fltrshw">
                              <div class="fltr-pet-img"><img src="calendar.png" /></div>
                              <p>Date</p>
                            </div>
                          <span>{pre.bookingDate }</span>
                        </div> :   <div class="b-sumry-item">
                            <div class="fltrshw">
                              <div class="fltr-pet-img"><img src="calendar.png" /></div>
                              <p>From</p>
                            </div>
                          <span>{pre.bookingDate || pre.fromDate}</span>
                        </div>}
                        {pre.toDate == "" ? "" :  
                        <div class="b-sumry-item">
                          <div class="fltrshw">
                              <div class="fltr-pet-img"><img src="calendar.png" /></div>
                              <p>To</p>
                            </div>
                          <span>{pre.toDate}</span> 
                          
                        </div>}
                        {pre.bookingTime == "" && pre.fromTime == "" ?
                          ""
                          :
                          <div class="b-sumry-item">
                            <div class="fltrshw">
                              <div class="fltr-pet-img"><img src="srvc-dlts-img6.png" /></div>
                              <p>Time</p>
                            </div>

                            <span>{pre.bookingTime < "12:00" ? pre.bookingTime + " AM" : pre.bookingTime + " PM"}</span>
                            {pre.fromTime !== "" ?
                              <span>{pre.fromTime < "12:00" ? pre.fromTime + " AM" : pre.fromTime + " PM"}</span>
                              : ""}
                          </div>
                        }
                        {pre.fromTime == "" ?
                          pre.walkBookingTime && pre.walkBookingTime.length > 0 ? pre.walkBookingTime.map((tym, index) => {
                            return (
                              <div>
                                {tym.time == "" ? "" :
                                  <div class="b-sumry-item">
                                    <div class="fltrshw">
                                      <div class="fltr-pet-img"><img src="srvc-dlts-img6.png" /></div>
                                      <p>Time</p>
                                    </div>
                                    <span>{tym.time < "12:00" ? tym.time + " AM" : tym.time + " PM"}</span>
                                  </div>
                                }
                              </div>
                            )
                          }) : "" : ""
                        }
                      </div>
                      {pre.addOn && pre.addOn.length > 0 ?
                        <div>
                          <h5>Add-Ons</h5>
                          <div class="mq-add-on-list">
                            {pre.hairCut == "" ? "" :
                              <div class="mq-add-on-item">
                                <img src="mq-check-o.png" />
                                <p>{pre.hairCut}</p>
                              </div>
                            }
                            {
                              pre.addOn.map(str => {
                                return (
                                  <div class="mq-add-on-item">
                                    <img src="mq-check-o.png" />
                                    <p>{str}</p>
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                        :
                        pre.hairCut == "" ? "" :
                          <div class="mq-add-on-item">
                            <img src="mq-check-o.png" />
                            <p>{pre.hairCut}</p>
                          </div>
                      }
                    </div>
                  )
                }) : ""}
              </div>
            </TabPanel>
          </Tabs>
          <div class="ldng-bg" id='petInt' style={{ display: "none" }}>
            <div class="loading-main">
              <div class="dwn-flow">
              </div>
              <div class="dog-ldng">
                <img src="dog-ldng.gif" />
              </div>
              <h4>Get ready for tail-wagging joy! 🐾 Service provider's paw-some plan for your pet is on its way. </h4>
              <h4>Stay tuned!"</h4>
              {/* {this.state.service_id_1 == "1" ? <h4>Secure a trusted pet lover to care for your furry friend in your absence.</h4> : ""}
              {this.state.service_id_1 == "2" ? <h4>Relieve your worries about furry baths. Our groomers make your pet shine!</h4> : ""}
              {this.state.service_id_1 == "3" ? <h4>Recruit a Certified pet trainer to cultivate obedience in your beloved furry companion.</h4> : ""}
              {this.state.service_id_1 == "4" ? <h4>Get ready for tail-wagging joy! 🐾 Service provider's paw-some plan for your pet is on its way. Stay tuned!".</h4> : ""} */}
              <div class="progress-bar">
                <div class="progress-fill"></div>
              </div>
              {/* <p onClick={this.Quotation}>View Your Quotation</p> */}
            </div>
          </div>

          <div id='no-bookings' style={{ display: "block", margin: "250px 0 0 0", textAlign: "center" }}>{this.state.quote_text}</div>
        </PullToRefresh>
        {/* {this.state.resend_popup ? 
         <ResendQuotationPopup
         closeresendPopUp = {this.closeresendPopUp}
         resendQuotation = {this.resendQuotation}
         />  
         :""
      }  */}

        {/* <Footer/> */}

      </div>

    )
  }
}

export default Quotation