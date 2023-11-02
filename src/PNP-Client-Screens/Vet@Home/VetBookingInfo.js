import React, { Component } from 'react'
import '../CSS/Vet@HomeCSS/VetBookingInfo.css'
import Services from '../Services/Services';
import PetInteraction from '../EntryScreens/PetInteraction';

export class VetBookingInfo extends Component {

	constructor(props){
		super(props);
	}
	state ={
		preview_data : this.props.location.previewData,
		message : "",
		pet_Interaction_popup : false,
	}

	closedogPopUp = () =>{
		this.setState({
		  pet_Interaction_popup : false,
		})
	  }



	vetSuccess=()=>{
		const obj={
			booking_id : this.state.preview_data.booking_id,
			message : this.state.preview_data.about_issue,
		  }

		  console.log(obj);

		  Services.getInstance().vetPreview(obj).then((result)=>{
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



	closeInfo = () =>{
		this.props.history.push({
			pathname : "/vet-booking",
			
		})
	}



  render() {
    return (
		<div class="body_section">
			<div class="vet-booking-info-page">
			<div class="header_section2">
			<div class="logo_symbol" onClick={this.closeInfo}>
				<img src="q-arrow.png" />
			</div>
			<div class="symbol_text">
				<h4>Booking Summary</h4>
			</div>
			</div>
			<div class="main-sec">
				{/* <div class="bk-dtl m-b">
					<h6>Booking Details</h6>
				</div> */}
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
					<div class="vbi-pet-info vbi-pet-info-1 m-b">
						<div class="vbi-pet-name">
							<div>
								<img src="vbi-home.png" alt="img" />
							</div>
							<span>Home Visit</span>
						</div>

						{this.state.preview_data.pet_issues && this.state.preview_data.pet_issues.length > 0 ? this.state.preview_data.pet_issues.map((issue,index)=>{
							return(
							<div className='issues' key={index}>
								<p><i class="fa fa-solid fa-check"></i> {issue.name}</p>
								
						</div>
							)
						}):""
						}
						
					</div>
					<div class="vbi-cmnt-sec">
						<h6>Comment</h6>
						<p>{this.state.preview_data.about_issue}</p>
						
					</div>
				</div>
				<div class="vbi-quote-btn">
					<button onClick={this.vetSuccess}>Get a Quote</button>
				</div>
			</div>
			</div>

		
		</div>
    )
  }
}

export default VetBookingInfo