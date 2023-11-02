import React, { Component } from 'react'
import '../CSS/EntryCSS/MyProfile.css'
import HandlingImage from './HandlingImage';
import Location from './Location';
import PlacesAutocomplete, {geocodeByAddress,getLatLng} from 'react-places-autocomplete';
import Services from '../Services/Services';
import PullToRefresh from 'react-simple-pull-to-refresh';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from './DarkBackground';

let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));
let longitude = ""
let latitude = ""
let user_final_city = "";
let user_address = "";
let loading = false;

export class MyProfile extends React.PureComponent {

  constructor(props){
    super(props);
  }

  state={
    location_popup : false,
    latLng : "",
    name : userData.name,
    email : userData.email,
    phone : userData.phone,
    gender : userData.gender,
    address : userData.address,
    id_proof : userData.profile_pic,
    id_preview : userData.profile_pic,
    success_message : "",
    id_proof_return:"",
    locality : [],
    loading : loading,
  }

  componentDidMount = () =>{

    if(navigator.onLine){
      if(userData.gender == "male"){
        document.getElementById("male").classList.add("active")
      }
      else if(userData.gender == "female"){
        document.getElementById("female").classList.add("active")
      }
    }
    else{
      this.props.history.push({
        pathname : "/internet"
      })
    }

  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  };

  gender=(id)=>{
    console.log(id);
    this.setState({
      gender : id
    })
   if(id=="male"){
    document.getElementById(id).classList.add("active");
    document.getElementById("female").classList.remove("active")
   }else if(id=="female"){
    document.getElementById(id).classList.add("active");
    document.getElementById("male").classList.remove("active");
   }
  }

  handleRefresh=()=>{
    window.location.reload();
}


  openLocation = () =>{
    this.setState({
      // user_location : provider_location,
      location_popup: true,
    })
  }

