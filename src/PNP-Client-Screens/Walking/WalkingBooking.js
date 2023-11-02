import React, { Component } from 'react'
import '../CSS/WalkingCSS/WalkingBooking.css'
import DogsList from '../EntryScreens/DogsList';
import WalkingPerDay from './WalkingPerDay'
import Services from '../Services/Services';
import Location from '../EntryScreens/Location';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from '../EntryScreens/DarkBackground';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css







let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));
const longitude = localStorage.getItem(`serivce_provider_long`);
const latitude = localStorage.getItem(`serivce_provider_lat`);
let location = localStorage.getItem(`client-location`);
let user_final_city = "";
let latitude200 = "";
let longitude200 = "";
let userAddress = "";
let device_token = [];


export class WalkingBooking extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    toDate: "",
    fromDate: "",
    time: "",
    time1: "",
    time2: "",
    required_days: "",
    service_type: "",
    pet_name: "",
    breed_type:"",
    pet_id: "",
    package_name: "",
    ser_time: "",
    checkbox1: false,
    user_checked_input: "",
    walking_packages: [],
    service_id: "4",
    c_service_time: "",
    c_service_time1: "",
    c_service_time2: "",
    c_service_time3: "",
    required_Walk: "",
    selected_package_id: "",
    booking_time: [],
    location_popup: false,
    latLng: "",
    address: userAddress,
    number_of_months: 1,
    message: "Walking",
    number_of_sundays: 0,
    total_working_days: 0,
    input_error: {
      input_error_user_checked_input: "",
      input_error_selected_package_id: "",
    },
    location_popup: false,
    latLng: "",
    locality: [],
    loading: false,
    booking_error: "",
    loading: false,
    device_token: [],
    txt_msg: "",
    txt_msg2: "",
    userdogs: []

  }

  componentDidMount = () => {


    if (navigator.onLine) {
      this.setState({
        service_type: "MonthlyPackage",
        package_name: "Monthly Package",
        required_Walk: "",
        required_days: "",
        selected_package_id: "",
      }, () => {
        document.getElementById("service-Monthly").classList.add("active");
        document.getElementById("monthly_package").style.display = "block";
        document.getElementById("service-perDay").classList.remove("active");
        document.getElementById("per_day").style.display = "none";
        document.getElementById("p-dropdown").style.display = "block";
        document.getElementById("p-date-manual").style.pointerEvents = "none";
        document.getElementById("u-slot-1").style.display = "none"
        document.getElementById("u-slot-2").style.display = "none"
        document.getElementById("u-slot-3").style.display = "none"
        document.getElementById("slct_active").classList.remove("active");
        document.getElementById("slct_active1").classList.remove("active");
      })
      let today = new Date().toISOString().split('T')[0];
      document.getElementsByName("fromDate")[0].setAttribute('min', today);
      document.getElementsByName("toDate")[0].setAttribute('min', today);
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
        service_id: 4
      }
      Services.getInstance().Packages(obj).then((result) => {
        console.log(result);
        if (result.status === true) {
          this.setState({
            walking_packages: result.data
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
        serviceid: 4,
        city: user_final_city
      }
      Services.getInstance().get_device_tokens(obj1).then((result) => {
        console.log(result);
        device_token = result;
        // this.setState({
        //   device_token: result
        // })
      })

    }
    else {
      this.props.history.push({
        pathname: "/internet"
      })
    }

  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    }
      , () => {
        console.log(this.state)
        if (this.state.c_service_time == "c-mrng") {
          document.getElementById("morning-slot").style.display = "flex";
        }
        else if (this.state.c_service_time1 == "c-aftn") {
          document.getElementById("afternoon-slot").style.display = "flex";
        }
        else if (this.state.c_service_time2 == "c-evng") {
          document.getElementById("evening-slot").style.display = "flex";
        }
        document.getElementsByName("toDate")[0].setAttribute('min', this.state.fromDate);
        if (this.state.service_type == "MonthlyPackage") {
          var date = new Date(this.state.fromDate);
          date.setDate(date.getDate() + (28 * (parseInt(this.state.number_of_months))));
          console.log(date);
          var event = new Date(date);
          let date200 = JSON.stringify(event)
          let date300 = date200.slice(1, 11)
          console.log(date300)
          this.setState({
            toDate: date300
          })
          var start = new Date(this.state.fromDate);
          var finish = new Date(date300);
          var dayMilliseconds = 1000 * 60 * 60 * 24;
          var weekendDays = 0;
          while (start <= finish) {
            var day = start.getDay()
            if (day == 0) {
              weekendDays++;
            }
            start = new Date(+start + dayMilliseconds);
          }
          this.setState({
            number_of_sundays: weekendDays,
          }, () => {
            if (this.state.required_days == "Mon-Sat") {
              this.setState({
                total_working_days: ((28 * this.state.number_of_months)) - ((this.state.number_of_sundays))
              })
            }
            else {
              this.setState({
                total_working_days: ((28 * this.state.number_of_months))
              })
            }
          })




        }
        if (this.state.required_Walk == "1") {
          document.getElementById("u-slot-1").style.display = "flex"
          document.getElementById("u-slot-2").style.display = "none"
          document.getElementById("u-slot-3").style.display = "none"
          this.setState({
            booking_time: [
              { time: this.state.time },
            ],
          })
          if (this.state.c_service_time1 == "Morning") {
            document.getElementById("morning-slot-1").style.display = "block"
            document.getElementById("afternoon-slot-1").style.display = "none"
            document.getElementById("evening-slot-1").style.display = "none"
          }
          else if (this.state.c_service_time1 == "Afternoon") {
            document.getElementById("morning-slot-1").style.display = "none"
            document.getElementById("afternoon-slot-1").style.display = "block"
            document.getElementById("evening-slot-1").style.display = "none"
          }
          else if (this.state.c_service_time1 == "Evening") {
            document.getElementById("morning-slot-1").style.display = "none"
            document.getElementById("afternoon-slot-1").style.display = "none"
            document.getElementById("evening-slot-1").style.display = "block"
          }
        }



        else if (this.state.required_Walk == "2") {
          document.getElementById("u-slot-1").style.display = "flex"
          document.getElementById("u-slot-2").style.display = "flex"
          document.getElementById("u-slot-3").style.display = "none"
          this.setState({
            booking_time: [
              { time: this.state.time },
              { time: this.state.time1 },
            ],
          })
          if (this.state.c_service_time1 == "Morning") {
            document.getElementById("morning-slot-1").style.display = "block"
            document.getElementById("afternoon-slot-1").style.display = "none"
            document.getElementById("evening-slot-1").style.display = "none"
          }
          else if (this.state.c_service_time1 == "Afternoon") {
            document.getElementById("morning-slot-1").style.display = "none"
            document.getElementById("afternoon-slot-1").style.display = "block"
            document.getElementById("evening-slot-1").style.display = "none"
          }
          else if (this.state.c_service_time1 == "Evening") {
            document.getElementById("morning-slot-1").style.display = "none"
            document.getElementById("afternoon-slot-1").style.display = "none"
            document.getElementById("evening-slot-1").style.display = "block"
          }

          if (this.state.c_service_time2 == "Morning") {
            document.getElementById("morning-slot-2").style.display = "block"
            document.getElementById("afternoon-slot-2").style.display = "none"
            document.getElementById("evening-slot-2").style.display = "none"
          }
          else if (this.state.c_service_time2 == "Afternoon") {
            document.getElementById("morning-slot-2").style.display = "none"
            document.getElementById("afternoon-slot-2").style.display = "block"
            document.getElementById("evening-slot-2").style.display = "none"
          }
          else if (this.state.c_service_time2 == "Evening") {
            document.getElementById("morning-slot-2").style.display = "none"
            document.getElementById("afternoon-slot-2").style.display = "none"
            document.getElementById("evening-slot-2").style.display = "block"
          }
        }

        else if (this.state.required_Walk == "3") {
          document.getElementById("u-slot-1").style.display = "flex"
          document.getElementById("u-slot-2").style.display = "flex"
          document.getElementById("u-slot-3").style.display = "flex"
          this.setState({
            booking_time: [
              { time: this.state.time },
              { time: this.state.time1 },
              { time: this.state.time2 }
            ]
          })

          if (this.state.c_service_time1 == "Morning") {
            document.getElementById("morning-slot-1").style.display = "block"
            document.getElementById("afternoon-slot-1").style.display = "none"
            document.getElementById("evening-slot-1").style.display = "none"
          }
          else if (this.state.c_service_time1 == "Afternoon") {
            document.getElementById("morning-slot-1").style.display = "none"
            document.getElementById("afternoon-slot-1").style.display = "block"
            document.getElementById("evening-slot-1").style.display = "none"
          }
          else if (this.state.c_service_time1 == "Evening") {
            document.getElementById("morning-slot-1").style.display = "none"
            document.getElementById("afternoon-slot-1").style.display = "none"
            document.getElementById("evening-slot-1").style.display = "block"
          }


          if (this.state.c_service_time2 == "Morning") {
            document.getElementById("morning-slot-2").style.display = "block"
            document.getElementById("afternoon-slot-2").style.display = "none"
            document.getElementById("evening-slot-2").style.display = "none"
          }
          else if (this.state.c_service_time2 == "Afternoon") {
            document.getElementById("morning-slot-2").style.display = "none"
            document.getElementById("afternoon-slot-2").style.display = "block"
            document.getElementById("evening-slot-2").style.display = "none"
          }
          else if (this.state.c_service_time2 == "Evening") {
            document.getElementById("morning-slot-2").style.display = "none"
            document.getElementById("afternoon-slot-2").style.display = "none"
            document.getElementById("evening-slot-2").style.display = "block"
          }


          if (this.state.c_service_time3 == "Morning") {
            document.getElementById("morning-slot-3").style.display = "block"
            document.getElementById("afternoon-slot-3").style.display = "none"
            document.getElementById("evening-slot-3").style.display = "none"
          }
          else if (this.state.c_service_time3 == "Afternoon") {
            document.getElementById("morning-slot-3").style.display = "none"
            document.getElementById("afternoon-slot-3").style.display = "block"
            document.getElementById("evening-slot-3").style.display = "none"
          }
          else if (this.state.c_service_time3 == "Evening") {
            document.getElementById("morning-slot-3").style.display = "none"
            document.getElementById("afternoon-slot-3").style.display = "none"
            document.getElementById("evening-slot-3").style.display = "block"
          }

        }

        else if (this.state.required_Walk == "walk-1") {
          this.setState({
            booking_time: [
              { time: this.state.time }
            ]
          })
        } else if (this.state.required_Walk == "walk-2") {
          this.setState({
            booking_time: [
              { time: this.state.time },
              { time: this.state.time1 }
            ]
          })
        } else if (this.state.required_Walk == "walk-3") {
          this.setState({
            booking_time: [
              { time: this.state.time },
              { time: this.state.time1 },
              { time: this.state.time2 }
            ]
          })
        } else {
        }

      }
    );
  }




  addDays(myDate, days) {
    return new Date(myDate.getTime() + days * 24 * 60 * 60 * 1000);
  }


  WalkPerDay = (req_walk) => {
    console.log("he111")
    this.setState({
      required_Walk: req_walk
    })
    if (req_walk == "1") {
      this.setState({
        c_service_time1: "",
        c_service_time2: "",
        c_service_time3: "",
        time: "",
        time1: "",
        time2: "",
        txt_msg: "",
        txt_msg2: ""
      })
      document.getElementById("u-slot-1").style.display = "flex"
      document.getElementById("u-slot-2").style.display = "none"
      document.getElementById("u-slot-3").style.display = "none"
      document.getElementById("msr1").selectedIndex = 0;
      document.getElementById("msr2").selectedIndex = 0;
      document.getElementById("msr3").selectedIndex = 0;
      document.getElementById("msr4").selectedIndex = 0;
      document.getElementById("msr5").selectedIndex = 0;
      document.getElementById("msr6").selectedIndex = 0;
      document.getElementById("msr7").selectedIndex = 0;
      document.getElementById("msr8").selectedIndex = 0;
      document.getElementById("msr9").selectedIndex = 0;
      document.getElementById("cs1").selectedIndex = 0;
      document.getElementById("cs2").selectedIndex = 0;
      document.getElementById("cs3").selectedIndex = 0;

    } else if (req_walk == "2") {
      this.setState({
        c_service_time1: "",
        c_service_time2: "",
        c_service_time3: "",
        time: "",
        time1: "",
        time2: "",
        txt_msg: "",
        txt_msg2: ""
      })
      document.getElementById("u-slot-1").style.display = "flex"
      document.getElementById("u-slot-2").style.display = "flex"
      document.getElementById("u-slot-3").style.display = "none"
      document.getElementById("msr1").selectedIndex = 0;
      document.getElementById("msr2").selectedIndex = 0;
      document.getElementById("msr3").selectedIndex = 0;
      document.getElementById("msr4").selectedIndex = 0;
      document.getElementById("msr5").selectedIndex = 0;
      document.getElementById("msr6").selectedIndex = 0;
      document.getElementById("msr7").selectedIndex = 0;
      document.getElementById("msr8").selectedIndex = 0;
      document.getElementById("msr9").selectedIndex = 0;
      document.getElementById("cs1").selectedIndex = 0;
      document.getElementById("cs2").selectedIndex = 0;
      document.getElementById("cs3").selectedIndex = 0;

    } else if (req_walk == "3") {
      this.setState({
        c_service_time1: "",
        c_service_time2: "",
        c_service_time3: "",
        time: "",
        time1: "",
        time2: "",
        txt_msg: "",
        txt_msg2: ""
      })
      document.getElementById("u-slot-1").style.display = "flex"
      document.getElementById("u-slot-2").style.display = "flex"
      document.getElementById("u-slot-3").style.display = "flex"
      document.getElementById("msr1").selectedIndex = 0;
      document.getElementById("msr2").selectedIndex = 0;
      document.getElementById("msr3").selectedIndex = 0;
      document.getElementById("msr4").selectedIndex = 0;
      document.getElementById("msr5").selectedIndex = 0;
      document.getElementById("msr6").selectedIndex = 0;
      document.getElementById("msr7").selectedIndex = 0;
      document.getElementById("msr8").selectedIndex = 0;
      document.getElementById("msr9").selectedIndex = 0;
      document.getElementById("cs1").selectedIndex = 0;
      document.getElementById("cs2").selectedIndex = 0;
      document.getElementById("cs3").selectedIndex = 0;
    } else {

    }
  }

  RequiredServiceDays = (req_days) => {

    this.setState({
      required_days: req_days
    },
      () => {
        if (this.state.required_days == "Mon-Sat") {
          this.setState({
            total_working_days: ((28 * this.state.number_of_months)) - ((this.state.number_of_sundays))
          })
        }
        else {
          this.setState({
            total_working_days: ((28 * this.state.number_of_months))
          })
        }
      }
    )
  }

  ServiceType = (ser_type) => {
    this.setState({
      service_type: ser_type
    })
    if (ser_type == "MonthlyPackage") {
      this.setState({
        package_name: "Monthly Package",
        required_Walk: "",
        required_days: "",
        selected_package_id: "",
        txt_msg2: "",
        input_error : {
          required_Walk : "",
          required_days: "",
        }
      })
      document.getElementById("service-Monthly").classList.add("active");
      document.getElementById("monthly_package").style.display = "block";
      document.getElementById("service-perDay").classList.remove("active");
      document.getElementById("per_day").style.display = "none";
      document.getElementById("p-dropdown").style.display = "block";
      document.getElementById("p-date-manual").style.pointerEvents = "none";
      document.getElementById("u-slot-1").style.display = "none"
      document.getElementById("u-slot-2").style.display = "none"
      document.getElementById("u-slot-3").style.display = "none"
      document.getElementById("slct_active").classList.remove("active");
      document.getElementById("slct_active1").classList.remove("active");
      document.getElementById("s2").style.border = "2px solid white";
      document.getElementById("s1").style.border = "2px solid white";
      document.getElementById("s3").style.border = "2px solid white";
      document.getElementById("walk-1").style.border = "2px solid white";
      document.getElementById("walk-2").style.border = "2px solid white";
      document.getElementById("walk-3").style.border = "2px solid white";
    }
    else if (ser_type == "PerDay") {
      this.setState({
        package_name: "Per Day",
        required_Walk: "",
        required_days: "",
        toDate: "",
        total_working_days: "",
        selected_package_id: "",
        txt_msg2: "",
        input_error : {
          required_Walk : "",
          required_days: "",
        }
      })
      document.getElementById("service-perDay").classList.add("active");
      document.getElementById("per_day").style.display = "block";
      document.getElementById("service-Monthly").classList.remove("active");
      document.getElementById("monthly_package").style.display = "none";
      document.getElementById("p-dropdown").style.display = "none";
      document.getElementById("p-date-manual").style.pointerEvents = "visible";
      document.getElementById("u-slot-1").style.display = "none"
      document.getElementById("u-slot-2").style.display = "none"
      document.getElementById("u-slot-3").style.display = "none"
      document.getElementById("slct_active").classList.remove("active");
      document.getElementById("slct_active1").classList.remove("active");
      document.getElementById("s2").style.border = "2px solid white";
      document.getElementById("s1").style.border = "2px solid white";
      document.getElementById("s3").style.border = "2px solid white";
      document.getElementById("walk-1").style.border = "2px solid white";
      document.getElementById("walk-2").style.border = "2px solid white";
      document.getElementById("walk-3").style.border = "2px solid white";
    }
    else {
      document.getElementById("service-Monthly").classList.remove("active");
      document.getElementById("monthly_package").style.display = "none";
      document.getElementById("service-perDay").classList.remove("active");
      document.getElementById("per_day").style.display = "none";
    }
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


  moveToHomePage = () => {
    this.props.history.push({
      pathname: "/homepage"
    })
  }


  MoveToWalkingInfo = () => {
    this.validateForm();

  }

  slctPackage = (package_id) => {
    this.setState({
      selected_package_id: package_id
    })

    if (package_id == "2") {
      document.getElementById("slct_active").classList.add("active");
      document.getElementById("slct_active1").classList.remove("active");
      window.scrollTo(0, document.body.scrollHeight);
    }
    else if (package_id == "3") {
      document.getElementById("slct_active1").classList.add("active");
      document.getElementById("slct_active").classList.remove("active");
      window.scrollTo(0, document.body.scrollHeight);
    }

  }

  RequiredWalk = (req_walk) => {
    this.setState({
      required_Walk: req_walk
    })
    if (req_walk == "1") {
      this.setState({
        c_service_time1: "",
        c_service_time2: "",
        c_service_time3: "",
        time: "",
        time1: "",
        time2: "",
        txt_msg: "",
        txt_msg2: ""
      })
      document.getElementById("u-slot-1").style.display = "flex"
      document.getElementById("u-slot-2").style.display = "none"
      document.getElementById("u-slot-3").style.display = "none"
      document.getElementById("msr1").selectedIndex = 0;
      document.getElementById("msr2").selectedIndex = 0;
      document.getElementById("msr3").selectedIndex = 0;
      document.getElementById("msr4").selectedIndex = 0;
      document.getElementById("msr5").selectedIndex = 0;
      document.getElementById("msr6").selectedIndex = 0;
      document.getElementById("msr7").selectedIndex = 0;
      document.getElementById("msr8").selectedIndex = 0;
      document.getElementById("msr9").selectedIndex = 0;
      document.getElementById("cs1").selectedIndex = 0;
      document.getElementById("cs2").selectedIndex = 0;
      document.getElementById("cs3").selectedIndex = 0;

    } else if (req_walk == "2") {
      // this.setState({
      //   c_service_time3 : "",
      //   time2 : ""
      // })
      this.setState({
        c_service_time1: "",
        c_service_time2: "",
        c_service_time3: "",
        time: "",
        time1: "",
        time2: "",
        txt_msg: "",
        txt_msg2: ""
      })
      document.getElementById("u-slot-1").style.display = "flex"
      document.getElementById("u-slot-2").style.display = "flex"
      document.getElementById("u-slot-3").style.display = "none"
      document.getElementById("msr1").selectedIndex = 0;
      document.getElementById("msr2").selectedIndex = 0;
      document.getElementById("msr3").selectedIndex = 0;
      document.getElementById("msr4").selectedIndex = 0;
      document.getElementById("msr5").selectedIndex = 0;
      document.getElementById("msr6").selectedIndex = 0;
      document.getElementById("msr7").selectedIndex = 0;
      document.getElementById("msr8").selectedIndex = 0;
      document.getElementById("msr9").selectedIndex = 0;
      document.getElementById("cs1").selectedIndex = 0;
      document.getElementById("cs2").selectedIndex = 0;
      document.getElementById("cs3").selectedIndex = 0;

    } else if (req_walk == "3") {
      this.setState({
        c_service_time1: "",
        c_service_time2: "",
        c_service_time3: "",
        time: "",
        time1: "",
        time2: "",
        txt_msg: "",
        txt_msg2: ""
      })
      document.getElementById("u-slot-1").style.display = "flex"
      document.getElementById("u-slot-2").style.display = "flex"
      document.getElementById("u-slot-3").style.display = "flex"
      document.getElementById("msr1").selectedIndex = 0;
      document.getElementById("msr2").selectedIndex = 0;
      document.getElementById("msr3").selectedIndex = 0;
      document.getElementById("msr4").selectedIndex = 0;
      document.getElementById("msr5").selectedIndex = 0;
      document.getElementById("msr6").selectedIndex = 0;
      document.getElementById("msr7").selectedIndex = 0;
      document.getElementById("msr8").selectedIndex = 0;
      document.getElementById("msr9").selectedIndex = 0;
      document.getElementById("cs1").selectedIndex = 0;
      document.getElementById("cs2").selectedIndex = 0;
      document.getElementById("cs3").selectedIndex = 0;
    } else {

    }
  }





  validateForm = () => {
    if (this.state.user_checked_input == "") {
      if (this.state.userdogs.length > 0) {
        this.setState({
          txt_msg2: "Please Select Pet."
        })
      }
      else {
        this.setState({
          txt_msg2: "Please Add Pet."
        })
      }
      window.scrollTo(0, 0);
    }
    else if (this.state.pet_name == "") {
      if (this.state.userdogs.length > 0) {
        this.setState({
          txt_msg2: "Please Select Pet."
        })
      }
      else {
        this.setState({
          txt_msg2: "Please Add Pet."
        })
      }
      window.scrollTo(0, 0);
    }
    else if (this.state.service_type == "MonthlyPackage" && this.state.required_days == "") {
      this.setState({
        txt_msg2: "",
        input_error: {
          required_days : "Please Select Required Days."
        }
      })
      window.scrollTo(0, 375);
      document.getElementById("weekMon-Sat").style.border = "2px solid red"
      document.getElementById("weekSat-Mon").style.border = "2px solid red"
    }
    else if (this.state.required_Walk == "") {
      this.setState({
        txt_msg2: "",
        input_error: {
          required_days : "",
          required_Walk : "Please Select Required Walks."
        }
      })
      window.scrollTo(0, 400);
      document.getElementById("weekMon-Sat").style.border = "2px solid white"
      document.getElementById("weekSat-Mon").style.border = "2px solid white"
      document.getElementById("s2").style.border = "2px solid red";
      document.getElementById("s1").style.border = "2px solid red";
      document.getElementById("s3").style.border = "2px solid red";
      document.getElementById("walk-1").style.border = "2px solid red";
      document.getElementById("walk-2").style.border = "2px solid red";
      document.getElementById("walk-3").style.border = "2px solid red";
    }
    else if (this.state.selected_package_id == "") {
      this.setState({
        txt_msg: "Please Select Package.",
        txt_msg2: "",
        input_error: {
          required_days : "",
          required_Walk : ""
        }
      })
      document.getElementById("s2").style.border = "2px solid white";
      document.getElementById("s1").style.border = "2px solid white";
      document.getElementById("s3").style.border = "2px solid white";

    } else if (this.state.fromDate == "") {
      this.setState({
        txt_msg: "Please Select From Date..",
        txt_msg2: ""
      })
    } else if (this.state.toDate == "") {
      this.setState({
        txt_msg: "Please Select To Date.",
        txt_msg2: ""
      })
    }
    else if (this.state.required_Walk == "1") {
      if (this.state.time == "") {
        this.setState({
          txt_msg: "Please select time slot for 1 walk.",
          txt_msg2: ""
        })
      }
      else {
        this.setState({
          booking_time: [
            { time: this.state.time },
          ],
          txt_msg: "",
          txt_msg2: ""
        })
        document.getElementById("b-form").style.display = "none";
        document.getElementById("b-pre").style.display = "block";
      }
    }
    else if (this.state.required_Walk == "2") {
      if ((this.state.time == "" || this.state.time1 == "")) {
        this.setState({
          txt_msg: "Please select time slots for 2 walks.",
          txt_msg2: ""
        })
      }
      else {
        this.setState({
          booking_time: [
            { time: this.state.time },
            { time: this.state.time1 }
          ],
          txt_msg: "",
          txt_msg2: ""
        })
        document.getElementById("b-form").style.display = "none";
        document.getElementById("b-pre").style.display = "block";
      }

    }
    else if (this.state.required_Walk == "3") {
      if (this.state.time == "" || this.state.time1 == "" || this.state.time2 == "") {
        this.setState({
          txt_msg: "Select slots orderly from morning to evening",
          txt_msg2: ""
        })
      }
      else {
        this.setState({
          booking_time: [
            { time: this.state.time },
            { time: this.state.time1 },
            { time: this.state.time2 },
          ],
          txt_msg: ""
        })
        document.getElementById("b-form").style.display = "none";
        document.getElementById("b-pre").style.display = "block";
      }
    }

    else {
      this.setState({
        error_name: "",
        txt_msg: "",
        txt_msg2: ""
      }, () => {
        const obj = {
          client_id: userData.id,
          service_id: this.state.service_id,
          pet_id: this.state.user_checked_input.id,
          package_id: this.state.selected_package_id,
          days_type: this.state.required_days,
          day_walks: this.state.required_Walk,
          from_date: this.state.fromDate,
          to_date: this.state.toDate,
          booking_time: this.state.booking_time,
          latitude: latitude,
          longitude: longitude,
          package_name: this.state.package_name,
          pet_name: this.state.pet_name
        }
        console.log(obj);
        document.getElementById("b-form").style.display = "none";
        document.getElementById("b-pre").style.display = "block";
      })


    }
  }


  WalkSuccess = () => {
    this.setState({
      loading: true
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
        package_id: this.state.selected_package_id,
        days_type: this.state.required_days,
        day_walks: this.state.required_Walk,
        from_date: this.state.fromDate,
        to_date: this.state.toDate,
        booking_time: this.state.booking_time,
        latitude: latitude200,
        longitude: longitude200,
        message: this.state.message,
        city: user_final_city,
      }

      Services.getInstance().walkingBookings(obj).then((result) => {
        console.log(result);
        if (result.status === true) {
          const obj1 = {
            notification: {
              title: "Petsfolio",
              body: "Received A Request From " + userData.name + " For Dog Walking",
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
            loading: false,
          })
        }
      })
    }
  }


  closeInfo = () => {
    document.getElementById("b-form").style.display = "block";
    document.getElementById("b-pre").style.display = "none";
  }


  timingselections = (id) => {
    if (document.getElementById(id).checked === true) {
      document.getElementById(id).checked = false
      if (id == "c-mrng") {
        document.getElementById("morning-slot").style.display = "none"
        this.setState({
          time: ""
        })
      }
      else if (id == "c_aftn") {
        document.getElementById("afternoon-slot").style.display = "none"
        this.setState({
          time1: ""
        })
      }
      else if (id == "c-evng") {
        document.getElementById("evening-slot").style.display = "none"
        this.setState({
          time2: ""
        })
      }
    }
    else {
      document.getElementById(id).checked = true
      if (id == "c-mrng") {
        document.getElementById("morning-slot").style.display = "flex"
      }
      else if (id == "c_aftn") {
        document.getElementById("afternoon-slot").style.display = "flex"
      }
      else if (id == "c-evng") {
        document.getElementById("evening-slot").style.display = "flex"
      }
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
            // console.log(results[1]);
            userAddress = results[1].formatted_address
            results.forEach(function (result) {
              result.address_components.forEach(function (component) {
                if (component.types.includes('locality')) {
                  user_final_city = component.long_name;
                  //getting Device tokens
                  const obj1 = {
                    serviceid: 4,
                    city: component.long_name
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
            serviceid: 4,
            city: component.long_name
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
    return (
      <div>
        <div class="dwalk-mn" id='b-form' style={{ display: "block" }}>
          <div class="dmn-head">
            <div class="dmn-head-icon">
              <img src="arrow-right.png" onClick={this.moveToHomePage} />
              <h5>Booking Summary</h5>
            </div>
          </div>

          <div class="dmn-body">
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


            <div style={{ margin: '10px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.txt_msg2}</div>

            <div class="dmn-service">
              <h4>Service Type</h4>
              <div class="mn-pk-list">
                <div class="mn-pk-item" id='service-Monthly' onClick={() => this.ServiceType("MonthlyPackage")} style={{ background: this.state.service_type == "MonthlyPackage" ? "#3cd1a2" : "#f5f5f5" }}>
                  <div class="mn-pk-img">
                    <img class="mp" src="left-2-star.png" />
                    <h5 style={{ color: this.state.service_type == "MonthlyPackage" ? "#fff" : "#a2a2a1" }}>Monthly Package</h5>
                    <img class="mp" src="right-2-star.png" />
                  </div>
                  {/* <p style={{color : this.state.service_type=="MonthlyPackage" ? "#fff" : "#a2a2a1"}}>Check out what are the </p> */}
                </div>
                <div class="mn-pk-item mn-pk-item2" id='service-perDay' onClick={() => this.ServiceType("PerDay")} style={{ background: this.state.service_type == "PerDay" ? "#ec6aad" : "#f5f5f5" }}>
                  <div class="mn-pk-img">
                    <img class="pdp-img" src="bone-left.png" />
                    <h5 style={{ color: this.state.service_type == "PerDay" ? "#fff" : "#a2a2a1" }}>Per Day Package</h5>
                    <img class="pdp-img2" src="bone-right.png" />
                  </div>
                  {/* <p style={{color : this.state.service_type=="PerDay" ? "#fff" : "#a2a2a1"}}>Check out what are the </p> */}
                </div>

              </div>
            </div>

            {/* Monthly Package */}
            <div class="dm-slct-pack" style={{ display: "none" }} id="monthly_package">
              <h5>Select Package</h5>
              <div class="dmn-slct-main">
                <div class="slct-walk-mt">
                  <img src="jumping-dog.png" />
                  <div class="slct-rpe-img">
                    <div class="slct-rpe-text">
                      {this.state.walking_packages && this.state.walking_packages.length > 0 ? <strong>{this.state.walking_packages[0].price}/-</strong> : " "}
                      <h3>Per Walk</h3>
                    </div>
                  </div>

                  <h4>Dog Walking</h4>
                </div>
                <div class="slct-req-walk">
                  <div class="req-walk-sd">
                    <h5>Required Service Days</h5>
                    <div class="req-wsd-list">
                      <div class="req-wsd-item" id='weekMon-Sat' onClick={() => this.RequiredServiceDays("Mon-Sat")}
                        style={{
                          backgroundColor: this.state.required_days == "Mon-Sat" ? "#feef55" : " ",
                          backgroundImage: this.state.required_days == "Mon-Sat" ? `url(${"black_Calendar.png"}) no-repeat 50% 50%` : " ",
                          color: this.state.required_days == "Mon-Sat" ? "#2b3440" : " ",
                          border: this.state.required_days == "Mon-Sat" ? "2px solid #feef55" : " ",
                        }}>Mon-Sat</div>
                      <div class="req-wsd-item" id='weekSat-Mon' onClick={() => this.RequiredServiceDays("Mon-Sun")} style={{ backgroundColor: this.state.required_days == "Mon-Sun" ? "#feef55" : " ", backgroundImage: this.state.required_days == "Mon-Sun" ? `url(${"black_Calendar.png"}) no-repeat 50% 50%` : " ", color: this.state.required_days == "Mon-Sun" ? "#2b3440" : " ", border: this.state.required_days == "Mon-Sun" ? "2px solid #feef55" : " ", }}>Mon-Sun</div>
                    </div>
                  </div>
                  <div class="req-walk-pd">
                    <h5>Required Walk Per Day</h5>
                    <div class="req-wpd-list">
                      <div class="req-wpd-item" id='s1' onClick={() => this.WalkPerDay("1")} style={{ background: this.state.required_Walk == "1" ? "#feef55" : " ", color: this.state.required_Walk == "1" ? "#2b3440" : "", border: this.state.required_Walk == "1" ? "2px solid #feef55" : "" }} >1 Walk</div>
                      <div class="req-wpd-item" id="s2" onClick={() => this.WalkPerDay("2")} style={{ background: this.state.required_Walk == "2" ? "#feef55" : " ", color: this.state.required_Walk == "2" ? "#2b3440" : " ", border: this.state.required_Walk == "2" ? "2px solid #feef55" : "" }}>2 Walk</div>
                      <div class="req-wpd-item" id='s3' onClick={() => this.WalkPerDay("3")} style={{ background: this.state.required_Walk == "3" ? "#feef55" : " ", color: this.state.required_Walk == "3" ? "#2b3440" : " ", border: this.state.required_Walk == "3" ? "2px solid #feef55" : "" }}>3 Walk</div>
                    </div>
                    <div class="slct-report">
                      <ul>
                        <li><img src="tick.png" /><span>Daily Walk Report</span></li>
                        <li><img src="tick.png" /><span>Money Back Guarantee</span></li>
                        <li><img src="tick.png" /><span>Professional Dog Walker Only</span></li>
                        <li><img src="tick.png" /><span>Secure Payment</span></li>
                        <li><img src="tick.png" /><span>Walk Distance</span></li>
                      </ul>
                    </div>
                    <div class="slct-men-img">
                      <img src="boy-dogs-walk.png" />
                    </div>

                    <div class="select-btn">
                      <button id='slct_active' onClick={() => this.slctPackage(this.state.walking_packages[0].id)}><span> <img src="check-circle-g.png" /></span>Select Package</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* perDay */}
            <div class="pet-select-pack" style={{ display: "none" }} id="per_day">
              <h5>Select Package</h5>
              <div class="pet-dog-main">
                <div class="pet-dog-walk">
                  <img src="happy-dog-walk.png" />
                  <h4>Dog Walking</h4>
                </div>
                <div class="pet-required-walk">
                  <div class="pet-req-walk-pd">
                    <h5>Required Walk Per Day</h5>
                    <div class="pet-req-walk-list">
                      <div class="pet-req-list-item" id='walk-1' onClick={() => this.RequiredWalk("1")} style={{ background: this.state.required_Walk == "1" ? "#feef55" : " ", color: this.state.required_Walk == "1" ? "#2b3440" : " ", border: this.state.required_Walk == "1" ? "2px solid #feef55" : " " }}>1 Walk</div>
                      <div class="pet-req-list-item" id='walk-2' onClick={() => this.RequiredWalk("2")} style={{ background: this.state.required_Walk == "2" ? "#feef55" : " ", color: this.state.required_Walk == "2" ? "#2b3440" : " ", border: this.state.required_Walk == "2" ? "2px solid #feef55" : " " }}>2 Walk</div>
                      <div class="pet-req-list-item" id='walk-3' onClick={() => this.RequiredWalk("3")} style={{ background: this.state.required_Walk == "3" ? "#feef55" : " ", color: this.state.required_Walk == "3" ? "#2b3440" : " ", border: this.state.required_Walk == "3" ? "2px solid #feef55" : " " }}>3 Walk</div>
                    </div>
                    <div class="pet-daily-report">
                      <ul>
                        <li><img src="tick.png" /><span>Booking Guarantee</span></li>
                        <li><img src="tick.png" /><span>Professional Dog Walker Only</span></li>
                        <li><img src="tick.png" /><span>Secure Payment</span></li>
                        <li><img src="tick.png" /><span>Assured Service</span></li>
                        <li><img src="tick.png" /><span>Each Walk Duration: 30min</span></li>
                      </ul>
                    </div>
                    <div class="pet-gril-walk-img">
                      <img src="girl-dog-walk.png" />
                    </div>
                    <div class="pet-select-btn">
                      <button id='slct_active1' onClick={() => this.slctPackage(this.state.walking_packages[1].id)}><span> <img src="check-circle-g.png" /></span>Select Package</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ margin: '1px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.input_error.required_days}</div>
            <div style={{ margin: '1px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.input_error.required_Walk}</div>

            <div id='p-dropdown' style={{ display: "none" }}>
              <select onChange={this.handleChange} name="number_of_months">
                <option value="1">1 Month</option>
                <option value="2">2 Months</option>
                <option value="3">3 Months</option>
              </select>
            </div>

            <div class="dmn-srv-date">
              <h5>Service Required Dates</h5>
              <div class="srv-dt-from-to">
                <div class="srv-dt-from">
                  <input
                    type="date"
                    name='fromDate'
                    onChange={this.handleChange}
                  />
                  <span>From</span>
                </div>

                <div class="srv-dt-to" id="p-date-manual" style={{ pointerEvents: "block" }}>
                  <input
                    type="date"
                    name='toDate'
                    value={this.state.toDate}
                    onChange={this.handleChange}
                  />
                  <span>To</span>
                </div>

                <div class="srv-dt-arow">
                  <img src="from-to-arrow.png" />
                </div>
              </div>

              {this.state.total_working_days == 0 ? "" :
                <div className='div-h'>
                  <p>{(this.state.total_working_days) + " days"}</p>
                </div>
              }

            </div>
            <div style={{ margin: '1px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.input_error.fromDate}</div>
            <div style={{ margin: '1px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.input_error.toDate}</div>

            <div class="dmn-prfb-time">
              <h5>Preferable Walk Time</h5>
            </div>

            <div id='u-slot-1' style={{ display: "none" }}>
              <div className='lft-tm'>
                <select name="c_service_time1" onChange={this.handleChange} id='cs1'>
                  <option value="">Select Slot</option>
                  {this.state.c_service_time1 == "Morning" ? <option value="Morning" disappear>Morning</option> : <option value="Morning">Morning</option>}
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>
              <div className='rht-tm'>
                <div id='morning-slot-1' style={{ display: "none" }}>
                  <select name='time' onChange={this.handleChange} id='msr1'>
                    <option value="">Select Time</option>
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


                <div id='afternoon-slot-1' style={{ display: "none" }}>
                  <select name='time' onChange={this.handleChange} id='msr2'>
                    <option value="">Select Time</option>
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


                <div id='evening-slot-1' style={{ display: "none" }}>
                  <select name='time' onChange={this.handleChange} id='msr3'>
                    <option value="">Select Time</option>
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

            <div id='u-slot-2' style={{ display: "none" }}>
              <div className='lft-tm'>
                <select name="c_service_time2" onChange={this.handleChange} id='cs2'>
                  <option value="">Select Slot</option>
                  {this.state.c_service_time1 == "Morning" ? "" : <option value="Morning">Morning</option>}
                  {this.state.c_service_time1 == "Afternoon" ? "" : <option value="Afternoon">Afternoon</option>}
                  {this.state.c_service_time1 == "Evening" ? "" : <option value="Evening">Evening</option>}
                </select>
              </div>
              <div className='rht-tm'>
                <div id='morning-slot-2' style={{ display: "none" }}>
                  <select name='time1' onChange={this.handleChange} id='msr4'>
                    <option value="">Select Time</option>
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


                <div id='afternoon-slot-2' style={{ display: "none" }}>
                  <select name='time1' onChange={this.handleChange} id='msr5' >
                    <option value="">Select Time</option>
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


                <div id='evening-slot-2' style={{ display: "none" }}>
                  <select name='time1' onChange={this.handleChange} id='msr6'>
                    <option value="">Select Time</option>
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

            <div id='u-slot-3' style={{ display: "none" }}>
              <div className='lft-tm'>
                <select name="c_service_time3" onChange={this.handleChange} id='cs3'>
                  <option value="">Select Slot</option>
                  {this.state.c_service_time1 == "Morning" || this.state.c_service_time2 == "Morning" ? "" : <option value="Morning">Morning</option>}
                  {this.state.c_service_time1 == "Afternoon" || this.state.c_service_time2 == "Afternoon" ? "" : <option value="Afternoon">Afternoon</option>}
                  {this.state.c_service_time1 == "Evening" || this.state.c_service_time2 == "Evening" ? "" : <option value="Evening">Evening</option>}
                </select>
              </div>
              <div className='rht-tm'>
                <div id='morning-slot-3' style={{ display: "none" }}>
                  <select name='tim2' onChange={this.handleChange} id='msr7'>
                    <option value="">Select Time</option>
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


                <div id='afternoon-slot-3' style={{ display: "none" }}>
                  <select name='time2' onChange={this.handleChange} id='msr8'>
                    <option value="">Select Time</option>
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


                <div id='evening-slot-3' style={{ display: "none" }}>
                  <select name='time2' onChange={this.handleChange} id='msr9'>
                    <option value="">Select Time</option>
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

            <div style={{ margin: '1px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.txt_msg}</div>
            <div style={{ margin: '1px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.input_error.selected_package_id}</div>
            <div style={{ margin: '1px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.input_error.user_checked_input}</div>
            <div style={{ margin: '1px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.input_error.time}</div>

            <div class="dmn-pcd-btn">
              <button onClick={this.MoveToWalkingInfo}>Proceed</button>
            </div>
          </div>
        </div>



        <div class="main-body" id='b-pre' style={{ display: "none" }}>
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
                  <p>{this.state.pet_name}</p>
                </div>

               
                  
              </div>

              <div class="pet-det-list-item">
                <div class="pet-list-img-text">
                  <div class="pet-img">
                    <img src="dog-foot.png" />
                  </div>
                  <div class="pet-text">
                    <p>Pet Breed</p>
                  </div>
                </div>
                <div class="pet-btn-text">
                  <div class="pet-list-package">
                    <p>{this.state.breed_type}</p>
                  </div>
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
                    <p>{this.state.package_name}</p>
                  </div>
                </div>
              </div>
              {this.state.required_days == "" ? <p></p> :
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
                      <p>{this.state.required_days}</p>
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
                    <p>{this.state.required_Walk}</p>
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
                    <span>{this.state.fromDate}</span>
                    <small></small>
                  </div>
                </div>
              </div>
              <div class="p-item">
                <p>To</p>
                <div class="trng-adons dt">
                  <div class="ad-ons-cst">
                    <span>{this.state.toDate}</span>
                    <small></small>
                  </div>
                </div>
              </div>

              {this.state.booking_time && this.state.booking_time.length > 0 ? this.state.booking_time.map((time, index) => {
                return (
                  <div>
                    {time.time == "" ? "" :
                      <div class="p-item" key={index}>
                        {time.time >= "05:00" && time.time < "12:00" ?
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
                          time.time >= "12:00" && time.time < "17:00" ?
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
                    }
                  </div>

                )
              }) : ""}
            </div>


            <div class="fltr-prv-note">
              <h5>Address
                <span onClick={this.openGoogleLocations} class="lpopup"><img src="edit-icon.png" /></span>
              </h5>
              <div class="note-txt" onClick={this.openGoogleLocations}>
                {userAddress == "" ? <p>Please add service required location</p> : <p>{userAddress}</p>}
              </div>
            </div>




            <div class="pet-additional">
              <h5>Additional Notes</h5>
              <div class="pet-adtnl-textarea">
                <textarea placeholder="Please add your comments here"
                  name='message'
                  onChange={this.handleChange}
                ></textarea>
              </div>

            </div>
          </section>
          <section class="pet-sub-btn">
            <p style={{ margin: '10px', color: 'red', textAlign: "center" }}>{this.state.booking_error}</p>
            <div class="pet-submit">
              <button onClick={this.WalkSuccess}>Submit</button>
            </div>
          </section>

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

export default WalkingBooking