import React, { Component } from 'react'
import Services from '../Services/Services';
import PetInteraction from '../EntryScreens/PetInteraction';

export class SittingInfo extends Component {
	constructor(props){
		super(props);
	}

	state = {
		preview_data : this.props.location.previewData,
		message : "",
		pet_Interaction_popup : false,
	}

	closedogPopUp = () =>{
		this.setState({
		  pet_Interaction_popup : false,
		})
	  }

	handleChange = e=>{
		const {name,value}= e.target;
		this.setState({
		  [name]:value
		}
		 ,()=>{console.log(this.state)}
		);
	  }

	closeInfo = () =>{
		this.props.history.push({
		  pathname : "/sit-booking"
		})
	  }

	  SittingSuccess=()=>{
		const obj={
			booking_id : this.state.preview_data.booking_id,
			message : this.state.message,
		  }

		  Services.getInstance().SittingPreview(obj).then((result)=>{
			console.log(result);
			if(result.status === true) {
			  this.props.history.push({
				pathname : "/quotation"
			  })
			
			}
			else if(result.status === false){
			  this.setState({
				error_messgae: result.msg,
			  })
			 
			}
		  })
	  }


  render() {
    return (
        <div class="sbi-page">
		<header class="vbi-head">
			<div class="back-btn">
				<a onClick={this.closeInfo}><img src='close.png' /></a>
			</div>
		</header>
		<div class="main-sec">
 			<div class="bk-dtl m-b">
 				<h6>Booking Summary</h6>
 			</div>
 			<div class="vbi-inf">
 				<div class="workshop-sec">
 					{/* <button>Change</button> */}
				</div>
				<div class="vbi-pet-info m-b">
					<div class="vbi-pet-name">
						<div>
							<img src="my-pet.png" alt="img" />
						</div>
						<span>Your Pet</span>
					</div>
					<strong>{this.state.preview_data.pet_name}</strong>
				</div>
				<div class="vbi-pet-info m-b">
					<div class="vbi-pet-name">
						<div>
							<img src="ins-calender.png" alt="img" />
						</div>
						<span>Date</span>
					</div>
					<div class="sbi-book-inf">
						<p>{this.state.preview_data.from_date}</p>
						<p>{this.state.preview_data.to_date}</p>
					</div>
				</div>
				<div class="vbi-pet-info m-b">
					<div class="vbi-pet-name">
						<div>
							<img src="ins-clock.png" alt="img" />
						</div>
						<span>Time</span>
					</div>
					<div class="sbi-book-inf">
						<p>{this.state.preview_data.from_time}</p>
						{/* <p>10:30 pm</p> */}
					</div>
				</div>
				<div class="vbi-cmnt-sec">
					<h6>Additional Note*</h6>
					<textarea rows="8"
					 placeholder="e.g.."
					 name='message'  
					 onChange={this.handleChange}
					
					></textarea>
				</div>
 			</div>
 			<div class="vbi-quote-btn">
	 			<button onClick={this.SittingSuccess}>Get a Quote</button>
 			</div>
  		</div>
		  
  	</div>
    )
  }
}

export default SittingInfo