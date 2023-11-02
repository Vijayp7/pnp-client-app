import React, { Component } from 'react'
import '../CSS/BoardingCSS/BoardingBooking.css'
import DogsList from '../EntryScreens/DogsList';
import Services from '../Services/Services';
import Location from '../EntryScreens/Location';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from '../EntryScreens/DarkBackground';



let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));
const longitude = localStorage.getItem(`serivce_provider_long`);
const latitude = localStorage.getItem(`serivce_provider_lat`);
let location = localStorage.getItem(`client-location`);
let user_final_city = "";
let latitude200 = "";
let longitude200 = "";
let userAddress = "";
let device_token = [];

export class BoardingBookingUpdate extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    addOn: [],
    date_from: "",
    date_to: "",
    current_date: "",
    general_addons: [],
    service_id: 1,
    pet_name: "",
    breed_type:"",
    pet_id: "",
    package_name: "Boarding",
    checkbox1: false,
    user_checked_input: "",
    message: "",
    location_popup: false,
    latLng: "",
    address: userAddress,
    input_error: {
      input_error_user_checked_input: "",
      input_error_from_date: "",
      input_error_to_date: "",

    },
    back_preview_data: this.props.location.back_preview_data,
    returned_back: this.props.location.returned_back,

    location_popup: false,
    latLng: "",
    locality: [],
    loading: false,
    booking_error: "",
    loading: false,
    // device_token: [],
    select_pet_error: "",
    userdogs : [],

  }


  handleDogChange = (e) => {
    this.setState({
      checkbox1: e.target.checked
    })
  }

  DogInfo = (dogdata, dog_input) => {
    console.log(dog_input);
    document.getElementById(dogdata.id).checked = true
    if (document.getElementById(dog_input).checked === true) {
      this.setState({
        user_checked_input: dogdata,
        pet_name: dogdata.pet_name,
        breed_type:dogdata.breed_type
      })
    }
    else if (document.getElementById(dog_input).checked === false) {
      this.setState({
        user_checked_input: dogdata,
      })
    }
  }


  dogForm = () => {
    window.open("#/create-dog-form", "_self");
  }


  componentDidMount = () => {

    let today = new Date().toISOString().split('T')[0];
    document.getElementsByName("date_from")[0].setAttribute('min', today);
    document.getElementsByName("date_to")[0].setAttribute('min', today);
    console.log(today);

    if (!userData) {
      window.location.reload(true);
    }

    if (userData) {
      latitude200 = userData.latitude;
      longitude200 = userData.longitude;
      userAddress = userData.address;
      user_final_city = userData.city;
    }


    const data = {
      customer_id: userData.id,
    }
    Services.getInstance().PetList(data).then((result) => {
      console.log(result);
      if (result.status === true) {
        this.setState({
          userdogs: result.data
        }
          , () => {
            if (result.data.length == 1) {
              document.getElementById(result.data[0].id).checked = true;
              this.DogInfo(result.data[0], result.data[0].id)
            }
          }
        )
      }
      else if (result.status === false) {
        this.setState({
          error_messgae: result.msg,
        })
      }
    })



    const obj = {
      service_id: 1
    }
    Services.getInstance().Packages(obj).then((result) => {
      console.log(result);
      if (result.status == true) {
        this.setState({
          general_addons: result.data[0].general_addons
        })
      }
      else if (result.status == false) {
        this.setState({
          error_messgae: result.msg,
        })
      }
    })

    //getting Device tokens
    const obj1 = {
      serviceid: 1,
      city : user_final_city
    }
    Services.getInstance().get_device_tokens(obj1).then((result) => {
      console.log(result);
      device_token = result;
      // this.setState({
      //   device_token: result
      // })
    })

  }


  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    }
      , () => {
        if(this.state.date_from == ""){
          this.setState({
            input_error: {
              input_error_from_date: "Please Select From Date",
            }
          })
        }
        else{
          var tomorrow = new Date(this.state.date_from);
          tomorrow.setDate(tomorrow.getDate() + 1);
          document.getElementsByName("date_to")[0].setAttribute('min', tomorrow.toISOString().split('T')[0]);
          console.log(this.state)
        }

      }
    );
  }



  closePopUp = () => {
    this.setState({
      location_popup: false,
    })
  }

  ExtraAddon = (extVar, addOnData, Total, sindex) => {
    let add_ext = Total;
    add_ext = add_ext.map((s, index) => {
      if (addOnData.name == s.name) {
        s.clicks = Number(s.clicks) + Number("1");
        if (s.clicks % 2 == 0) {
          document.getElementById(index + "x").classList.remove("active");
          for (let i = 0; i < this.state.addOn.length; i++) {
            if (addOnData.name == this.state.addOn[i].name) {
              this.state.addOn.splice(i, 1);
              document.getElementById(sindex + "200").checked = false;
              console.log(this.state.addOn);
            }
          }
        } else {
          document.getElementById(index + "x").classList.add("active");
          const obj = {
            name: addOnData.name,
          }
          this.state.addOn.push(obj);
          document.getElementById(sindex + "200").checked = true;
        }
        return s;
      }
    })
  }

  movetoBoardingInfo = () => {
    this.validateform();
  }

  validateform = () => {
    if (this.state.user_checked_input == "") {
      if(this.state.userdogs.length > 0){
        this.setState({
          input_error: {
            user_checked_input: "Please Select Pet",
          }
        })
      }
      else{
        this.setState({
          input_error: {
            user_checked_input: "Please Add Pet",
          }
        })
      }

      window.scrollTo(0, 0);
    }
    else if (this.state.pet_name == "") {
      if(this.state.userdogs.length > 0){
        this.setState({
          input_error: {
            user_checked_input: "Please Select Pet",
          }
        })
      }
      else{
        this.setState({
          input_error: {
            user_checked_input: "Please Add Pet",
          }
        })
      }
      window.scrollTo(0, 0);
    }
    else if (this.state.date_from == "") {
      this.setState({
        input_error: {
          input_error_from_date: "Please Select From Date"
        }
      })
    } else if (this.state.date_to == "") {
      this.setState({
        input_error: {
          input_error_to_date: "Please Select To Date"
        }
      })
    } 
    else if (this.state.date_to < this.state.date_from) {
      this.setState({
        input_error: {
          input_error_to_date: "Please Select Correct Date"
        }
      })
    }
    else {
      this.setState({
        addOn: this.state.addOn
      })
      this.setState({
        input_error: {
          input_error_to_date: "",
          input_error_from_date: "",
          user_checked_input: "",
        }
      })
      document.getElementById("b-form").style.display = "none";
      document.getElementById("b-pre").style.display = "block";
    }
  }

  homepage = () => {
    this.props.history.push({
      pathname: "/homepage"
    })
  }


  Bookingpage = () => {
    this.setState({
      addOn: this.state.addOn
    })
    document.getElementById("b-form").style.display = "block";
    document.getElementById("b-pre").style.display = "none";
  }




  boardingSuccess = () => {
    this.setState({
      loading: true,
    })
    if (latitude200 == "" || longitude200 == "") {
      this.setState({
        booking_error: "Service address is required",
        loading: false,
      })
    }
    else {
      this.setState({
        booking_error: "",
      })
      const obj = {
        client_id: userData.id,
        service_id: this.state.service_id,
        pet_id: this.state.user_checked_input.id,
        extra_addons: this.state.addOn,
        from_date: this.state.date_from,
        to_date: this.state.date_to,
        latitude: latitude200,
        longitude: longitude200,
        message: this.state.message,
        city: user_final_city,
      }

      Services.getInstance().boardingBookings(obj).then((result) => {
        console.log(result);
        if (result.status === true) {
          const obj1 = {
            notification: {
              title: "Petsfolio",
              body: "Received A Request From " + userData.name + " For Dog Boarding",
              sound: "default"
            },
            registration_ids: device_token
          }
          Services.getInstance().SendBookingNotificationToSP(obj1).then((result) => {
            window.open("#/quotation", "_self");
          })

        }
        else {
          this.setState({
            error_messgae: result.msg,
            booking_error: "You Might have Booked This Service Already",
            loading: false
          })
        }
      })
    }
  }




  openGoogleLocations = () => {
    this.setState({
      // user_location : provider_location,
      location_popup: true,
    })
  }

  useCurrentLocation = () => {
    this.setState({
      loading: true
    })
    navigator.geolocation.getCurrentPosition(function (position) {
      const obj = {
        lon: position.coords.longitude,
        lat: position.coords.latitude,
      };
      console.log(obj);
      latitude200 = position.coords.latitude;
      longitude200 = position.coords.longitude;

      //For Full Address
      const google = window.google;
      var latlng = new google.maps.LatLng(obj.lat, obj.lon);
      var geocoder = geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            userAddress = results[1].formatted_address
            results.forEach(function (result) {
              result.address_components.forEach(function (component) {
                if (component.types.includes('locality')) {
                  user_final_city = component.long_name;
                   //getting Device tokens
                    const obj1 = {
                      serviceid: 1,
                      city : component.long_name
                    }
                    Services.getInstance().get_device_tokens(obj1).then((result) => {
                      console.log(result);
                      device_token = result;
                      // this.setState({
                      //   device_token: result
                      // })
                    })
                }
              });
            });
          }
        }
        else {
          //
        }
      });
    });
    const provider_location1 = localStorage.getItem("serivce_provider_location");
    this.setState({
      address: provider_location1,
      location_popup: false,
      loading: false
    })
  }

  handleSelectLocations = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        latitude200 = latLng.lat;
        longitude200 = latLng.lng;
        localStorage.setItem("serivce_provider_lat", latLng.lat);
        localStorage.setItem("serivce_provider_long", latLng.lng);
        console.log("hshs")
      }
      )
      .catch(error => console.error('Error', error));
    userAddress = address;
    console.log(address)
    geocodeByAddress(address).then(results => this.setState({ locality: results }))
    this.setState({ address });
  };

  getLocality = () => {
    this.state.locality.forEach(function (result) {
      result.address_components.forEach(function (component) {
        if (component.types.includes('locality')) {
          user_final_city = component.long_name;
          //getting Device tokens
          const obj1 = {
            serviceid: 1,
            city : component.long_name
          }
          Services.getInstance().get_device_tokens(obj1).then((result) => {
            console.log(result);
            device_token = result;
            // this.setState({
            //   device_token: result
            // })
          })
        }
      });
    });

  }

  handleChangeLocations = address => {
    this.setState({ address });
  };

  useLocation = (address) => {
    this.getLocality();
    this.setState({
      user_location: address,
      location_popup: false,
    })
  }

  closePopUp = () => {
    this.setState({
      location_popup: false,
    })
  }







  render() {
    // console.log(latitude200);
    // console.log(longitude200);
    return (
      <div>
        <div class="home-pnp d-brdng" id='b-form' style={{ display: "block" }}>

          <div class="fltr-div">
            <div class="bk-arw" >
              <img src="arrow-right.png" onClick={this.homepage} />
            </div>
            <h4>Booking Summary</h4>
          </div>

          <div class="fltr-main">

            <div class="add-pet-hd">
              <h5>Add Your Pet</h5>
              {/* <span>Reset</span> */}
            </div>

            {/* <div class="add-pet-plus">
          <DogsList
              handleDogChange = {this.handleDogChange}
              DogInfo = {this.DogInfo}
            />
          </div> */}




            <div class="pet-pd-head-img">
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
                      onClick={() => this.DogInfo(dogdata, dogdata.id)}
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

            <div style={{ margin: '10px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.input_error.user_checked_input}</div>


            <div class="bd-pd">
              <h6>Boarding Charges</h6>
              <div class="bd-rht">
                <span>499/-</span>
                <p>Per Day</p>
              </div>
              <div class="paws">
                <img src="bg-paws.png" alt="image" />
              </div>
            </div>

            {/* <div class="slct-dt">
            <h5>Select a Date</h5>
            <div class="ft-dt-main">
              <span>From</span>
              
              <input 
              id="from"
              class="calender1" 
              name="date_from" 
              type="date" 
              value={this.state.date_from}
              placeholder="From" 
              onChange={this.handleChange}
              />
              <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.input_error_from_date}</div>
              <span>To</span>
              <input 
              id="to"
              class="calender2" 
              name="date_to" 
              type="date" 
              placeholder="To" 
              onChange={this.handleChange}
              />
            </div>
            
          <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.input_error_to_date}</div>
          </div> */}





            <div class="fltr-add-ons">
              <h5>Add-Ons</h5>

              <div class="fltr-add-ons-list">
                {this.state.general_addons && this.state.general_addons.length > 0 ? this.state.general_addons.map((addons, index) => {
                  return (

                    <div class="fltr-add-ons-item" id={index + "x"} key={index} onClick={() => this.ExtraAddon(index + "x", addons, this.state.general_addons, index)}>
                      <div class="chk-item">
                        <input
                          type="checkbox"
                          id={index + "200"}
                          name='addOn'
                          // value="pickdrop"
                          // onChange={this.handleChange}
                          onClick={() => this.ExtraAddon(index + "x", addons, this.state.general_addons, index)}
                        />
                        <label for={index + "200"}></label>
                      </div>
                      <div class="fltr-add-ons-item-img">
                        <img src={addons.icon} />
                      </div>
                      <p>{addons.name}</p>
                    </div>

                  )
                }) : ""}
              </div>
            </div>


            <div class="slct-dt">
              <h5>Select a Date</h5>
              <div class="ft-dt-main">
                <span>From</span>

                <input
                  id="from"
                  class="calender1"
                  name="date_from"
                  type="date"
                  value={this.state.date_from}
                  placeholder="From"
                  onChange={this.handleChange}
                />
                <div style={{ margin: '1px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.input_error.input_error_from_date}</div>
                <span>To</span>
                <input
                  id="to"
                  class="calender2"
                  name="date_to"
                  type="date"
                  placeholder="To"
                  onChange={this.handleChange}
                />
              </div>

              <div style={{ margin: '1px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.input_error.input_error_to_date}</div>
            </div>


            <div class="fltr-mesg">
              <h5>Message</h5>
              <textarea placeholder="Please add your comments here" name='message' onChange={this.handleChange}></textarea>
            </div>

            {/* <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.user_checked_input}</div> */}

            <div class="fltr-btn">
              <button onClick={this.movetoBoardingInfo}>Submit</button>
            </div>



          </div>

        </div>

        <div class="home-pnp prv" id='b-pre' style={{ display: "none" }}>

          <div class="fltr-prv-hd">
            <img src="q-arrow.png" onClick={this.Bookingpage} />
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
                <h5>{this.state.pet_name}</h5>
              </div>
            </div>

            <div class="fltr-pet">
              <div class="fltr-pet-lft">
                <div class="fltr-pet-img">
                  <img src="fltr-pet.png" />
                </div>
                <p>Pet Breed</p>
              </div>
              <div class="fltr-pet-rht">
                <h5>{this.state.breed_type}</h5>
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
                <h5>{this.state.date_from}</h5>
                <small>to</small>
                <h5>{this.state.date_to}</h5>
              </div>
            </div>
            <div class="fltr-add-ons-prv">
              <h5>Add-Ons</h5>
              {this.state.addOn && this.state.addOn.length > 0 ?
                <div class="add-on-prv-list">
                  {this.state.addOn && this.state.addOn.length > 0 ? this.state.addOn.map((data, index) => {
                    return (
                      <div class="add-on-prv-item" key={index}>
                        <img src="fltr-checked.png" />
                        <p>{data.name}</p>
                      </div>
                    )
                  }) : ""}

                </div>
                : ""}
            </div>

            <div class="fltr-prv-note">
              <h5>Address
                <span onClick={this.openGoogleLocations} class="lpopup"><img src="edit-icon.png" /></span>
              </h5>
              <div class="note-txt" onClick={this.openGoogleLocations}>
                {userAddress == "" ? <p>Please add service required location</p> : <p>{userAddress}</p>}
              </div>
            </div>

            <div class="fltr-prv-note">
              <h5>Additional Notes</h5>
              <div class="note-txt">
                <p>{this.state.message}</p>
              </div>
            </div>
          </div>
          <p style={{ margin: '10px', color: 'red', textAlign: "center" }}>{this.state.booking_error}</p>
          <div class="fltr-prv-btn">
            <button onClick={this.boardingSuccess}>Submit</button>
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
        {
          this.state.location_popup ?
            <Location
              useCurrentLocation={this.useCurrentLocation}
              closePopUp={this.closePopUp}
              useLocation={() => this.useLocation(this.state.address)}
              handleSelectLocations={this.handleSelectLocations}
              handleChangeLocations={this.handleChangeLocations}
              address={this.state.address}
            />
            : ""
        }

      </div>

    )
  }
}

export default BoardingBookingUpdate