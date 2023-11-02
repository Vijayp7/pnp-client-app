import React, { Component } from 'react'
import Services from '../Services/Services';
import ReactWhatsapp from 'react-whatsapp';


export class Footer extends React.PureComponent {

  constructor(props) {
    super(props);

this.state = {
   name: ""
  };
}

  home = () =>{
    window.open("#/homepage", "_self");
  }

  profile=()=>{
    window.open("#/myprofile","_self");
  }

  Quotation = () =>{
    window.open("#/quotation","_self");
  }

  


  openCommunityForum = () =>{
    // window.location.replace("https://a2zcontent.com/developer/petsforum/", "_self");
    // window.open("")
    window.open("/community", "_self");
  }

  myNotifications=()=>{
    window.open("#/mybookings", "_self");
  }
  render() {
    return (
      <footer>
        <a onClick={this.Quotation}>
          <img src="quote-img.png" className='q-i'/>
          <span>Quotations</span>    
            {/* <div className='qtnsfoot'>
                <div className='qtns'>
                  <p>01</p>
                </div>
              </div> */}
        </a>

      <a onClick={this.home}>
        <img src="home_icon.png" alt="img" />
        <span>Home</span>
      </a>
      {/* <a style={{textDecoration: "none"}} onClick={this.openCommunityForum}>
        <img src="f-group.png" alt="img" />
        <span>Community</span>
      </a> */}
      <a onClick={this.myNotifications} >
        <img src="my-bkng-icon.png" alt='img'/>
        <span>Bookings</span>
      </a>

      
      <a href='https://wa.me/917997887788'>
        <img src="help.png" class="wo-a"/>
        <span>Help</span>
      </a>


      {/* <a>
        <img src="help.png" class="wo-a"/>
        <span>Help</span>
        <ReactWhatsapp number="917997887788" message="Hello World!!!" />
      </a> */}

      
    </footer>
    )
  }
}

export default Footer