import React, { Component } from 'react'
import Services from '../Services/Services';
import LoadingSymbol from './LoadingSymbol';

export class Login extends React.PureComponent {
    constructor(props) {
        super(props);

    this.state = {
        phone_or_email: "",
        error_messgae: "",
        loading: false,
        input_error : {
          input_error_phone_or_email : ""
        }
      };
    }

componentDidMount = () =>{
  if(navigator.onLine){
    for(let i=0; i<50; i++){
      window.history.pushState('forward', null, window.location);
      }
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

validateForm = () =>{
  if(this.state.phone_or_email == ""){
      this.setState({
        input_error : {
          phone_or_email : "Please Enter Phone Number"
        }
      })
    }

  else{
    this.setState({
      input_error : {
        phone_or_email : ""
      }
    })
    this.setState({
      loading: true,
    })
    const obj = {
      username: this.state.phone_or_email,
    }
    Services.getInstance().newLogin(obj).then((result)=>{
      console.log(result);
      if(result.status === true) {
        this.setState({
          loading: false,
        })
        this.props.history.push({
          pathname: '/otppage',
          data: result.data,
        })                       
      }
      else if(result.status === false){
        this.setState({
          error_messgae: result.msg,
        })
        this.setState({
          loading: false,
        })
      }
    })
  }
}


Login = () => {
  this.validateForm();
}

SignUp = () =>{
  this.props.history.push({
    pathname : "/signup"
  })
}

render() {
    return (
        <div className="login-pnp">
        <div className="login-head">
          <h5>Welcome!</h5>
        </div> 
        <div className="login-pnp-info">
          <img src="login-img.png" alt="img" />
          { this.state.loading === true ? <LoadingSymbol /> : "" }
          <input
            type="text" 
            placeholder="Enter Phone Number"
            name="phone_or_email"
            min='0'
            max='3'
            maxLength='10'
            noValidate
            onChange={this.handleChange}
          />
          <div style={{margin: '10px', color: 'red'}}>{this.state.input_error.phone_or_email}</div>
          <p style={{margin: '10px', color: 'red'}}>{this.state.error_messgae}</p>
          <button onClick={this.Login}>Continue</button>
          <p>Don't have an account? <a onClick={this.SignUp}>Sign up</a></p>
          </div> 
          <div className="login-skip">
          </div>
          <div>
        </div>
      </div>
    )
  }
}

export default Login