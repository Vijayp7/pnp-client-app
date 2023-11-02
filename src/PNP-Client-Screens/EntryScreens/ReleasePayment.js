import React, { Component } from 'react'
import '../CSS/EntryCSS/ReleasePayment.css'
import ReactStars from "react-rating-stars-component";
import Services from '../Services/Services';
import ReleaseSuccess from './ReleaseSuccess';
import LoadingSymbol from './LoadingSymbol';
import PaymentAlert from './PaymentAlert';



let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));


let rating;
const thirdExample = {
    size: 40,
    count: 5,
    isHalf: false,
    value: 0,
    color: "grey",
    activeColor: "#ee8838",
    comment : "",
    onChange: newValue => {
        rating = newValue;
      console.log(`Example 3: new value is ${newValue}`);
    }
  };
export default class ReleasePayment extends React.PureComponent {
    constructor(props){
        super(props);
    }
    state = {
        comment : "",
        err_message : "",
        open_success : false,
        loading: false,
    }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => console.log(this.state));
      };



    releasePayment = ()=>{
      if(this.props.serviceId == "3"){
        if(rating == null){
          this.setState({
              err_message : "Please select the rating"
          })
        }
        else{
          this.setState({
            loading: true,
          })
          const obj = {
            serviceId : this.props.serviceId,
            bookingId : this.props.bookingId,
            quotId : this.props.quotId,
            spId : this.props.spId,
            clientId : this.props.clientId,
            brackDownId : this.props.selected_breakdownID,
            rating : rating,
            comment : this.state.comment
        }
        console.log(obj);
        Services.getInstance().releasePayment(obj).then((result)=>{
            console.log(result);
            if(result[0]=="Updated"){
              const obj1 = {
                  notification: {
                    title: "Petsfolio",
                    body: userData.name + " has released a payment and it will be credited in your account with in 24 hrs",
                    sound: "default"
                  },
                  to: this.props.token
                }
                Services.getInstance().SendBookingNotificationToSP(obj1).then((result)=>{
                  console.log(result);
                })
              this.setState({
                err_message : "Release request has been sent",
                loading : false,
                open_success : true,
            })
            }

        })
        }
      }
      else{
          if(rating == null){
            this.setState({
                err_message : "Please select the rating"
            })
        }
        else {
          this.setState({
            loading: true,
          })
            const obj = {
                serviceId : this.props.serviceId,
                bookingId : this.props.bookingId,
                quotId : this.props.quotId,
                spId : this.props.spId,
                clientId : this.props.clientId,
                brackDownId : "",
                rating : rating,
                comment : this.state.comment
            }
            console.log(obj);
            Services.getInstance().releasePayment(obj).then((result)=>{
                console.log(result);
                if(result[0]=="Updated"){
                  const obj1 = {
                    notification: {
                      title: "Petsfolio",
                      body: userData.name + " has released a payment and it will be credited in your account with in 24 hrs",
                      sound: "default"
                    },
                    to: this.props.token
                  }
                  Services.getInstance().SendBookingNotificationToSP(obj1).then((result)=>{
                    console.log(result);
                  })
                  this.setState({
                    err_message : "Release request has been sent",
                    loading : false,
                    open_success : true,
                })
                }
            })
          }
      }


    }



    openpay = () =>{
      document.getElementById("pop1").style.display = "block";

      document.getElementById("pop").style.display = "none";
    }


    componentDidMount = () =>{
      if(navigator.onLine){
        //
      }
      else{
        this.props.history.push({
          pathname : "/internet"
        })
      }
    }








  render() {
    console.log(this.props.selected_breakdownID)
    return (

      <div>

        <div class="p-cnt-p" id = "pop" style={{display : "block"}}>
            <img src="question-mark.png" />
            <h6>Are you sure!</h6>
            <p>you want to release payment?</p>
            <div class="rlse-s-btns">
            <button class="okay-btn y" onClick={this.openpay}>Yes</button>
            <button class="cncl-btn n" onClick={this.props.closePopUp}>No</button>
            </div>
        </div>

          <div class="p-cnt-p" id = "pop1" style={{display : "none"}}> 
            <img src="rating-s.png" /> 
            <h6>Are you sure!</h6>
            <p>you want to release payment?</p>
            <div id="rating">
              <div>
              <ReactStars {...thirdExample} />
              </div>
              <div class="rvw-txt">
              <textarea style={{position : "relative", zIndex : "9"}}
                  type="text" 
                  placeholder="Enter Comment"
                  name="comment"
                  noValidate
                  onChange={this.handleChange}
                />
              </div>
            </div>
          { this.state.loading === true ? <LoadingSymbol /> : "" } 
          <p style={{margin:"0 auto", textAlign:"center", color :"#ee8838"}}>{this.state.err_message}</p>  
            <button class="okay-btn" onClick={this.releasePayment}>Release</button>
            <button class="cncl-btn" onClick={this.props.closePopUp}>Cancel</button> 
          </div>



        {this.state.open_success ? <ReleaseSuccess /> : ""}
  
      </div>
    )
  }
}
