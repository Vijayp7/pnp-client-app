import React, { Component } from 'react'
import '../CSS/SittingCSS/SittingBooking.css'
import '../CSS/EntryCSS/DogsList.css'
import DogsList from '../EntryScreens/DogsList'
import Services from '../Services/Services'
import Location from '../EntryScreens/Location';
import PlacesAutocomplete, {geocodeByAddress,getLatLng} from 'react-places-autocomplete';

let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));
const longitude = localStorage.getItem(`serivce_provider_long`);
const latitude = localStorage.getItem(`serivce_provider_lat`);
let location = localStorage.getItem(`client-location`);

export class SitBooking extends Component {
	constructor (props){
		super(props)
	}
	state={
		date_from:"",
		date_to:"",
		time_day:"",
		time_night:"",
		Service_time:"",
		checkbox1 : false,
        user_checked_input : "",
		selected_package_id : "",
		service_id:"6",
		to_time:"",
		location_popup : false,
		latLng : "",
		address : location,
		input_error : {
			input_error_user_checked_input : "",
			input_error_selected_package_id : "",
		  }

		
	}

	componentDidMount=()=>{
		let today = new Date().toISOString().split('T')[0];
      document.getElementsByName("date_from")[0].setAttribute('min', today);
      console.log(today);
		if(!userData){
			window.location.reload(true);
		  }
	}



	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value }, () => {
			document.getElementsByName("date_to")[0].setAttribute('min', this.state.date_from);
		  if(this.state.Service_time=="Day"){
					document.getElementById("timer1").style.display="block";
					document.getElementById("timer2").style.display="none";
					document.getElementById("timer3").style.display="none";
					document.getElementById("timer4").style.display="none";
		  }else if(this.state.Service_time=="Night"){
					document.getElementById("timer2").style.display="block";
					document.getElementById("timer1").style.display="none";
					document.getElementById("timer3").style.display="none";
					document.getElementById("timer4").style.display="none";			        
		  }else if(this.state.Service_time=="DayNight"){
					document.getElementById("timer3").style.display="block";
					document.getElementById("timer4").style.display="block";
					document.getElementById("timer1").style.display="none";
					document.getElementById("timer2").style.display="none";
		  }else{
					document.getElementById("timer1").style.display="none";
					document.getElementById("timer2").style.display="none";
					document.getElementById("timer3").style.display="none";
					document.getElementById("timer4").style.display="none";
		  }		  
		});
	};
	
	moveToHomePage = () =>{
		this.props.history.push({
			pathname : "/homepage"
		})
	}

	validateForm=()=>{
		if(this.state.user_checked_input == "" ){
			this.setState({
			  input_error : {
				user_checked_input : "Please Select Pet"
			  }
			})
		  }else if(this.state.date_from == ""){
			this.setState({
			  input_error : {
				date_from: "Please Select From Date"
			  }
			})
		  }else if(this.state.date_to == ""){
			this.setState({
			  input_error : {
				date_to: "Please Select To Date"
			  }
			})
		  }else if(this.state.Service_time == ""){
			this.setState({
			  input_error : {
				Service_time: "Please Select Service Time"
			  }
			})
		  }else{
			this.setState({
				error_name : "",
			})
			const obj={
				client_id : userData.id,
				service_id : this.state.service_id,
				pet_id : this.state.user_checked_input.id,
				from_date : this.state.date_from,
				to_date : this.state.date_to,
				day_type : this.state.Service_time,
				from_time : this.state.time_day,
				to_time : this.state.time_night,
				//in to_time pass night time
				latitude : latitude,
				longitude : longitude,
			}
			console.log(obj);

		Services.getInstance().sittingBookings(obj).then((result)=>{
			console.log(result.data);
			if(result.status === true) {
				this.props.history.push({
					pathname : "/sit-info",
					previewData: result.data,
				})
			        
			}
			else if(result.status === false){
			  this.setState({
				error_messgae: result.msg,
			  })
			}
		  })
		}
	}

	MoveToSitInfo = () =>{

		this.validateForm();

	}

	handleDogChange=(e)=>{
		this.setState({
			checkbox1 : e.target.checked
		  })
	}

	DogInfo=(dogdata,dog_input)=>{
		if(document.getElementById(dog_input).checked==true){
			this.setState({
				user_checked_input : dogdata
			})
		}else if(document.getElementById(dog_input).checked==false){
			this.setState({
				user_checked_input : dogdata,
			})
		}
	}

	openLocation = () =>{
		this.setState({
		  // user_location : provider_location,
		  location_popup: true,
		})
	  }
	  
	  useCurrentLocation = () =>{
		console.log("hello")
		navigator.geolocation.getCurrentPosition(function (position) {
		  console.log("Latitude is :", position.coords.latitude);
		  console.log("Longitude is :", position.coords.longitude);
	  
		  const obj = {
			lon: position.coords.longitude,
			lat: position.coords.latitude,
		  };
		  console.log(obj);
		  localStorage.setItem("pnp_client_lat", position.coords.latitude);
		  localStorage.setItem("pnp_client_long", position.coords.longitude);
	  
		  //For Full Address
		  const google = window.google;
		  var latlng = new google.maps.LatLng(obj.lat, obj.lon); 
		  var geocoder = geocoder = new google.maps.Geocoder();
		  geocoder.geocode({ 'latLng': latlng }, function (results, status) {
			  if (status == google.maps.GeocoderStatus.OK) {
				  if (results[1]) {
					console.log(results[1].formatted_address);
					localStorage.setItem("client_location", results[1].formatted_address);
				  }
			  }
			  else {
				//
			  }
			  
		  });
		});
		const provider_location1 = localStorage.getItem("client_location");
		this.setState({
		  user_location: provider_location1,
		  location_popup: false,
		})
	  }
	  
	  handleSelectLocations = address => {
		geocodeByAddress(address)
		  .then(results =>  getLatLng(results[0]) )
		  .then(latLng =>  {this.setState({ latLng: latLng }, ()=>{
			localStorage.setItem("serivce_provider_lat", latLng.lat);
			localStorage.setItem("serivce_provider_long", latLng.lng);
		  })})
		  .catch(error => console.error('Error', error));
		  console.log(address)
		  this.setState({ address });
	  };
	  
	  handleChangeLocations = address => {
		  this.setState({ address });
	  };
	  
	  useLocation = (address) =>{
		localStorage.setItem("client_location", address);
		this.setState({
		  user_location: address,
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


  render() {
    return (
        <div>
		<div class="dmn-sithead">
          <div class="dmn-head-icon">
             <img src="arrow-right.png" onClick={this.moveToHomePage}/>
             <h5>Sit Service Booking</h5>
           </div>
      </div>     
		<div class="main-sec">

			<div class="my-pet-sec m-b vet-booking-page">
				<h6>My Pet</h6>
			</div>
			<DogsList
			 handleDogChange = {this.handleDogChange}
			 DogInfo = {this.DogInfo}
			/>

			<div class="vb-appointment1 m-b">
				<div className='v-calender'>
					<h6>Select Date</h6>
                    <span> From : </span>
					<label className='v-date'>
                        {/* <img src="ins-calender.png" alt="img" />/ */}
						<input type="date" 
						 name='date_from'
						 onChange={this.handleChange}
						 />
					</label>
				</div>
			</div>
			<div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.date_from}</div>

            <div class="vb-appointment1 m-b">
                <div className='v-calender'>
                    <span> To : </span>
					<label className='v-date'>
                        {/* <img src="ins-calender.png" alt="img" /> */}
						<input type="date" 
						 name='date_to'
						 onChange={this.handleChange}
						/>
					</label>
				</div>
			</div>
			<div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.date_to}</div>
			  	
            <div className='chk-k'>
            	<h6>Required Service Time</h6>
            	<div class="rst-sec" >

					<div class="chk-item">
                 <input type="radio" 
				 id="Day1"
				  name="Service_time" 
				  value="Day" 
				  onChange={this.handleChange}/>
                 <label for="Day1"></label>
                 <p>Day</p>
                </div>	            	
						{/* <input type="radio"
						  name='Service_time' 
						  id="Day1"
						  value = "Day"
						  onChange={this.handleChange}
						/>
						<span class="checkmark"></span>
						<p>Day</p>
						<label for="Day1" class="plan v-time" ></label> */}
		    	</div>
				
            </div> 

            <div class="vb-appointment1 m-b" style={{display:"none"}} id="timer1">
                <div>
					{/* <h6>Select a Time</h6> */}
					<label className='v-time'>
						{/* <img src="ins-clock.png" alt="img" /> */}
						<input type="time" 
						 name='time_day'
						 onChange={this.handleChange}
						 />
					</label>
				</div>
			</div>
            
            <div className='chk-k'>
            	<div class="rst-sec" >

				<div class="chk-item">
                 <input type="radio" 
				 id="Night2" 
				 name="Service_time" 
				 value="Night" 
				 onChange={this.handleChange}/>
                 <label for="Night2"></label>
                 <p>Night</p>
						{/* <input type="radio"
						 name='Service_time' 
						 id="Night2"
						 value = "Night"
						 onChange={this.handleChange}
						/>
						<span class="checkmark"></span>
						<p>Night</p>
						<label for="Night2" class="plan"></label> */}
		    	</div>
            </div>
			</div>

			<div class="vb-appointment1 m-b" style={{display:"none"}}  id="timer2" >
                <div>
					{/* <h6>Select a Time</h6> */}
					<label className='v-time'>
						{/* <img src="ins-clock.png" alt="img" /> */}
						<input type="time" 
						 name='time_night'
						 onChange={this.handleChange}
						/>
					</label>
				</div>
			</div>

            <div className='chk-k'>
            	<div class="rst-sec">

				<div class="chk-item">
                 <input type="radio" id="DayNight3" name="Service_time" value="DayNight" onChange={this.handleChange}/>
                 <label for="DayNight3"></label>
                 <p>Day & Night</p>
	            	
						{/* <input type="radio" 
						  name='Service_time'
						  id="DayNight3"
						  value = "DayNight"
						  onChange={this.handleChange}
						/>
						<span class="checkmark"></span>
						<p>Day & Night</p>
						<label for="DayNight3" class="plan v-time"></label> */}
		    	</div>
            </div>
			</div>
			<div class="vb-appointment1 m-b" style={{display:"none"}}  id="timer3" >
                <div>
					{/* <h6>Select a Time</h6> */}
					<label className='v-time'>
						{/* <img src="ins-clock.png" alt="img" /> */}
						<input type="time" 
						 name='time_day'
						 onChange={this.handleChange}
						/>
					</label>
				</div>
			</div>
			<div class="vb-appointment1 m-b" style={{display:"none"}}  id="timer4" >
                <div >
					{/* <h6>Select a Time</h6> */}
					<label className='v-time'>
						{/* <img src="ins-clock.png" alt="img" /> */}
						<input type="time" 
						 name='time_night'
						 onChange={this.handleChange}
						/>
					</label>
				</div>
			</div>
			<div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.Service_time}</div>
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
			<div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.user_checked_input}</div>
            <div class="Sitting-booking-btn">
            	<button onClick={this.MoveToSitInfo}>Proceed</button>
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
    )
  }
}

export default SitBooking