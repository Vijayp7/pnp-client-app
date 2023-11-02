import React, { Component } from 'react'
import '../CSS/TrainingCSS/TrainingBooking.css'
import DogsList from '../EntryScreens/DogsList';
import TrainingAdvanced from './TrainingAdvanced'
import TrainingIntermediate from './TrainingIntermediate'
import Services from '../Services/Services';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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


let settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
        centerMode: true,
        centerPadding: '30px',
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
        centerMode: true,
        centerPadding: '30px',
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
        centerMode: true,
        centerPadding: '30px',
      }
    },
    {
      breakpoint: 767,
      settings: {
        adaptiveHeight: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
        centerMode: true,
        centerPadding: '30px',
      }
    },
    {
      breakpoint: 600,
      settings: {
        adaptiveHeight: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
        arrows: true,
        centerMode: true,
        centerPadding: '30px',
        slidesToShow: 1
      }
    },
  ]
};




export class TrainingBooking extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    Clicks: 0,
    countClicks: 0,
    preferrable_time: "",
    service_id: "3",
    training_packages: [],
    obd_gen_addons: [],
    obd_ext_addons: [],
    selected_ext_addon: [],
    pup_gen_addons: [],
    pup_ext_addons: [],
    int_gen_addons: [],
    int_ext_addons: [],
    adv_gen_addons: [],
    adv_ext_addons: [],
    obd_ext_addons_copy: [],
    pup_ext_addons_copy: [],
    int_ext_addons_copy: [],
    adv_ext_addons_copy: [],
    date: "",
    c_service_time: "",
    timer: "",
    pet_name: "",
    breed_type:"",
    pet_id: "",
    package_name: "Training",
    selected_pack_addons: [],
    selected_package_id: "",
    checkbox1: false,
    user_checked_input: "",
    AdvCountClicks: 0,
    location_popup: false,
    latLng: "",
    address: userAddress,
    message: "Training",
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
          document.getElementsByName("date")[0].setAttribute('min', today);
          console.log(today);
          if (!userData) {
            window.location.reload(true);
          }
          if (userData) {
            latitude200 = userData.latitude;
            longitude200 = userData.longitude;
            userAddress = userData.address;
            user_final_city = userData.city
          }
          const data = {
            customer_id: userData.id,
          }
          Services.getInstance().PetList(data).then((result) => {
            console.log(result);
            if (result.status === true) {
              this.setState({
                userdogs: result.data,
                breed_type:result.data.breed_type
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
            service_id: 3
          }
          Services.getInstance().Packages(obj).then((result) => {
            console.log(result);
            if (result.status === true) {
              this.setState({
                training_packages: result.data,
                obd_gen_addons: result.data[0].general_addons,
                obd_ext_addons: result.data[0].extra_addons,
                pup_gen_addons: result.data[1].general_addons,
                pup_ext_addons: result.data[1].extra_addons,
                int_gen_addons: result.data[2].general_addons,
                int_ext_addons: result.data[2].extra_addons,
                adv_gen_addons: result.data[3].general_addons,
                adv_ext_addons: result.data[3].extra_addons,
                obd_ext_addons_copy: result.data[0].extra_addons,
                pup_ext_addons_copy: result.data[1].extra_addons,
                int_ext_addons_copy: result.data[2].extra_addons,
                adv_ext_addons_copy: result.data[3].extra_addons,
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
            serviceid: 3,
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


  ObdTrainAddExtras = (selected_ext, obd_ext_addons, packId) => {
    if (this.state.selected_package_id !== packId) {
      this.setState({
        selected_ext_addon: []
      })
      for (let index = 0; index < this.state.pup_ext_addons.length; index++) {
        document.getElementById(index + "1").classList.remove("active");
      }
      for (let index = 0; index < this.state.int_ext_addons.length; index++) {
        // document.getElementById(index+"2").classList.remove("active");
        document.getElementById(index + "2").style.backgroundColor = "#fff";
        document.getElementById(index + "2").style.color = "#000";
      }
      for (let index = 0; index < this.state.adv_ext_addons.length; index++) {
        // document.getElementById(index+"3").classList.remove("active");
        document.getElementById(index + "3").style.backgroundColor = "#fff";
        document.getElementById(index + "3").style.color = "#000";
      }
    }
    this.setState({
      selected_package_id: packId
    }, () => {
      if (this.state.selected_package_id == packId) {
        console.log(obd_ext_addons);
        let ext_add = obd_ext_addons;
        ext_add = ext_add.map((s, index) => {
          if (selected_ext.name == s.name) {
            s.clicks = Number(s.clicks) + Number("1");
            if (s.clicks % 2 == 0) {
              document.getElementById(index + "0").classList.remove("active");
              for (let i = 0; i < this.state.selected_ext_addon.length; i++) {
                if (selected_ext.name == this.state.selected_ext_addon[i].name) {
                  this.state.selected_ext_addon.splice(i, 1);
                }
              }
            } else {
              document.getElementById(index + "0").classList.add("active");
              const obj = {
                name: selected_ext.name,
              }
              this.state.selected_ext_addon.push(obj);
              console.log(this.state.selected_ext_addon);
            }
            return s;
          }
        })
      }
      else {
        this.setState({
          selected_ext_addon: []
        })
      }





      if (packId == "4") {
        this.setState({
          package_name: "Obedience Training",
          selected_pack_addons: this.state.obd_gen_addons
        })
        document.getElementById("slct_active").classList.add("active");
        document.getElementById("slct_active1").classList.remove("active");
        document.getElementById("slct_active2").classList.remove("active");
        document.getElementById("slct_active3").classList.remove("active");
      } else if (packId == "5") {
        this.setState({
          package_name: "Puppy Training",
          selected_pack_addons: this.state.pup_gen_addons
        })
        document.getElementById("slct_active").classList.remove("active");
        document.getElementById("slct_active1").classList.add("active");
        document.getElementById("slct_active2").classList.remove("active");
        document.getElementById("slct_active3").classList.remove("active");
      }
      else if (packId == "6") {
        this.setState({
          package_name: "Intermediate Training",
          selected_pack_addons: this.state.int_gen_addons
        })
        document.getElementById("slct_active").classList.remove("active");
        document.getElementById("slct_active1").classList.remove("active");
        document.getElementById("slct_active2").classList.add("active");
        document.getElementById("slct_active3").classList.remove("active");
      }
      else if (packId == "8") {
        this.setState({
          package_name: "Advance Training",
          selected_pack_addons: this.state.adv_gen_addons
        })
        document.getElementById("slct_active").classList.remove("active");
        document.getElementById("slct_active1").classList.remove("active");
        document.getElementById("slct_active2").classList.remove("active");
        document.getElementById("slct_active3").classList.add("active");
      }
    })

  }



  PupTrainAddExtras = (pup_selected_ext, pup_ext_addons, packId) => {
    if (this.state.selected_package_id !== packId) {
      this.setState({
        selected_ext_addon: []
      })
      for (let index = 0; index < this.state.obd_ext_addons.length; index++) {
        document.getElementById(index + "0").classList.remove("active");
      }
      for (let index = 0; index < this.state.int_ext_addons.length; index++) {
        // document.getElementById(index+"2").classList.remove("active");
        document.getElementById(index + "2").style.backgroundColor = "#fff";
        document.getElementById(index + "2").style.color = "#000";

      }
      for (let index = 0; index < this.state.adv_ext_addons.length; index++) {
        // document.getElementById(index+"3").classList.remove("active");
        document.getElementById(index + "3").style.backgroundColor = "#fff";
        document.getElementById(index + "3").style.color = "#000";

      }
    }
    this.setState({
      selected_package_id: packId
    }, () => {
      if (this.state.selected_package_id == packId) {
        let pup_ext_add = pup_ext_addons;
        pup_ext_add = pup_ext_add.map((s, index) => {
          if (pup_selected_ext.name == s.name) {
            s.clicks = Number(s.clicks) + Number("1");
            if (s.clicks % 2 == 0) {
              document.getElementById(index + "1").classList.remove("active");
              for (let i = 0; i < this.state.selected_ext_addon.length; i++) {
                if (pup_selected_ext.name == this.state.selected_ext_addon[i].name) {
                  this.state.selected_ext_addon.splice(i, 1);
                }
              }
            } else {
              document.getElementById(index + "1").classList.add("active");
              const obj = {
                name: pup_selected_ext.name,
              }
              this.state.selected_ext_addon.push(obj);
              console.log(this.state.selected_ext_addon);
            }
            return s;
          }
        })
      }
      else {
        this.setState({
          selected_ext_addon: []
        })
      }



      if (packId == "4") {
        this.setState({
          package_name: "Obedience Training",
          selected_pack_addons: this.state.obd_gen_addons
        })
        document.getElementById("slct_active").classList.add("active");
        document.getElementById("slct_active1").classList.remove("active");
        document.getElementById("slct_active2").classList.remove("active");
        document.getElementById("slct_active3").classList.remove("active");
      } else if (packId == "5") {
        this.setState({
          package_name: "Puppy Training",
          selected_pack_addons: this.state.pup_gen_addons
        })
        document.getElementById("slct_active").classList.remove("active");
        document.getElementById("slct_active1").classList.add("active");
        document.getElementById("slct_active2").classList.remove("active");
        document.getElementById("slct_active3").classList.remove("active");
      }
      else if (packId == "6") {
        this.setState({
          package_name: "Intermediate Training",
          selected_pack_addons: this.state.int_gen_addons
        })
        document.getElementById("slct_active").classList.remove("active");
        document.getElementById("slct_active1").classList.remove("active");
        document.getElementById("slct_active2").classList.add("active");
        document.getElementById("slct_active3").classList.remove("active");
      }
      else if (packId == "8") {
        this.setState({
          package_name: "Advance Training",
          selected_pack_addons: this.state.adv_gen_addons
        })
        document.getElementById("slct_active").classList.remove("active");
        document.getElementById("slct_active1").classList.remove("active");
        document.getElementById("slct_active2").classList.remove("active");
        document.getElementById("slct_active3").classList.add("active");
      }








    })

  }

  IntAddExtras = (int_selected_ext, int_ext_addons, packId) => {
    if (this.state.selected_package_id !== packId) {
      this.setState({
        selected_ext_addon: []
      })
      for (let index = 0; index < this.state.obd_ext_addons.length; index++) {
        document.getElementById(index + "0").classList.remove("active");
      }
      for (let index = 0; index < this.state.pup_ext_addons.length; index++) {
        document.getElementById(index + "1").classList.remove("active");
      }
      for (let index = 0; index < this.state.adv_ext_addons.length; index++) {
        // document.getElementById(index+"3").classList.remove("active");
        document.getElementById(index + "3").style.backgroundColor = "#fff";
        document.getElementById(index + "3").style.color = "#000";

      }
    }

    this.setState({
      selected_package_id: packId
    }, () => {
      let int_ext_add = int_ext_addons;
      int_ext_add = int_ext_add.map((s, index) => {
        if (int_selected_ext.name == s.name) {
          s.clicks = Number(s.clicks) + Number("1");
          if (s.clicks % 2 == 0) {
            document.getElementById(index + "2").style.backgroundColor = "#fff";
            document.getElementById(index + "2").style.color = "#000";
            for (let i = 0; i < this.state.selected_ext_addon.length; i++) {
              if (int_selected_ext.name == this.state.selected_ext_addon[i].name) {
                this.state.selected_ext_addon.splice(i, 1);
              }
              console.log(this.state.selected_ext_addon);
            }
          } else {
            document.getElementById(index + "2").style.backgroundColor = "#ffb3cf";
            document.getElementById(index + "2").style.color = "#fff";
            const obj = {
              name: int_selected_ext.name,
            }
            this.state.selected_ext_addon.push(obj);
            console.log(this.state.selected_ext_addon);
          }
          return s;
        }
      })
    })

    if (packId == "4") {
      this.setState({
        package_name: "Obedience Training",
        selected_pack_addons: this.state.obd_gen_addons
      })
      document.getElementById("slct_active").classList.add("active");
      document.getElementById("slct_active1").classList.remove("active");
      document.getElementById("slct_active2").classList.remove("active");
      document.getElementById("slct_active3").classList.remove("active");
    } else if (packId == "5") {
      this.setState({
        package_name: "Puppy Training",
        selected_pack_addons: this.state.pup_gen_addons
      })
      document.getElementById("slct_active").classList.remove("active");
      document.getElementById("slct_active1").classList.add("active");
      document.getElementById("slct_active2").classList.remove("active");
      document.getElementById("slct_active3").classList.remove("active");
    }
    else if (packId == "6") {
      this.setState({
        package_name: "Intermediate Training",
        selected_pack_addons: this.state.int_gen_addons
      })
      document.getElementById("slct_active").classList.remove("active");
      document.getElementById("slct_active1").classList.remove("active");
      document.getElementById("slct_active2").classList.add("active");
      document.getElementById("slct_active3").classList.remove("active");
    }
    else if (packId == "8") {
      this.setState({
        package_name: "Advance Training",
        selected_pack_addons: this.state.adv_gen_addons
      })
      document.getElementById("slct_active").classList.remove("active");
      document.getElementById("slct_active1").classList.remove("active");
      document.getElementById("slct_active2").classList.remove("active");
      document.getElementById("slct_active3").classList.add("active");
    }




  }


  AdvAddExtras = (adv_selected_ext, adv_ext_addons, packId) => {
    if (this.state.selected_package_id !== packId) {
      this.setState({
        selected_ext_addon: []
      })
      for (let index = 0; index < this.state.obd_ext_addons.length; index++) {
        document.getElementById(index + "0").classList.remove("active");
      }
      for (let index = 0; index < this.state.int_ext_addons.length; index++) {
        // document.getElementById(index+"2").classList.remove("active");
        document.getElementById(index + "2").style.backgroundColor = "#fff";
        document.getElementById(index + "2").style.color = "#000";
      }
      for (let index = 0; index < this.state.pup_ext_addons.length; index++) {
        document.getElementById(index + "1").classList.remove("active");
      }
    }
    this.setState({
      selected_package_id: packId
    }, () => {
      let adv_ext_add = adv_ext_addons;
      adv_ext_add = adv_ext_add.map((s, index) => {
        if (adv_selected_ext.name == s.name) {
          s.clicks = Number(s.clicks) + Number("1");
          if (s.clicks % 2 == 0) {
            document.getElementById(index + "3").style.backgroundColor = "#fff";
            document.getElementById(index + "3").style.color = "#000";
            for (let i = 0; i < this.state.selected_ext_addon.length; i++) {
              if (adv_selected_ext.name == this.state.selected_ext_addon[i].name) {
                this.state.selected_ext_addon.splice(i, 1);
              }
            }
          } else {
            document.getElementById(index + "3").style.backgroundColor = "#5fc2ed";
            document.getElementById(index + "3").style.color = "#fff";
            const obj = {
              name: adv_selected_ext.name,
            }
            this.state.selected_ext_addon.push(obj);
            console.log(this.state.selected_ext_addon);
          }
          return s;
        }
      })



      if (packId == "4") {
        this.setState({
          package_name: "Obedience Training",
          selected_pack_addons: this.state.obd_gen_addons
        })
        document.getElementById("slct_active").classList.add("active");
        document.getElementById("slct_active1").classList.remove("active");
        document.getElementById("slct_active2").classList.remove("active");
        document.getElementById("slct_active3").classList.remove("active");
      } else if (packId == "5") {
        this.setState({
          package_name: "Puppy Training",
          selected_pack_addons: this.state.pup_gen_addons
        })
        document.getElementById("slct_active").classList.remove("active");
        document.getElementById("slct_active1").classList.add("active");
        document.getElementById("slct_active2").classList.remove("active");
        document.getElementById("slct_active3").classList.remove("active");
      }
      else if (packId == "6") {
        this.setState({
          package_name: "Intermediate Training",
          selected_pack_addons: this.state.int_gen_addons
        })
        document.getElementById("slct_active").classList.remove("active");
        document.getElementById("slct_active1").classList.remove("active");
        document.getElementById("slct_active2").classList.add("active");
        document.getElementById("slct_active3").classList.remove("active");
      }
      else if (packId == "8") {
        this.setState({
          package_name: "Advance Training",
          selected_pack_addons: this.state.adv_gen_addons
        })
        document.getElementById("slct_active").classList.remove("active");
        document.getElementById("slct_active1").classList.remove("active");
        document.getElementById("slct_active2").classList.remove("active");
        document.getElementById("slct_active3").classList.add("active");
      }


    })

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

  PreferrableTime = (pref_time) => {
    this.setState({
      preferrable_time: pref_time
    }, () => console.log(this.state))
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


  SelectPackage = (packageId) => {
    this.setState({
      selected_package_id: packageId
    })
    if (packageId == "4") {
      this.setState({
        package_name: "Obedience Training",
        selected_pack_addons: this.state.obd_gen_addons
      })
      document.getElementById("slct_active").classList.add("active");
      document.getElementById("slct_active1").classList.remove("active");
      document.getElementById("slct_active2").classList.remove("active");
      document.getElementById("slct_active3").classList.remove("active");
    } else if (packageId == "5") {
      this.setState({
        package_name: "Puppy Training",
        selected_pack_addons: this.state.pup_gen_addons
      })
      document.getElementById("slct_active").classList.remove("active");
      document.getElementById("slct_active1").classList.add("active");
      document.getElementById("slct_active2").classList.remove("active");
      document.getElementById("slct_active3").classList.remove("active");
    }
    else if (packageId == "6") {
      this.setState({
        package_name: "Intermediate Training",
        selected_pack_addons: this.state.int_gen_addons
      })
      document.getElementById("slct_active").classList.remove("active");
      document.getElementById("slct_active1").classList.remove("active");
      document.getElementById("slct_active2").classList.add("active");
      document.getElementById("slct_active3").classList.remove("active");
    }
    else if (packageId == "8") {
      this.setState({
        package_name: "Advance Training",
        selected_pack_addons: this.state.adv_gen_addons
      })
      document.getElementById("slct_active").classList.remove("active");
      document.getElementById("slct_active1").classList.remove("active");
      document.getElementById("slct_active2").classList.remove("active");
      document.getElementById("slct_active3").classList.add("active");
    }
    return;
  }

  moveToHomePage = () => {
    this.props.history.push({
      pathname: "/homepage"
    })
  }

  MoveToTrainingInfo = () => {

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
    } else if (this.state.date == "") {
      this.setState({
        input_error: {
          date: "Please Select Date"
        }
      })
    } else if (this.state.timer == "") {
      this.setState({
        input_error: {
          timer: "Please Select Time"
        }
      })
    }

    else if (this.state.c_service_time == "") {
      this.setState({
        input_error: {
          preferrable_time: "Please Select Time"
        }
      })
    } else {
      this.setState({
        error_name: "",
        input_error: {
          user_checked_input: "",
          preferrable_time: "",
          timer: "",
          date: "",
          selected_package_id: ""
        }
      })
      const obj = {
        client_id: userData.id,
        service_id: this.state.service_id,
        pet_id: this.state.user_checked_input.id,
        package_id: this.state.selected_package_id,
        extra_addons: this.state.selected_ext_addon,
        booking_date: this.state.date,
        booking_time: this.state.timer,
        latitude: latitude,
        longitude: longitude,
        pet_name: this.state.pet_name,
        package_name: this.state.package_name,
        general_addons: this.state.selected_pack_addons,
      }


      console.log(obj);
      document.getElementById("b-form").style.display = "none";
      document.getElementById("b-pre").style.display = "block";

    }
  }




  closeInfo = () => {
    document.getElementById("b-form").style.display = "block";
    document.getElementById("b-pre").style.display = "none";
  }


  TrainSuccess = () => {
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
        booking_error: "",
      })
      const obj = {
        client_id: userData.id,
        service_id: this.state.service_id,
        pet_id: this.state.user_checked_input.id,
        package_id: this.state.selected_package_id,
        extra_addons: this.state.selected_ext_addon,
        booking_date: this.state.date,
        booking_time: this.state.timer,
        latitude: latitude200,
        longitude: longitude200,
        message: this.state.message,
        city: user_final_city,
      }
      Services.getInstance().trainingBookings(obj).then((result) => {
        console.log(result);
        if (result.status === true) {
          const obj1 = {
            notification: {
              title: "Petsfolio",
              body: "Received A Request From " + userData.name + " For Dog Training",
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
            userAddress = results[1].formatted_address;
            results.forEach(function (result) {
              result.address_components.forEach(function (component) {
                if (component.types.includes('locality')) {
                  user_final_city = component.long_name;
                    //getting Device tokens
                    const obj1 = {
                      serviceid: 3,
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
            serviceid: 3,
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
    return (

      <div>



        <div class="pet-dog-training" id='b-form' style={{ display: "block" }}>
          <div class="pet-dog-train-head">
            <div class="pet-training-head">
              <img src="arrow-right.png" onClick={this.moveToHomePage} />
              <h5>Booking Summary</h5>
            </div>
          </div>
          <section class="pet-train-main">
            {/* <div class="pet-pr-my-pet">
            <h5>My Pet</h5>
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

            <div class="pet-tin-package mr-b"><h5>Select Package</h5></div>

            <div class="pet-trn-puppy mr-b">

              <Slider {...settings} style={{ padding: "0px" }}>
                <div class="pet-tin-package mr-b">
                  <div class="pet-trn-obedience">
                    <div class="pet-trn-popular">
                      <div class="pet-obd-pop-text">
                        <p>Popular</p>
                      </div>
                      <div class="pet-obd-text-circle">
                        {this.state.training_packages && this.state.training_packages.length > 0 ? <h4>{this.state.training_packages[0].name}</h4> : " "}
                      </div>
                      <div class="pet-trn-obd-cloud">
                        <img src="white-cloud.png" />
                      </div>
                    </div>
                    <div class="pet-trn-session-list">
                      <div class="pet-trn-session">
                        <div class="pet-session-circle">
                          {this.state.training_packages && this.state.training_packages.length > 0 ? <h6><strong>{this.state.training_packages[0].price} /-</strong><br />{this.state.training_packages[0].total_sessions + "Sessions"}</h6> : " "}
                        </div>
                      </div>
                      <div class="pet-trn-list-boy-item ">
                        <div class="pet-trn-list-item">
                          <ul>
                            {this.state.obd_gen_addons && this.state.obd_gen_addons.length > 0 ? this.state.obd_gen_addons.map((general_addon, index) => {
                              return (
                                <li><img src="purple-right-tick.png" />{general_addon.name}</li>
                              )
                            }) : ""}
                          </ul>
                        </div>
                        <div class="pet-trn-boy-item">
                          <img src="playdogboy.png" />
                        </div>
                        <div class="pet-tyn-add-extra">
                          <h4>Add Extra</h4>
                          <div class="pet-add-extra-list" >
                            {this.state.obd_ext_addons && this.state.obd_ext_addons.length > 0 ? this.state.obd_ext_addons.map((ext_addon, index) => {
                              return (
                                <div key={index} class="pet-addex-list-item" id={index + "0"} onClick={() => this.ObdTrainAddExtras(ext_addon, this.state.obd_ext_addons, this.state.training_packages[0].id)}>{ext_addon.name}</div>
                              )
                            }) : ""}
                          </div>
                          <div class="pet-trn-select">
                            <button id='slct_active' onClick={() => this.SelectPackage(this.state.training_packages[0].id)}>
                              <span> <img src="tic-min.png" /></span>
                              Select Package
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Puppy Training */}
                <div className='slide-item'>
                  <div class="pet-trn-puppy-list">
                    <div class="pet-trn-puppy-text">
                      <div class="pet-trn-pyt-head">
                        {this.state.training_packages && this.state.training_packages.length > 0 ? <h4>{this.state.training_packages[1].name}</h4> : " "}
                      </div>
                      <div class="pet-trn-pyt-cloud">
                        <img src="white-cloud.png" />
                      </div>
                    </div>
                    <div class="pet-trn-pyp-sin-list">
                      <div class="pet-trn-pnp-session">
                        <div class="pet-pyp-circle">
                          {this.state.training_packages && this.state.training_packages.length > 0 ? <h6><strong>{this.state.training_packages[1].price} /-</strong><br />{this.state.training_packages[1].total_sessions + "Sessions"}</h6> : " "}
                        </div>
                      </div>
                      <div class="pet-pyp-list-item">
                        <ul>
                          {this.state.pup_gen_addons && this.state.pup_gen_addons.length > 0 ? this.state.pup_gen_addons.map((pup_general_addon, index) => {
                            return (
                              <li><img src="green-tick.png" />{pup_general_addon.name}</li>
                            )
                          }) : ""}
                        </ul>
                      </div>
                      <div class="pet-trn-gril-item">
                        <img src="playgrildog.png" />
                      </div>
                      <div class="pet-tyn-pyp-add-extra">
                        <h4>Add Extra</h4>
                        <div class="pet-pyp-add-extra-list">
                          {this.state.pup_ext_addons && this.state.pup_ext_addons.length > 0 ? this.state.pup_ext_addons.map((pup_extra_addon, index) => {
                            return (
                              <div key={index} class="pet-pyp-addex-list-item"
                                id={index + "1"}
                                onClick={() => this.PupTrainAddExtras(pup_extra_addon, this.state.pup_ext_addons, this.state.training_packages[1].id)}>{pup_extra_addon.name}</div>
                            )
                          }) : ""}

                        </div>
                        <div class="pet-pyp-trn-select">
                          <button id='slct_active1' onClick={() => this.SelectPackage(this.state.training_packages[1].id)}><span> <img src="tic-min.png" /></span>Select Package</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* TrainingIntermediate */}
                <div className='slide-item'>
                  <div class="pet-trn-puppy-list">
                    <div class="parent_slide">
                      <div class="traning">
                        {this.state.training_packages && this.state.training_packages.length > 0 ? <h3>{this.state.training_packages[2].name}</h3> : " "}
                      </div>
                    </div>
                    <div class="main-cnt">
                      <div class="clouds">
                        <div class="clouds_img">
                          <img src="white-cloud.png" />
                        </div>
                        <div class="circle">
                          {this.state.training_packages && this.state.training_packages.length > 0 ? <h3><strong>{this.state.training_packages[2].price} /-</strong><br />{this.state.training_packages[2].total_sessions + "Sessions"}</h3> : " "}
                        </div>
                      </div>
                      <div class="traning_skills">
                        <div class="traning_steps1">
                          {this.state.int_gen_addons && this.state.int_gen_addons.length > 0 ? this.state.int_gen_addons.map((int_gen_addon, index) => {
                            return (
                              <div class="traning_steps">
                                <i class="fa fa-solid fa-check"></i><span>{int_gen_addon.name}</span>
                              </div>
                            )

                          }) : ""}
                        </div>
                        <div class="traning-step3">
                          <div class="traning_img">
                            <img src="traning_img.png" />
                          </div>
                        </div>
                      </div>
                      <div class="cloud-2">
                        <img src="cloud-small-2.png" />
                      </div>
                      <div class="add_extra">
                        <h3>Add Extra</h3>
                        <div class="carring_lists">
                          {this.state.int_ext_addons && this.state.int_ext_addons.length > 0 ? this.state.int_ext_addons.map((int_ext_addon, index) => {
                            return (
                              <div key={index} class="list" id={index + "2"} style={{ backgroundColor: "#fff" }} onClick={() => this.IntAddExtras(int_ext_addon, this.state.int_ext_addons, this.state.training_packages[2].id)}>{int_ext_addon.name}</div>
                            )
                          }) : ""}
                        </div>
                      </div>
                    </div>
                    <div class="package_btn">
                      <button id='slct_active2' onClick={() => this.SelectPackage(this.state.training_packages[2].id)}><span> <img src="tic-min.png" /></span>Select Package</button>
                    </div>
                  </div>
                </div>
                {/* TrainingAdvanced */}
                <div className='slide-item'>
                  <div class="traning_body">
                    <div class="traning_slide">
                      <div class="traning_text">
                        {this.state.training_packages && this.state.training_packages.length > 0 ? <h3>{this.state.training_packages[3].name}</h3> : " "}
                      </div>
                    </div>
                    <div class="clouds_places">
                      <div class="clouds_imgs">
                        <img src="white-cloud.png" />
                      </div>
                      <div class="circle_img">
                        {this.state.training_packages && this.state.training_packages.length > 0 ? <h3><strong>{this.state.training_packages[3].price} /-</strong><br />{this.state.training_packages[3].total_sessions + "Sessions"}</h3> : " "}
                      </div>
                    </div>
                    <div class="cloud_img-1">
                      <img src="cloud-small-1.png" />
                    </div>
                    <div class="traning_tips">
                      <div class="traning_tip1">
                        {this.state.adv_gen_addons && this.state.adv_gen_addons.length > 0 ? this.state.adv_gen_addons.map((adv_gen_addon, index) => {
                          return (
                            <div class="traning_list" key={index}>
                              <i class="fa fa-solid fa-check"></i><span>{adv_gen_addon.name}</span>
                            </div>
                          )
                        }) : ""}
                      </div>
                      <div class="traning-tip3">
                        <div class="traning_images">
                          <img src="Vector-img.png" />
                        </div>
                      </div>
                    </div>
                    <div class="cloud-img-2">
                      <img src="cloud-small-2.png" />
                    </div>
                    <div class="extra_add">
                      <h3>Add Extra</h3>
                      <div class="traning_lists">
                        {this.state.adv_ext_addons && this.state.adv_ext_addons.length > 0 ? this.state.adv_ext_addons.map((adv_ext_addon, index) => {
                          return (
                            <div class="list_train" key={index} id={index + "3"} style={{ backgroundColor: "#fff", color: "#000" }} onClick={() => this.AdvAddExtras(adv_ext_addon, this.state.adv_ext_addons, this.state.training_packages[3].id)}>{adv_ext_addon.name}</div>
                          )
                        }) : ""}
                      </div>
                    </div>
                    <div class="select_packages">
                      <button id='slct_active3' onClick={() => this.SelectPackage(this.state.training_packages[3].id)}><span> <img src="tic-min.png" /></span>Select Package</button>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>



            <div class="pet-trn-pyp-service">
              <h5>Select Service From Date</h5>
              <div class="pet-pyp-srv-date">
                <input
                  type="date"
                  name="date"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div style={{ margin: '1px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.input_error.date}</div>


            <section class="perferable_time">
              <h3>Select Perferable Time</h3>
            </section>
            <div style={{ margin: '1px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.input_error.timer}</div>



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

























            <div style={{ margin: '1px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.input_error.preferrable_time}</div>
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
            <div style={{ margin: '1px', color: 'red', fontSize: '14px', bottom: '3px' }}>{this.state.input_error.selected_package_id}</div>


            <div class="pet-train-proceed-btn">
              <div class="pet-pyp-btn mr-b">
                <button onClick={this.MoveToTrainingInfo}>Proceed</button>
              </div>
            </div>
          </section>
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







        <div class="body_section" id='b-pre' style={{ display: "none" }} >
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
              {/* <div class="pets_inform">
              <div class="pet_imgs">
                <img src="dog_img.png" />
                <div class="pet_text">
                  <h4>Your Pet</h4>
                </div>
              </div>
              <div class="zoro_txt">
                <span>{this.state.pet_name}</span>
              </div>    
            </div> */}
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
                  <h5>{this.state.date}</h5>
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
            <div class="parent_basic">
              <div class="info_basic">
                {/* <i class="fa fa-solid fa-check"></i> */}
                <div class="basic_txt">
                  <h4>{this.state.package_name}</h4>
                </div>
              </div>
            </div>


            <div class="two_tickes p-t">
              <div class="tickes">
                {this.state.selected_pack_addons && this.state.selected_pack_addons.length > 0 ? this.state.selected_pack_addons.map((general_addons, index) => {
                  return (
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
            {this.state.selected_ext_addon && this.state.selected_ext_addon.length > 0 ?
              <div>
                <div class="add_on p-t">
                  <h4>Add-Ons</h4>
                </div>
                <div class="two_tickes p-t">
                  <div class="tickes">
                    {this.state.selected_ext_addon && this.state.selected_ext_addon.length > 0 ? this.state.selected_ext_addon.map((extra_addons, index) => {
                      return (
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
              </div>
              : ""}


            <div class="fltr-prv-note">
              <h5>Address
                <span onClick={this.openGoogleLocations} class="lpopup"><img src="edit-icon.png" /></span>
              </h5>
              <div class="note-txt" onClick={this.openGoogleLocations}>
                {userAddress == "" ? <p>Please add service required location</p> : <p>{userAddress}</p>}
              </div>
            </div>


            <div class="additional_txt">
              <div class="notes_txt">
                <h4>Additional Notes</h4>
                <textarea
                  placeholder="Please add your comments here"
                  name='message'
                  onChange={this.handleChange}
                >
                </textarea>
              </div>
            </div>

          </div>

          <p style={{ margin: '10px', color: 'red', textAlign: "center" }}>{this.state.booking_error}</p>
          <div class="button_txt">
            <button onClick={this.TrainSuccess}>Submit</button>
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

export default TrainingBooking