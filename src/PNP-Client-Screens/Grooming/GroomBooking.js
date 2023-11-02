import React, { Component } from 'react'
import '../CSS/GroomingCSS/GroomingBooking.css'
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


// Minor cut
export class GroomBooking extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    calendar: "",
    timer: "",
    Clicks: 0,
    haircheck: 0,
    checkbox1: false,
    user_checked_input: "",
    grooming_data: [],
    service_id: "2",
    general_addons: [],
    extra_addons: [],
    booking_time: "",
    haircut: "",
    location_popup: false,
    latLng: "",
    address: userAddress,
    selected_extra_addons: [],
    selected_package_id: "",
    c_service_time: "",
    pet_name: "",
    breed_type:"",
    pet_id: "",
    package_name: "Grooming",
    message: "Grooming",
    input_error: {
      input_error_user_checked_input: "",
      input_error_selected_package_id: "",
    },
    location_popup: false,
    latLng: "",
    locality: [],
    loading: false,
    booking_error: "",
    device_token: [],
    userdogs : []
  }

  componentDidMount = () => {

    if(navigator.onLine){

            let today = new Date().toISOString().split('T')[0];
            document.getElementsByName("calendar")[0].setAttribute('min', today);
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
                  userdogs: result.data,
                  // breed_type:result.data.breed_type
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
              service_id: 2
            }
            Services.getInstance().Packages(obj).then((result) => {
              console.log(result);
              if (result.status === true) {
                this.setState({
                  grooming_data: result.data,
                  general_addons: result.data[0].general_addons
                })
              }
              else if (result.status === false) {
                this.setState({
                  error_messgae: result.msg,
                })

              }
            })            

            //getting Device tokens
            const obj1 = {
              serviceid: 2,
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
      else{
        this.props.history.push({
          pathname : "/internet"
        })
      }

  }


  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    }
      , () => {
        console.log(this.state);
        if (this.state.c_service_time == "c-mrng") {
          document.getElementById("morning-slot").style.display = "block";
          document.getElementById("afternoon-slot").style.display = "none";
          document.getElementById("evening-slot").style.display = "none";
          if (this.state.timer < "16:30" && this.state.timer >= "12:00") {
            document.getElementById("es").selectedIndex = 0;
          }
          else if (this.state.timer < "21:30" && this.state.timer >= "17:00") {
            document.getElementById("as").selectedIndex = 0;
          }
          else {
            document.getElementById("as").selectedIndex = 0;
            document.getElementById("es").selectedIndex = 0;
          }


        }
        else if (this.state.c_service_time == "c-aftn") {
          document.getElementById("afternoon-slot").style.display = "block";
          document.getElementById("morning-slot").style.display = "none";
          document.getElementById("evening-slot").style.display = "none";
          if (this.state.timer < "12:00" && this.state.timer >= "05:00") {
            document.getElementById("es").selectedIndex = 0;
          }
          else if (this.state.timer < "21:30" && this.state.timer >= "17:00") {
            document.getElementById("ms").selectedIndex = 0;
          }
          else {
            document.getElementById("ms").selectedIndex = 0;
            document.getElementById("es").selectedIndex = 0;
          }
        }
        else if (this.state.c_service_time == "c-evng") {
          document.getElementById("evening-slot").style.display = "block";
          document.getElementById("morning-slot").style.display = "none";
          document.getElementById("afternoon-slot").style.display = "none";
          if (this.state.timer < "12:00" && this.state.timer >= "05:00") {
            document.getElementById("as").selectedIndex = 0;
          }
          else if (this.state.timer >= "12:00" && this.state.timer < "17:00") {
            document.getElementById("ms").selectedIndex = 0;
          }
          else {
            document.getElementById("as").selectedIndex = 0;
            document.getElementById("ms").selectedIndex = 0;
          }


        }
        else {

        }
      }
    );
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


  openLocation = () => {
    this.setState({
      // user_location : provider_location,
      location_popup: true,
    })
  }

  // useCurrentLocation = () => {
  //   console.log("hello")
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     console.log("Latitude is :", position.coords.latitude);
  //     console.log("Longitude is :", position.coords.longitude);

  //     const obj = {
  //       lon: position.coords.longitude,
  //       lat: position.coords.latitude,
  //     };
  //     console.log(obj);
  //     localStorage.setItem("serivce_provider_lat", position.coords.latitude);
  //     localStorage.setItem("serivce_provider_long", position.coords.longitude);

  //     //For Full Address
  //     const google = window.google;
  //     var latlng = new google.maps.LatLng(obj.lat, obj.lon);
  //     var geocoder = geocoder = new google.maps.Geocoder();
  //     geocoder.geocode({ 'latLng': latlng }, function (results, status) {
  //       if (status == google.maps.GeocoderStatus.OK) {
  //         if (results[1]) {
  //           console.log(results[1].formatted_address);
  //           localStorage.setItem("client_location", results[1].formatted_address);
  //         }
  //       }
  //       else {
  //         //
  //       }

  //     });
  //   });
  //   const provider_location1 = localStorage.getItem("client_location");
  //   this.setState({
  //     user_location: provider_location1,
  //     location_popup: false,
  //   })
  // }

  handleSelectLocations = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({ latLng: latLng }, () => {
          localStorage.setItem("serivce_provider_lat", latLng.lat);
          localStorage.setItem("serivce_provider_long", latLng.lng);
        })
      })
      .catch(error => console.error('Error', error));
    console.log(address)
    this.setState({ address });
  };

  handleChangeLocations = address => {
    this.setState({ address });
  };

  useLocation = (address) => {
    localStorage.setItem("client_location", address);
    this.setState({
      user_location: address,
      location_popup: false,
    })
  }



  Location = () => {
    this.setState({
      location_popup: true
    })
  }

  closePopUp = () => {
    this.setState({
      location_popup: false,
    })
  }

  Grooming_add_extras = (selected_ext, Clicks, extra_addons) => {
    let ext_add = extra_addons;
    ext_add = ext_add.map((s, index) => {
      if (selected_ext.name == s.name) {
        s.clicks = Number(s.clicks) + Number("1");
        if (s.clicks % 2 == 0) {
          document.getElementById(selected_ext.name).classList.remove("active");
          for (let i = 0; i < this.state.selected_extra_addons.length; i++) {
            if (selected_ext.name == this.state.selected_extra_addons[i].name) {
              this.state.selected_extra_addons.splice(i, 1);
            }
          }
          console.log(this.state.selected_extra_addons);
        } else {
          document.getElementById(selected_ext.name).classList.add("active");
          const obj = {
            name: selected_ext.name,
          }
          this.state.selected_extra_addons.push(obj);
          console.log(this.state.selected_extra_addons);
        }
        return s;
      }
    })
    this.setState({
      extra_addons: ext_add,
    })
  }


  haircut = (id, chck) => {
    if (document.getElementById(id).checked = true) {
      document.getElementById(id).checked = false
    }
    if (chck % 2 == 0) {
      document.getElementById(id).checked = true;
      this.setState(
        {
          haircheck: chck + 1,
          haircut: "minor cut"
        }
      )
    } else {
      this.setState(
        {
          haircheck: chck - 1,
          haircut: ""

        }
      )
    }
    if (document.getElementById(id).checked === true) {
      document.getElementById("hair cut").style.display = "flex";
    } else {
      document.getElementById("hair cut").style.display = "none";
    }
  }

  hairCutList = (id) => {
    if (id == "minor cut") {
      document.getElementById(id).classList.add("active");
      document.getElementById("stylish cut").classList.remove("active");
      document.getElementById("full cut").classList.remove("active");
      this.setState({
        haircut: id,
      })
    }
    else if (id == "stylish cut") {
      document.getElementById(id).classList.add("active");
      document.getElementById("minor cut").classList.remove("active");
      document.getElementById("full cut").classList.remove("active");
      this.setState({
        haircut: id
      })
    }
    else if (id == "full cut") {
      document.getElementById(id).classList.add("active");
      document.getElementById("minor cut").classList.remove("active");
      document.getElementById("stylish cut").classList.remove("active");
      this.setState({
        haircut: id
      })
    }
    else {
      document.getElementById("full cut").classList.remove("active");
      document.getElementById("minor cut").classList.remove("active");
      document.getElementById("stylish cut").classList.remove("active");
    }

  }

  SelectPackage = (packageId) => {
    this.setState({
      selected_package_id: packageId
    })
    if (packageId == "1") {
      document.getElementById("slct_active").classList.add("active");
    } else {
      document.getElementById("slct_active").classList.remove("active");
    }

  }

  moveToHomePage = () => {
    this.props.history.push({
      pathname: "/homepage"
    })
  }

  moveToGroomInfo = () => {

    this.validateForm();

  }


  validateForm = () => {
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
    else if (this.state.selected_package_id == "") {
      this.setState({
        input_error: {
          selected_package_id: "Please Select Package"
        }
      })
    } else if (this.state.calendar == "") {
      this.setState({
        input_error: {
          calendar: "Please Select Date"
        }
      })
    } else if (this.state.timer == "") {
      this.setState({
        input_error: {
          timer: "Please Select Time"
        }
      })
    }
    else if (this.state.message == "") {
      this.setState({
        input_error: {
          msg: "Please Enter Message"
        }
      })
    }
    else {
      this.setState({
        error_name: "",
        input_error: {
          calendar: "",
          timer: "",
          selected_package_id: "",
          user_checked_input: "",
        }
      })
      const obj = {
        client_id: userData.id,
        service_id: this.state.service_id,
        pet_id: this.state.user_checked_input.id,
        booking_date: this.state.calendar,
        booking_time: this.state.timer,
        package_id: this.state.selected_package_id,
        hair_cut: this.state.haircut,
        general_addons: this.state.grooming_data[0].general_addons,
        extra_addons: this.state.selected_extra_addons,
        latitude: latitude200,
        longitude: longitude200,
        pet_name: this.state.pet_name,
        package_name: this.state.package_name,
      }
      console.log(obj);
      document.getElementById("b-form").style.display = "none";
      document.getElementById("b-pre").style.display = "block";

    }
  }




  GroomSuccess = () => {
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
        booking_error: ""
      })
      const obj = {
        client_id: userData.id,
        service_id: this.state.service_id,
        pet_id: this.state.user_checked_input.id,
        booking_date: this.state.calendar,
        booking_time: this.state.timer,
        package_id: this.state.selected_package_id,
        hair_cut: this.state.haircut,
        general_addons: this.state.grooming_data[0].general_addons,
        extra_addons: this.state.selected_extra_addons,
        latitude: latitude200,
        longitude: longitude200,
        message: this.state.message,
        city: user_final_city,
      }

      console.log(device_token);

      Services.getInstance().GroomingBookings(obj).then((result) => {
        console.log(result);
        if (result.status === true) {
          const obj1 = {
            notification: {
              title: "Petsfolio",
              body: "Received A Request From " + userData.name + " For Dog Grooming",
              sound: "default"
            },
            registration_ids: device_token
          }
          Services.getInstance().SendBookingNotificationToSP(obj1).then((result) => {
            window.open("#/quotation", "_self");
            // console.log(result);
            // this.props.history.push({
            //   pathname : "/quotation"
            // })
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



  closeInfo = () => {
    document.getElementById("b-form").style.display = "block";
    document.getElementById("b-pre").style.display = "none";
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
            userAddress = results[1].formatted_address;
            results.forEach(function (result) {
              result.address_components.forEach(function (component) {
                if (component.types.includes('locality')) {
                  user_final_city = component.long_name;

                    //getting Device tokens
                    const obj1 = {
                      serviceid: 2,
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
    // console.log(results[0].address_components);
    this.state.locality.forEach(function (result) {
      result.address_components.forEach(function (component) {
        if (component.types.includes('locality')) {
          user_final_city = component.long_name;
          //getting Device tokens
            const obj1 = {
              serviceid: 2,
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


    // this.state.locality.forEach(function(result) {
    //   result.address_components.forEach(function(component) {
    //     if (component.types.includes('locality')) {
    //       user_final_city = component.long_name;
    //     }
    //   });
    // }); 
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
    return (
      <div>

        <div class="body" id='b-form' style={{ display: "block" }}>
          <div class="header_section">
            <div class="parent_head">
              <div class="logo_booking" onClick={this.moveToHomePage}>
                <img src="arrow-right.png" />
              </div>
              <div class="booking_text">
                <h3>Booking Summary</h3>
              </div>
            </div>
          </div>

          <div class="pet-main-info">
            <div class="pet_text">
              <h3>My Pet</h3>
            </div>


            {/* <div class="pet_info">
          <div class="pet_section">
            <DogsList
              handleDogChange = {this.handleDogChange}
              DogInfo = {this.DogInfo}
            />
          </div>
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

            <div class="select">
              <h3>Select Packages</h3>
            </div>

            {this.state.grooming_data && this.state.grooming_data.length > 0 ? this.state.grooming_data.map((grmData, index) => {
              return (
                <div class="packages p-top">
                  <div class="parent_section">
                    <div class="popular_txt">
                      <h3>Popular</h3>
                    </div>
                    <div class="grooming text">
                      <h2>{grmData.name}</h2>
                    </div>
                  </div>
                  <div class="start_from">
                    <h3>Start From <strong>{grmData.price}/-</strong></h3>

                  </div>
                  <div class="parent_general">
                    <div class="general">
                      <h3>General</h3>

                      {grmData.general_addons && grmData.general_addons.length > 0 ? grmData.general_addons.map((addon, index) => {
                        return (
                          <div class="cleaning_process">
                            <i class="fa fa-solid fa-check"></i><span>{addon.name}</span>
                          </div>
                        )
                      }) : ""
                      }

                    </div>
                    <div class="girl_img">
                      <img src="Vector-Smart-Object.png" />
                    </div>
                  </div>
                  <div class="parent_add">
                    <div class="extra">
                      <h3>Add Extra</h3>
                    </div>


                    <div class="pets_haircut" onClick={() => this.haircut("cut", this.state.haircheck)}>
                      {/* <div class="hair_cut">
                <input type="checkbox"
                 id="cut"
                 value = "cut"
                 onChange={this.handleChange}
                 onClick={()=>this.haircut("cut")}
                />
                  <label for="cuting">Hair Cut</label>
                </div> */}

                      <div class="hair_cut">
                        <div class="chk-items">
                          <input type="checkbox"
                            id="cut"
                            value="cut"
                            onChange={this.handleChange}
                            onClick={() => this.haircut("cut")}
                          />
                          <label for="cuting"></label>
                        </div>
                        <label for="cuting">Hair Cut</label>
                      </div>


                    </div>


                    <div class="cut_process" id="hair cut" style={{ display: "none" }}>
                      <div class="cut_list-item active" id="minor cut" onClick={() => this.hairCutList("minor cut", this.state.countClicks)}>Minor Cut</div>
                      <div class="cut_list-item" id="full cut" onClick={() => this.hairCutList("full cut", this.state.countClicks)} >Full Cut</div>
                      <div class="cut_list-item" id='stylish cut' onClick={() => this.hairCutList("stylish cut", this.state.countClicks)}>Stylish Cut</div>
                    </div>


                    <div class="dog_carring">
                      <div class="list_item">
                        {grmData.extra_addons && grmData.extra_addons.length > 0 ? grmData.extra_addons.map((extraAddOn, index) => {
                          return (
                            <div class="cleaning" key={index} id={extraAddOn.name} onClick={() => this.Grooming_add_extras(extraAddOn, this.state.Clicks, grmData.extra_addons)}>{extraAddOn.name}</div>
                          )
                        }) : ""
                        }
                      </div>
                    </div>
                  </div>

                  <div class="button_class">
                    <button class="btn" id='slct_active' onClick={() => this.SelectPackage(grmData.id)}>
                      <span> <img src="tic-min.png" /></span>
                      Select Package
                    </button>
                  </div>

                </div>


              )


            }) : " "
            }
            <div style={{ margin: '1px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.input_error.selected_package_id}</div>

            <div class="service_data">
              <h3>Select Service Date</h3>
              <div class="pet-age-input">
                <input class="date"
                  name='calendar'
                  type="date"
                  placeholder="Select Date"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div style={{ margin: '1px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.input_error.calendar}</div>
            {/* <div class="perferable_time">
          <h3>Select Perferable Time</h3>
          <div class="timer">
          <input class="input"
          type="time"
          name='timer'
          placeholder="Select Time"
          onChange={this.handleChange}
          />
          </div>
        </div> */}
            <section class="perferable_time">
              <h3>Select Perferable Time</h3>
            </section>
            <div style={{ margin: '1px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.input_error.timer}</div>

            {/* <div className='prfl-dtls'>
          <div class="prsnl-data">
            <h6 class="ad-edt">Address
                  <span><img src="edit-icon.png"  onClick={this.openLocation}/></span>
                </h6>
                <textarea placeholder="Basherbagh...."
                  value={this.state.user_location}
                  onChange={this.handleChange}
                  onClick={this.openLocation}>
                </textarea>
                </div>
                </div> */}
            <div className='time-main'>
              <div className="g-time-radio">
                {/* <div className='time-lft'>
                      <input
                        type='radio'
                        id="mrng" 
                        name="c_service_time" 
                        value="c-mrng" 
                        onChange={this.handleChange}/>
                        <label for="mrng">Morning</label>
                    </div> */}

                <div class="time-lft">
                  <div class="chk-items">
                    <input
                      type='radio'
                      id="mrng"
                      name="c_service_time"
                      value="c-mrng"
                      onChange={this.handleChange}
                    />
                    <label for="mrng"></label>
                  </div>
                  <label for="mrng">Morning</label>
                </div>



                <div id='morning-slot' style={{ display: "none" }}>
                  <select name='timer' onChange={this.handleChange} id='ms'>
                    <option>Select</option>
                    <option value="05:00">5:00 AM</option>
                    <option value="05:30">5:30 AM</option>
                    <option value="06:00">6:00 AM</option>
                    <option value="06:30">6:30 AM</option>
                    <option value="07:00">7:00 AM</option>
                    <option value="07:30">7:30 AM</option>
                    <option value="08:00">8:00 AM</option>
                    <option value="08:30">8:30 AM</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="09:30">9:30 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="10:30">10:30 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                  </select>
                </div>
              </div>


              <div className="g-time-radio">
                {/* <div>
                      <input
                        type='radio'
                        id="aftn" 
                        name="c_service_time" 
                        value="c-aftn" 
                        onChange={this.handleChange}/>
                        <label for="aftn">Afternoon</label>
                    </div> */}
                <div class="time-lft">
                  <div class="chk-items">
                    <input
                      type='radio'
                      id="aftn"
                      name="c_service_time"
                      value="c-aftn"
                      onChange={this.handleChange}
                    />
                    <label for="aftn"></label>
                  </div>
                  <label for="aftn">Afternoon</label>
                </div>
                <div id='afternoon-slot' style={{ display: "none" }}>
                  <select name='timer' onChange={this.handleChange} id='as'>
                    <option>Select</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="13:30">1:30 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="14:30">2:30 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="15:30">3:30 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="16:30">4:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="g-time-radio">
                {/* <div>
                      <input
                        type='radio'
                        id="evng" 
                        name="c_service_time" 
                        value="c-evng" 
                        onChange={this.handleChange}/>
                        <label for="evng">Evening</label>                    
                    </div> */}
                <div class="time-lft">
                  <div class="chk-items">
                    <input
                      type='radio'
                      id="evng"
                      name="c_service_time"
                      value="c-evng"
                      onChange={this.handleChange}
                    />
                    <label for="evng"></label>
                  </div>
                  <label for="evng">Evening</label>
                </div>
                <div id='evening-slot' style={{ display: "none" }}>
                  <select name='timer' onChange={this.handleChange} id='es'>
                    <option>Select</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="17:30">5:30 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                  </select>
                </div>
              </div>
            </div>



            <div class="btn_proceed">
              <button class="btn" onClick={this.moveToGroomInfo}>Proceed</button>
            </div>
          </div>
          {/* {
            this.state.location_popup ?
            <Location
            useCurrentLocation = {this.useCurrentLocation}
            closePopUp = {this.closePopUp}
            useLocation = {()=>this.useLocation(this.state.address)}
            handleSelectLocations = {this.handleSelectLocations}
            handleChangeLocations = {this.handleChangeLocations}
            address = {this.state.address}
            /> 
            : ""
          } */}
        </div>




        <div class="body_class" id='b-pre' style={{ display: "none" }}>
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

              <div class="fltr-pet">
                <div class="fltr-pet-lft">
                  <div class="fltr-pet-img">
                    <img src="my-pet.png" />
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
                    <img src="my-pet.png" />
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
                  <p>Start Date</p>
                </div>
                <div class="fltr-pet-rht dt">
                  <h5>{this.state.calendar}</h5>
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
                {this.state.timer < "12:00" ?
                  <div class="p-item">
                    <p>Morning</p>
                    <div class="trng-adons">
                      <div class="ad-ons-cst">
                        <span>{this.state.timer}</span>
                      </div>
                      <small>AM</small>
                    </div>
                  </div>
                  :
                  this.state.timer > "12:00" && this.state.timer < "17:00" ?
                    <div class="p-item">
                      <p>Afternoon</p>
                      <div class="trng-adons">
                        <div class="ad-ons-cst">
                          <span>{this.state.timer}</span>
                        </div>
                        <small>PM</small>
                      </div>
                    </div>
                    :
                    <div class="p-item">
                      <p>Evening</p>
                      <div class="trng-adons">
                        <div class="ad-ons-cst">
                          <span>{this.state.timer}</span>
                        </div>
                        <small>PM</small>
                      </div>
                    </div>
                }
              </div>
              {/* <div class="package">
              <div class="pack_img">
                <img src="star.png" />
                  <div class="package_text">
                    <h4>Package</h4>
                  </div>
              </div>
          </div> */}

              <div class="basic_parent p-t">
                <div class="basic_info">
                  <div class="basic_text">
                    <h4>{this.state.package_name}</h4>
                  </div>
                </div>
              </div>

              <div class="three_tickets p-t">

                {this.state.general_addons && this.state.general_addons.length > 0 ?
                  <div class="tickets">
                    {this.state.general_addons && this.state.general_addons.length > 0 ? this.state.general_addons.map((add, index) => {
                      return (
                        <div class="clean_info" key={index}>
                          <i class="fa fa-solid fa-check"></i>
                          <div class="clean_text">
                            <h4>{add.name}</h4>
                          </div>
                        </div>
                      )
                    }) : ""}
                  </div>
                  : ""}
              </div>
              <div class="add_on p-t">
                <h4>Add-Ons</h4>
              </div>
              <div class="three_tickets p-t">
                <div class="tickets">
                  {this.state.haircut == "" ? "" :
                    <div class="clean_info">
                      <i class="fa fa-solid fa-check"></i>
                      <div class="clean_text">
                        <h4>{this.state.haircut}</h4>
                      </div>
                    </div>
                  }
                  {this.state.selected_extra_addons && this.state.selected_extra_addons.length > 0 ? this.state.selected_extra_addons.map((extra_addons, index) => {
                    return (
                      <div class="clean_info">
                        <i class="fa fa-solid fa-check"></i>
                        <div class="clean_text">
                          <h4>{extra_addons.name}</h4>
                        </div>
                      </div>
                    )
                  }) : ""}

                </div>
              </div>

              <div class="fltr-prv-note">
                <h5>Address
                  <span onClick={this.openGoogleLocations} class="lpopup"><img src="edit-icon.png" /></span>
                </h5>
                <div class="note-txt" onClick={this.openGoogleLocations}>
                  {userAddress == "" ? <p>Please add service required location</p> : <p>{userAddress}</p>}
                </div>
              </div>




              <div class="additional">
                <div class="note">
                  <h4>Additional Notes</h4>
                </div>
              </div>
              <div class="eg_section">
                <textarea
                  placeholder="Please add your comments here"
                  name='message'
                  onChange={this.handleChange}
                >
                </textarea>
              </div>
              <div style={{ margin: '1px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.input_error.msg}</div>



            </div>





          </div>
          <p style={{ margin: '10px', color: 'red', textAlign: "center" }}>{this.state.booking_error}</p>
          <div class="button">
            <button onClick={this.GroomSuccess}>Submit</button>
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

export default GroomBooking