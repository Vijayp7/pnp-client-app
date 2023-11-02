import React, { Component } from 'react'
import Services from '../Services/Services';
import LoadingSymbol from './LoadingSymbol';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 



var validRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export class SignUp extends React.PureComponent {

  constructor(props) {
    super(props);

this.state = {
  name: "",
  email: "",
  phone: "",
  password: "",
  loading: false,
  errorMessage: "",
  input_error : {
    input_error_name : "",
    input_error_email : "",
    input_error_phone : "",
    input_error_password : ""
  }
  };
}

componentDidMount=()=>{
  if(navigator.onLine){
    document.querySelectorAll('input[type="number"]').forEach(input =>{
      input.oninput=()=>{
        if(input.value.length > input.maxLength) input.value=input.value.slice(0,input.maxLength)
      };
    });
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

newRegistration = () =>{
  // this.setState({
    // loading: true,
  // })
  this.validateForm();
}

validateForm=()=>{
  if(this.state.name == "" ){
    this.setState({
      input_error : {
        name : "Please Enter Name"
      }
    })
  }
  // else if(this.state.email == "" ){
  //   this.setState({
  //     input_error : {
  //       email : "Please Enter Email"
  //     }
  //   })
  // }

  // else if(!this.state.email.match(validRegex)){
  //   this.setState({
  //     input_error : {
  //       email : "Please Check Your Email"
  //     }
  //   })
  // }
  
  else if(this.state.phone == "" ){
    this.setState({
      input_error : {
        phone : "Please Enter PhoneNumber"
      }
    })
  }

  else if(this.state.phone.length < 10 ){
    this.setState({
      input_error : {
        phone : "Please Check Your Phone Number"
      }
    })
  }
  else if(this.state.phone.length > 10 ){
    this.setState({
      input_error : {
        phone : "Please Check Your Phone Number"
      }
    })
  }else if(this.state.password == "" ){
    this.setState({
      input_error : {
        password : "Please Enter Password"
      }
    })
  }
  
  else {
    this.setState({
      error_name : "",
      loading : true,
    })
      const obj = {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
      }
      Services.getInstance().newRegistration(obj).then((result)=>{
        console.log(result);
        if(result.status === true) {
          this.setState({
            loading: false,
          })
          this.props.history.push({
            pathname: '/otppage',
            data: result.results,
            })
        }
        else if(result.status === false){
          this.setState({
            loading: false,
            errorMessage: result.msg,
          })
        
      }

      
      })

    }
  }



Login  = () =>{
  this.props.history.push({
    pathname : "/login"
  })
}

  render() {
    return (
        <div class="sign-in-pnp">
        <div class="sign-in-head">
          <a onClick={this.Login}><img src="left-arrow.png" alt="arrow" /></a>
        </div> 
        <div class="sign-in-pnp-info">
          <img src="sign-dog.png" alt="img" />
          <h3>Getting Started</h3>
          <p>Create an account to continue</p>
        </div>
        { this.state.loading === true ? <LoadingSymbol /> : "" } 
        <div class="sign-in-inputs">
          <div class="sign-in-inputs-left">
            <input 
              type="text" 
              placeholder="Your Name"
              name='name'
              onChange={this.handleChange}
              />
            <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.name}</div>
            <input 
              type="email" 
              placeholder="Email Address"
              name='email'
              onChange={this.handleChange} 
              />
              <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.email}</div>
            <input 
              type="number" 
              placeholder="Phone Number"
              name='phone'
              min='0'
              max='3'
              maxLength='10'
              onChange={this.handleChange} 
              />
            <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.phone}</div>
            <input 
              type="password" 
              placeholder="Password"
              name='password'
              onChange={this.handleChange} 
              />
            <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.password}</div>  
          </div>
          <p style={{margin: '10px', color: 'red'}}>{this.state.errorMessage}</p>
          <button onClick={this.newRegistration}>Sign Up</button>
          <p>Already have an account? <a onClick={this.Login}>Sign in</a> </p>
        </div>
        <div class="sign-in-btm">
          {/* <a href="#">Skip for Now</a> */}
        </div>
      </div>
    )
  }
}

export default SignUp