import React, { Component } from 'react'
import '../CSS/Vet@HomeCSS/VetBooking.css'
import DogsList from '../EntryScreens/DogsList'
import Services from '../Services/Services'
import Location from '../EntryScreens/Location';
import PlacesAutocomplete, {geocodeByAddress,getLatLng} from 'react-places-autocomplete';

let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));
const longitude = localStorage.getItem(`serivce_provider_long`);
const latitude = localStorage.getItem(`serivce_provider_lat`);
let location = localStorage.getItem(`client-location`);

export class VetBooking extends Component {
	constructor (props){
		super(props)
	}


	state={
		date:"",
		time:"",
		issue_description:"",
		checkbox : false,
        user_checked_input_vet : "",
		checkbox : false,
		check_box_click : "",
		checkbox1 : false,
        user_checked_input : "",
		vet_issues : [],
		selected_vet_issues:[],
		service_id : "5",
		service_type :" ",
		location_popup : false,
		latLng : "",
		address : location,
		input_error : {
			input_error_user_checked_input : "",
			input_error_selected_vet_issues : "",
		  }
	}

	componentDidMount=()=>{
		let today = new Date().toISOString().split('T')[0];
      document.getElementsByName("date")[0].setAttribute('min', today);
      console.log(today);
		if(!userData){
			window.location.reload(true);
		  }
		Services.getInstance().vet_issues().then((result)=>{
			console.log(result);
			if(result.status === true) {
				this.setState({
					vet_issues : result.data
				})
					   
			}
			else if(result.status === false){
			  this.setState({
				error_messgae: result.msg,
			  })
			 
			}
	 })
	}


	handleChange = e=>{
		const {name,value}= e.target;
		this.setState({
			[name]:value
		}
		 ,()=>{
			if(this.state.service_type=="online"){
				document.getElementById(this.state.service_type).classList.add("active");
				document.getElementById("offline").classList.remove("active");
			}else if(this.state.service_type=="offline"){
				document.getElementById(this.state.service_type).classList.add("active");
				document.getElementById("online").classList.remove("active");
			}else{
				document.getElementById("online").classList.remove("active");
				document.getElementById("offline").classList.remove("active");
			}
		 }
		);
	}


	handleChange1 = (e) =>{
		
		this.setState({ 
		   checkbox : e.target.checked 
		});
	  }




  QuestionInfo=(vet_iss)=>{

	if(document.getElementById(vet_iss.name).checked === true){
		const obj={
			name : vet_iss.name
		}
		this.state.selected_vet_issues.push(obj)
		console.log(this.state.selected_vet_issues);
	  }
	  else if(document.getElementById(vet_iss.name).checked === false){
		for(let i=0 ; i < this.state.selected_vet_issues.length>0 ;i++){
			if(vet_iss.name==this.state.selected_vet_issues[i].name){
				this.state.selected_vet_issues.splice(i,1);
			}
			console.log(this.state.selected_vet_issues);
		}
	  }
  }
 

handleDogChange=(e)=>{
	this.setState({
	  checkbox1 : e.target.checked
	})
  }

