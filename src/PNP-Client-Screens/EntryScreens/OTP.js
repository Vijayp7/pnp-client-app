import React, { Component } from 'react'
import Services from '../Services/Services';
import LoadingSymbol from './LoadingSymbol';


export class OTP extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleStart();
    this.state = {
      dataReceived: this.props.location.data,
      loading: false,
      resend_otp : "",
      error_message: "",
      time: 1*60,
      running: true,
      value: '', otp1: "", otp2: "", otp3: "", otp4: "", otp5: "",otp6: "", disable: true
    };
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

  componentDidUpdate(prevProps, prevState) {
    if(this.state.running !== prevState.running){
      switch(this.state.running) {
        case true:
          this.handleStart();
      }
    }
    document.querySelectorAll('input[type="number"]').forEach(input =>{
      input.oninput=()=>{
        if(input.value.length > input.maxLength) input.value=input.value.slice(0,input.maxLength)
      };
    });
  }

  handleStart() {
    this.timer = setInterval(() => {
      const newTime = this.state.time - 1;
      this.setState(
        {time: newTime >= 0 ? newTime : 0}
      );
    }, 1000);
  }

  handleStop() {
    if(this.timer) {
      clearInterval(this.timer);
      this.setState(
        {running:false}
      );
    }
  }

  handleReset() {
    this.setState(
      {time: 0}
    );
  }


  handleCountdown(seconds) {
    this.setState({
      time: seconds,
      running: true
    })
  }

  format(time) {
    const date = new Date(time * 1000);
    let hh = date.getUTCHours();
    let mm = date.getUTCMinutes();
    let ss = date.getSeconds();
    if (hh < 10) {hh = "0"+hh;}
    if (mm < 10) {mm = "0"+mm;}
    if (ss < 10) {ss = "0"+ss;}
    return '00' !== hh ? hh+":"+mm+":"+ss : mm+":"+ss;
  }

  goBack = () =>{
    window.open("#/login", "_self");
  }



  handleChange(value1, event) {

    this.setState({ [value1]: event.target.value });
  }

  inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {

        elmnt.target.form.elements[next].focus()
      }
    }
    else {
      console.log("next");
     
        const next = elmnt.target.tabIndex;
        if (next < 6) {
          elmnt.target.form.elements[next].focus()
        }
    }

  }



  ResendOtp=()=>{
    this.setState({
      loading: true,
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      otp6: ""
    })
    const obj = {
      username: this.state.dataReceived.phone,
    }
    Services.getInstance().newLogin(obj).then((result)=>{
      console.log(result);
      if(result.status === true) {
        this.setState({
          loading: false,
          resend_otp : "OTP has been sent successfully",
          time : 60             
        })
      }
      else if(result.status === false){
        this.setState({
          loading: false,
          resend_otp: result.msg,
        })
      }
  })
  }



  verifyOTP = (e) =>{
    e.preventDefault();
    this.setState({
      loading: true,
    })
    const obj = {
      user_id: this.state.dataReceived.user_id,
      otp: this.state.otp1+this.state.otp2+this.state.otp3+this.state.otp4+this.state.otp5+this.state.otp6
    }
    Services.getInstance().verifyOTP(obj).then((result)=>{
      console.log(result);
      if(result.status === true) {
        localStorage.setItem(`PNP-Client-userData`, JSON.stringify(result.data));
        localStorage.setItem(`PNP-Client-userId`, JSON.stringify(result.data.id));
        this.setState({
          loading: false,
        })
        const obj1={
          customer_id : result.data.id,
        }

        Services.getInstance().PetList(obj1).then((result)=>{
          console.log(result);
          if(result.status === true) {
            this.props.history.push({
            pathname: '/homepage'
          })           
          }
          else if(result.status === false){
            this.setState({
              error_messgae: result.msg,
            })
            this.props.history.push({
              pathname: '/create-dog-form'
            })
           
          }
        })
      }
      else if(result.status === false){
        this.setState({
          error_message: result.msg,
          loading: false,
        })
      }
      else{
        this.setState({
          error_message: result.msg,
          loading: false,
        })
      }
    })
  }






  // send = () =>{
  //   const data = {
  //     "userId" : this.state.dataReceived.user_id,
  //     "type" : "Client"
  //   }
  //   const iframe = document.getElementById("my-iframe");
  //   iframe.contentWindow.postMessage(data, "*");
  // }

























  
  render() {
    const {time} = this.state;
    return (
        <div class="otp-pnp">
        <div class="otp-head">
          <a onClick={this.goBack}><img src="left-arrow.png" alt="arrow" /></a>
        </div> 
        <div class="otp-pnp-info">
          <img src="otp-img.png" alt="img" />
          <h3>Verification</h3>
          <p>We have sent the login OTP on your registered mobile number..</p>
        </div>
        { this.state.loading === true ? <LoadingSymbol /> : "" } 
        <div class="otp-inputs">
        <form>
        <div class="otp-inputs">
          <div class="otp-inputs-left">         
        
        <div className="otpContainer">

          <input
            id="otp1"
            name="otp1"
            type="number"
            max={1}
            autoComplete="off"
            className="otpInput"
            value={this.state.otp1}
            onKeyPress={this.keyPressed}
            onChange={e => this.handleChange("otp1", e)}
            tabIndex="1" maxLength="1" onKeyUp={e => this.inputfocus(e)}

          />
          <input
            id="otp2"
            name="otp2"
            type="number"
            max={1}
            autoComplete="off"
            className="otpInput"
            value={this.state.otp2}
            onChange={e => this.handleChange("otp2", e)}
            tabIndex="2" maxLength="1" onKeyUp={e => this.inputfocus(e)}

          />
          <input
            id="otp3"
            name="otp3"
            type="number"
            max={1}
            autoComplete="off"
            className="otpInput"
            value={this.state.otp3}
            onChange={e => this.handleChange("otp3", e)}
            tabIndex="3" maxLength="1" onKeyUp={e => this.inputfocus(e)}

          />
          <input
            id="otp4"
            name="otp4"
            type="number"
            max={1}
            autoComplete="off"
            className="otpInput"
            value={this.state.otp4}
            onChange={e => this.handleChange("otp4", e)}
            tabIndex="4" maxLength="1" onKeyUp={e => this.inputfocus(e)}
          />

          <input
            id="otp5"
            name="otp5"
            type="number"
            max={1}
            autoComplete="off"
            className="otpInput"
            value={this.state.otp5}
            onChange={e => this.handleChange("otp5", e)}
            tabIndex="5" maxLength="1" onKeyUp={e => this.inputfocus(e)}
          />
          <input
            id="otp6"
            name="otp6"
            type="number"
            max={1}
            autoComplete="off"
            className="otpInput"
            value={this.state.otp6}
            onChange={e => this.handleChange("otp6", e)}
            tabIndex="6" maxLength="1" onKeyUp={e => this.inputfocus(e)}
          />
        </div>
          </div>
          <p style={{textAlign: 'center', color: 'red', marginBottom: '10px'}}>{this.state.error_message}</p>
        <div className='otptimer'>
        <p>Resend OTP in {time && time < 10 ? <span>00:{"0"+time}</span> : <span>00:{time}</span>}</p>
        </div>
        <div class="otp-btm">
          <button onClick={this.verifyOTP}>Verify</button>
          <p style={{margin:"0 auto", textAlign: "center", color : "#9dce76", padding: "10px"}}>{this.state.resend_otp}</p>
          <p>Didn't receive any code?</p>
          <a onClick={this.ResendOtp}>Resend New OTP</a>
         
        </div>

        </div>
        </form>

        </div>
        {/* <div >
          <iframe  title="Testing" src='https://www.xhtmlreviews.com/pnp-notifications/' id='my-iframe' />
        </div> */}
      </div>
    )
  }
}

export default OTP