  useCurrentLocation = () =>{
    navigator.geolocation.getCurrentPosition(function (position) {
      const obj = {
        lon: position.coords.longitude,
        lat: position.coords.latitude,
      };
      console.log(obj);
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      localStorage.setItem("serivce_provider_lat", position.coords.latitude);
      localStorage.setItem("serivce_provider_long", position.coords.longitude);
  
      //For Full Address
      const google = window.google;
      var latlng = new google.maps.LatLng(obj.lat, obj.lon); 
      var geocoder = geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'latLng': latlng }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              results.forEach(function(result) {
                result.address_components.forEach(function(component) {
                  if (component.types.includes('locality')) {
                    user_final_city = component.long_name;
                  }
                });
              });
          }
          else {
            //
          }            
      });
    });
    const provider_location1 = localStorage.getItem("serivce_provider_location");
    this.setState({
      address : provider_location1,
      location_popup: false,
    })
  }
  
  handleSelectLocations = address => {
    geocodeByAddress(address)
    .then(results =>  getLatLng(results[0]) )
    .then(latLng =>  {this.setState({ latLng: latLng }, ()=>{
      latitude = latLng.lat;
      longitude = latLng.lng;
      localStorage.setItem("serivce_provider_lat", latLng.lat);
      localStorage.setItem("serivce_provider_long", latLng.lng);
      console.log("hshs")
    })})
    .catch(error => console.error('Error', error));
    console.log(address)
    geocodeByAddress(address).then(results=>this.setState({locality : results},()=>{console.log(results)}))
    this.setState({ address });
  };

  getLocality = ()=>{
    // console.log(results[0].address_components);
    this.state.locality.forEach(function(result) {
      result.address_components.forEach(function(component) {
        if (component.types.includes('locality')) {
          user_final_city = component.long_name;
        }
      });
    });

  }
  
  handleChangeLocations = address => {
      this.setState({ address });
  };
  
  useLocation = (address) =>{
    this.getLocality();
    this.setState({
      address: address,
      location_popup: false,
    })
  }

  Location=()=>{
    this.setState({
      location_popup : true
    })
  }

  closePopUp = () =>{
    this.setState({
      location_popup: false,
    })
  }
  home=()=>{
    this.props.history.push({
      pathname : "/homepage"
  })
  }


  handle_Id_Proof = (event) =>{
    HandlingImage.getInstance().handleImagesMethod(event).then((result)=>{
      if(event.target.files[0].type == 'image/png'){
        let base64ImageURL = result.replace('data:image/png;base64,','');
        // console.log(base64ImageURL);
        this.setState({
          id_proof_return: base64ImageURL,
          id_preview : result,
          id_proof_name : event.target.files[0].name
        })
      }
      else if(event.target.files[0].type == 'image/jpeg'){
        let base64ImageURL = result.replace('data:image/jpeg;base64,','');
        // console.log(base64ImageURL);
        this.setState({
          id_proof_return: base64ImageURL,
          id_preview : result,
          id_proof_name : event.target.files[0].name
        })
  
      }
      else{
        // toast.error("Please upload PNG or JPEG files..");
      }
    })
  }


  Update = () =>{
    this.setState({
      loading : true
    })
    const obj = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      gender: this.state.gender,
      photo: this.state.id_proof_return,
      id: userData.id,
      location : this.state.address,
      longitude : longitude,
      latitude : latitude,
      city : user_final_city,
    }
    console.log(obj);
    Services.getInstance().EditProfile(obj).then((result)=>{
      if(result.status == true){
        localStorage.setItem(`PNP-Client-userData`, JSON.stringify(result.data));
        this.setState({
          success_message : "Profile has been updated",
          loading : false
        },()=>{
          const timeout = setTimeout(() => {
                this.props.history.push({
                    pathname : "/homepage"
                })
            
        }, 2000);
        })
      }
      else{
        this.setState({
          success_message : "Please try again later",
          loading : false
        })
      }
    })
  }
  
  render() {
    return (
        <div id="wrapper">
        <div class="srvc-dtls">
          <div class="srvc-dtls-hd">
            <h4>My Profile</h4>
            <div class="srvc-dtls-bck">
              <img src="q-arrow.png" onClick={this.home}/>
            </div>
          </div>
          <PullToRefresh onRefresh={this.handleRefresh}>
          <DarkBackground disappear={this.state.loading}>
            <LoadingOverlay
              active={true}
              spinner={true}
              text="Please Wait..."
            >
            </LoadingOverlay>
          </DarkBackground>
          <div class="sp-prfl-main">
            <div class="prfl-pic">
              <div class="prfl-pic-chng">
                <img src={this.state.id_preview || "profile_img.png"} />
                <div class="cam-div">
                    <img src="cam-icon-g.png" alt="image"/>
                    <input 
                    type="file" 
                    name="photo"
                    onChange={this.handle_Id_Proof} 
                    placeholder="Upload A image"/>
                </div>
              </div>
            </div>
            <div class="prfl-dtls">
              <h6>Full Name</h6>
              <input 
              type="text" 
              name="name"
              placeholder="Name" 
              onChange={this.handleChange}
              value={userData.name}
              />
              <h6>Gender</h6>
              <div class="sp-gndr">
                <div class="sp-gndr-item" id='male' onClick={()=>this.gender("male")}>
                  <div class="sp-gndr-item-img">
                    <img src="male-icon.png" />
                  </div>
                  <p>Male</p>
                </div>
                <div class="sp-gndr-item" id='female' onClick={()=>this.gender("female")}>
                  <div class="sp-gndr-item-img">
                    <img src="female-icon.png" />
                  </div>
                  <p>Female</p>
                </div>
              </div>
              <div class="prsnl-data">
                <h6>Phone</h6>
                <input 
                  type="number" 
                  class="phone" 
                  name="phone"
                  value={userData.phone}
                  onChange={this.handleChange} 
                  placeholder="Phone Number" />
                <h6>Email</h6>
                <input 
                  type="email" 
                  name="email" 
                  class="mail"
                  value={userData.email}
                  onChange={this.handleChange} 
                  placeholder="Email" 
                  />
                <h6 class="ad-edt">Address
                  <span><img src="edit-icon.png" /></span>
                </h6>
                <textarea placeholder="Basherbagh, Hyderabad"
                  name='address'
                  value={this.state.address}
                  onChange={this.handleChange}
                  onClick={this.openLocation}>
                </textarea>
              </div>
              <p style={{margin:"0 auto", textAlign : "center", color : "green"}}>{this.state.success_message}</p>
              <div class="my-prfl-btn" onClick={this.Update}>
                <button>Save Changes</button>
              </div>
            </div>
          </div>
          </PullToRefresh>
        </div>
        {
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
          }
      </div>
    )
  }
}

export default MyProfile