  DogInfo=(dogdata,dog_input)=>{

	if(document.getElementById(dog_input).checked === true){
	  this.setState({
		user_checked_input : dogdata,
	  })
	}
	else if(document.getElementById(dog_input).checked === false){
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
	  localStorage.setItem("serivce_provider_lat", position.coords.latitude);
	  localStorage.setItem("serivce_provider_long", position.coords.longitude);
  
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
		  }else if(this.state.selected_vet_issues.length<=0){
			this.setState({
				input_error : {
				  selected_vet_issues : "Please Select Vet Issues"
				}
			  })
		  }else if(this.state.date == "" ){
			this.setState({
				input_error : {
				  date : "Please Select Date"
				}
			  })
		  }else if(this.state.time == "" ){
			this.setState({
				input_error : {
				  time : "Please Select Time"
				}
			  })
		  }else if(this.state.issue_description == "" ){
			this.setState({
				input_error : {
				  issue_description : "Please Enter Issue Description"
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
				issues : this.state.selected_vet_issues,
				booking_date : this.state.date,
				booking_time : this.state.time,
				about_issue : this.state.issue_description,
				latitude : latitude,
				longitude : longitude,
				service_type : this.state.service_type,

			}
			console.log(obj);
			Services.getInstance().vetBookings(obj).then((result)=>{
				console.log(result.data);
				if(result.status === true) {
				  this.props.history.push({
					pathname : "/vet-info",
					previewData : result.data,
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

	MoveToVetInfo = () =>{

		this.validateForm();

		
	}
  render() {
    return (
        <div class="vet-booking-page">
			<div class="dmn-headtag">
          <div class="dmn-head-icon">
             <img src="arrow-right.png" onClick={this.moveToHomePage}/>
             <h5>Book a Vet @ Home</h5>
           </div>
      </div>
		
		<div class="main-sec">

			<div class="my-pet-sec m-b">
				<h6>My Pet</h6>
				<DogsList
				handleDogChange = {this.handleDogChange}
				DogInfo = {this.DogInfo}
				/>
			</div>

			<div class="vb-wst-issue m-b">
				<h6>What Seems to be the Issue?</h6>
				<div class="vb-wst-checks">

				{this.state.vet_issues && this.state.vet_issues.length > 0 ? this.state.vet_issues.map((vet_iss,index)=>{
					return(
						<div key={index}>
					<label class="plan">
				      <input 
					   type="checkbox"
					   id={vet_iss.name}
					   value="General Medical Question"
					   onChange={this.handleChange1}
					   onClick={ ()=>this.QuestionInfo(vet_iss)}
						/>
						<label for = {vet_iss.name}></label>
		              <span class="checkmark"></span>
				      <div class="plan-content">
				       	<img src={vet_iss.icon} alt="img" />
				        <div class="plan-details">
				          <p>{vet_iss.name}</p>
				        </div>
				      </div>
				    </label>
					</div>
				 
				
					)
				}) : " "
				}
				</div>

				
			</div>
			<h5>Service Type</h5>
			<div class="srvc-on-off">
              <div class="srvc-on" id='online'>
                <div class="srvc-on-img">
                  <img src="online-icon.png" />
                </div>
                <p>Online</p>
                <div class="chk-item">
                  <input 
				  type="radio" 
				  id="chk1" 
				  name="service_type"
				  value="online" 
				  onChange={this.handleChange}
				  />
                  <label for="chk1"></label>
                </div>
              </div>
              <div class="srvc-on" id='offline'>
                <div class="srvc-on-img">
                  <img src="offline-icon.png" />
                </div>
                <p>Offline</p>
                <div class="chk-item" >
                  <input 
				  type="radio" 
				  id="chk2" 
				  name="service_type" 
				  value="offline"
				  onChange={this.handleChange}
				  />
                  <label for="chk2"></label>
                </div>
              </div>
            </div>

			

			<div class="vb-appointment m-b">
				<div>
					<h6>Select a Date</h6>
					<label className='v-date'>
						{/* <img src="ins-calender.png" alt="img" /> */}
						<input type="date" 
						 name='date'
						 onChange={this.handleChange}
						/>
					</label>
				</div>
				<div>
					<h6>Select a Time</h6>
					<label className='v-time'>
						{/* <img src="ins-clock.png" alt="img" /> */}
						<input type="time" 
						 name='time'
						 onChange={this.handleChange}
						/>
					</label>
				</div>
			</div>
			<div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.date}</div>
			<div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.time}</div>

			<div class="vb-disc-sec">
				<h6>Please Describe the Issue</h6>
				<textarea rows="8"
				 name='issue_description' 
				 placeholder='Example:'
				 onChange={this.handleChange}
				></textarea>
				<div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.issue_description}</div>
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
				<div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.selected_vet_issues}</div>
				<div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.user_checked_input}</div>
				<button onClick={this.MoveToVetInfo}>Proceed</button>
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

export default VetBooking