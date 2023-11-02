import React, { Component } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import BoardingBooking from '../BoardingModule/BoardingBooking';
import Services from '../Services/Services';
import Footer from './Footer';
import Header from './Header';
import LoadingSymbol from './LoadingSymbol';
import '../../All.css'
import Navigation from './Navigation';
import Location from './Location';
import {geocodeByAddress,getLatLng} from 'react-places-autocomplete';
import '../CSS/EntryCSS/Location.css'
import PetInteraction from './PetInteraction';
import PullToRefresh from 'react-simple-pull-to-refresh';
import DogsList from '../EntryScreens/DogsList';
import { act } from 'react-dom/test-utils';
import Wallet from './Wallet';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";





let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));
let location = localStorage.getItem(`client-location`);
let settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight :true,
  responsive: [
      {
          breakpoint: 1440,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            dots: true,
            centerMode: true,
            centerPadding: '30px',
          }
        },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          centerMode: true,
          centerPadding: '30px',
        }
      },
      {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            dots: true,
            centerMode: true,
            centerPadding: '30px',
          }
        },
      {
        breakpoint: 767,
        settings: {
          adaptiveHeight :true,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          centerMode: true,
          centerPadding: '30px',
        }
      },
      {
          breakpoint: 600,
          settings: {
              adaptiveHeight :true,
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: false,
              dots: true,
              arrows: true,
              centerMode: true,
              centerPadding: '30px',
              slidesToShow: 1
            }
        },
    ]
};



export class Home extends React.PureComponent {

    constructor(props) {
        super(props);

    this.state = {
        loading: false,
        servicesArray: [],
        duplicatedServicesArray: [],
        blogsArray: [],
        bannerImage:'',
        userData: userData,
        userdogs:[],
        open_menu : false,
        Number_of_quotations : "",
        location_popup : false,
        latLng : "",
        address : location,
        quotations : [],
        pet_Interaction_popup : false,
        active_jobs : [],
        wallet : "",
        wallet_popup : false,
        notify_count : ""
      };
    }

  
    componentDidMount () {
      if(navigator.onLine){
        this.setState({
            loading: true,
        })
        if(!userData){
          window.location.reload();
        }
        // if(location == null){
        //   window.location.reload();
        // }
        this.getCurrentLocation();
      //   Services.getInstance().allServicesHomePage().then((result)=>{
      //       console.log(result);
      //       if(result.status === true){
      //           this.setState({
      //               servicesArray: result.services,
      //               duplicatedServicesArray: result.services,
      //               blogsArray: result.blog,
      //               loading: false,
      //               userData: userData,
      //           })
      //       }
            
        const obj1={
         customer_id : userData.id,
        }

        Services.getInstance().PetList(obj1).then((result)=>{
          console.log(result);
          if(result.status === true) {
            this.setState({
              userdogs : result.data
            })           
          }
          else if(result.status === false){
            this.setState({
              error_messgae: result.msg,
            })
           
          }
        })
      // })

      Services.getInstance().ServicesHomePage().then((result)=>{
        console.log(result);
        if(result.status === true) {
          
                   
        }
        else if(result.status === false){
          this.setState({
            error_messgae: result.msg,
          })
         
        }
      })
      // const obj={
      //   client_id : userData.id,
      // }

      // Services.getInstance().myQuotes(obj).then((result)=>{
      //   console.log(result);
      //   if(result.status === true) {
      //     this.setState({
      //      Number_of_quotations : result.quotations.length,
      //      quotations : result.quotations,
           
      //     })
      //   }
      //   else if(result.status === false){
      //     this.setState({
      //       error_messgae: result.msg,
      //       quotations : [],
            
      //     })
      //   }
      // })

      const obj2={
        client_id : userData.id,
      }

      Services.getInstance().bookingsCount(obj2).then((result)=>{
        console.log(result);
        if(result.total_bookings == 0) {
          
          
        }else{
         
        }
       
      })

      const obj3={
        clientId : userData.id,
      }
      Services.getInstance().getCIWalletAmount(obj3).then((result)=>{
       this.setState({
        wallet : result.wallAmount,
        notify_count : result.notifi,
       })
        console.log(result);
      })



      const obj4={
        userId : userData.id,
      }
      Services.getInstance().getClientBookings(obj4).then((result)=>{
        if(result.length > 0){
          this.setState({
            active_jobs : result
          })
        }else{
          this.setState({
            active_jobs : []
          })
        }
        }) 

      }
      else{
        this.props.history.push({
          pathname : "/internet"
        })
      }
    }




    openLocation = () =>{
      this.setState({
        // user_location : provider_location,
        location_popup: true,
      })
    }

    getCurrentLocation=()=>{
      if ("geolocation" in navigator) {
            console.log("Available");
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
                        localStorage.setItem("client-location", results[1].formatted_address);
                      }
                  }
                  else {
                    //
                  }
                    
                });
          });
      } 
      else 
      {
        console.log("open GPS")
      }
      }

    getBanner = (allBanners) =>{
      switch(allBanners){
        case "1":
          //Boarding
          this.props.history.push({
            pathname: '/boarding-booking',
            form_type: "Boarding",
            form_bg_color: "#57d0ef"
          })
          break;
        case '2':
          //Grooming
          this.props.history.push({
            pathname: '/groom-booking',
          })
            break;
        case '3':
          //Training
          this.props.history.push({
            pathname: '/train-booking',
          })
            break;
        case '4':
          //Walking
          this.props.history.push({
            pathname: '/walk-booking',
          })
            break;
        case '5':
          //Vet@Home
          this.props.history.push({
            pathname: "/vet-booking"
          })
            break;
        case '6':
          //Sitting
          this.props.history.push({
            pathname: "/sit-booking"
          })
            break;
        default:
          //None
          break;        
      }

      this.setState({
        bannerImage: allBanners,
      })
    }

    handleOnSearch = (string, results) => {
      console.log(string, results)
      this.setState({
        servicesArray: results
      })
    
      if(string === ""){
        this.setState({
          servicesArray: this.state.duplicatedServicesArray
        })
      
      }
    }

    handleOnHover = (result) => {
      // the item hovered
      console.log(result)
      this.setState({
        servicesArray: result
      })
    
      
    }
          
    handleOnSelect = (item) => {
      // the item selected
      console.log(item)
      this.setState({
        servicesArray: [item]
      })
    }
    
    handleOnFocus = () => {
      //
    }
    
    onClickCaptureMethod = () =>{
      //
    }

    allServiceQuotations = (selectedService) =>{
      console.log(selectedService);
      switch(selectedService.id){
        case '1':
          //Boarding Service
            this.props.history.push({
            pathname: '/all-boarder-quotations'
            })
            break;
        case '2':
          //Training
            break;
        case '3':
          //Grooming
            break;
        case '4':
          //Walking
            break;
        default:
          //None
          break;

      }
      
    }


dogForm=()=>{
      this.props.history.push({
        pathname : "/create-dog-form"
      })
}


openMenu = e =>{
      console.error("SSSSS");
      console.log("zzz");
      this.setState({
        open_menu : true,
      })
}

closeMenu = () =>{
      this.setState({
        open_menu : false,
      })
}
    
    

logout=()=>{
      localStorage.removeItem("PNP-Client-userData");
      localStorage.clear();
      this.props.history.push({
        pathname : "/login"
      })
}

useCurrentLocation = () =>{
      if ("geolocation" in navigator) {
        console.log("Available");
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
                    localStorage.setItem("client-location", results[1].formatted_address);
                    window.location.reload();
                  }
              }
              else {
                //
              }
                
            });
      });
  } 
  else 
  {
    console.log("open GPS")
  }

}

closePopUp = () =>{
      this.setState({
        location_popup: false,
      })
}

closedogPopUp = () =>{
      this.setState({
        pet_Interaction_popup : false,
      })
}

useLocation = (address) =>{
      this.setState({
        user_location: address,
        location_popup: false,
      })
}

handleSelectLocations = address => {
      geocodeByAddress(address)
        .then(results =>  getLatLng(results[0]) )
        .then(latLng =>  {this.setState({ latLng: latLng }); 
        localStorage.setItem("serivce_provider_lat", latLng.lat);
        localStorage.setItem("serivce_provider_long", latLng.lng);
      })
        .catch(error => console.error('Error', error));
        console.log(address)
        this.setState({ address });
        localStorage.setItem("client-location", address);
};

handleChangeLocations = address => {
      this.setState({ address });
};

handleRefresh=()=>{
    // console.log("raju");
    window.location.reload();
    // this.setState({});
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
      const obj={
        userId : userData.id,
        petId : dogdata.id,
      }
      console.log(obj);

      Services.getInstance().getClientBookings(obj).then((result)=>{
        if(result.length > 0){
          this.setState({
            active_jobs : result
          })
        }else{
          this.setState({
            active_jobs : []
          })
        }
       
        console.log(result);
      })
    console.log(dogdata);
  }
  else if(document.getElementById(dog_input).checked === false){
    this.setState({
      user_checked_input : dogdata,
    })
  }
}

ConfirmViewDetails=(activeJobData)=>{
  localStorage.setItem("client-active-booking",JSON.stringify(activeJobData));
  this.props.history.push({
    pathname : "/activeDetails",
    confirm_data : activeJobData,
  })
}



readNotification = () =>{
  const obj = {
    userId : userData.id,
  }
  Services.getInstance().ReadNotifications(obj).then((result)=>{
    console.log(result);
    this.props.history.push({
      pathname : "/notifications-page"
    })
  })
}





closeWalletPopUp = () =>{
  this.setState({
    wallet_popup : false,
  })
}

Wallet=()=>{
this.props.history.push({
  pathname : "/wallet"
})
}


 






render() {
    return (
      <div class="c-home">
        
      {/* <Header
       openMenu = {this.openMenu}
      /> */}

         <header>
        <div class="menu-head">
        <div class="menu-btn" >
          <img src='menu-icon.png' alt='menu-l' onClick={()=>this.openMenu()}/>
          {/* <span></span> */}
        </div>
        <div class="menu-logo">
          <img src="petsfolio-logo.png" alt="logo" />
        </div>
        
        <div class="menu-sm-btns">
          <div class="menu-smc qtns" onClick={this.readNotification}>
            <img src="bell-icon.png"  />

              {this.state.notify_count=="0" ? "" : 
              <div className='ntfn-c' >
              <span>{this.state.notify_count}</span>
            </div>}

           
          </div>
          <div class="menu-smc" onClick={this.Wallet}>
            <img src="wallet.png" alt="chart" />
            <p>{this.state.wallet || "0"}/-</p>
          </div>
        </div>
       </div>
       {/* <div className='location' onClick={this.openLocation}>
        </div>
        <div class="loc-div" >
          <img src="location.png"/>
          <span>{this.state.address}</span>
        <div class="home-edt-loc">
          <img src="edit-t-icon.png" onClick={this.openLocation}/>
          </div>
          </div> */}
       
       {
            this.state.open_menu ?  
            <Navigation
              closeMenu = {this.closeMenu} 
              logout ={this.logout}
            /> 
            : ""
          }
         </header>

          <div > 
            <PullToRefresh onRefresh={this.handleRefresh}>
            <div class="main-sec">
              <div class="my-pet-sec m-b">
                <h6>My Pet</h6>
              
                <div class="pet_info">
                <div class="pet_section">
                

                  {/* <DogsList
                    handleDogChange = {this.handleDogChange}
                    DogInfo = {this.DogInfo}
                  /> */}

          </div>
        </div>
             <div class="my-pet-info">
        {this.state.userdogs && this.state.userdogs.length>0 ? this.state.userdogs.map((getuserdog,index)=>{
          return(
            <div class="my-pet-details">
              <div>
                <img src="my-pet.png" alt="img" />
              </div>
              <strong>{getuserdog.pet_name}</strong>
            </div>
              )
            }) : " "
          }
          
                   
            <div class="my-pet-details">
              <div onClick={this.dogForm}>
                <img src="plus-icon.png" alt="img" />
              </div>
            </div>
          </div> 
   
        </div>

        <div class="hm-slider">
            {this.state.active_jobs && this.state.active_jobs.length > 0 ? this.state.active_jobs.map((act_job,index)=>{
              return(
                
                  <div class="hm-ac-srvc" key={index} id='act_clr' style={{backgroundColor : act_job.serviceId=="1"  ? "#6dcaf3" : "" || act_job.serviceId=="2"  ? "#9192ff" : "" || act_job.serviceId=="3"  ? "#e3d438" : "" || act_job.serviceId=="4"  ? "#60d67b" : "" || act_job.serviceId=="5"  ? "#ec6aad" : "" || act_job.serviceId=="6"  ? "#68f0c6" : ""}}  >              
                    <div class="hm-ac-v">
                      <div class="hm-ac-lft">
                        <p>Active Service</p>
                        <h6>{act_job.name}</h6>
                      </div>
                      <div class="hm-ac-rht" onClick={()=>this.ConfirmViewDetails(act_job)} >
                        <button style={{boxShadow : act_job.serviceId=="1"  ? "2px 4px 0 #53a6cb" : "" || act_job.serviceId=="2"  ? "2px 4px 0 #696be9" : "" || act_job.serviceId=="3"  ? "2px 4px 0 #d5c630" : "" || act_job.serviceId=="4"  ? "2px 4px 0 #3bb958" : "" || act_job.serviceId=="5"  ? "2px 4px 0 #ec6aad" : "" || act_job.serviceId=="6"  ? "2px 4px 0 #2fbb8f" : "" ,color: act_job.serviceId=="1"  ? "#6dcaf3" : "" || act_job.serviceId=="2"  ? "#9192ff" : "" || act_job.serviceId=="3"  ? "#e3d438" : "" || act_job.serviceId=="4"  ? "#60d67b" : "" || act_job.serviceId=="5"  ? "#ec6aad" : "" || act_job.serviceId=="6"  ? "#68f0c6" : ""}}>View Details</button>
                      </div>
                    </div>
                    <div class="paws">
                      <img src="bg-paws.png" alt="image"/>
                    </div>
                  </div>
                
              )
              
            }):""}
            </div>



            
        <div class="wfl-sec m-b">
            <h6>What Are You Looking For?</h6>
            <div class="wfl-categories">
              <div class="wfl-boarding" onClick={()=>this.getBanner("1")}>
                <a>
                  <img src="board-img.png" alt="img" />
                </a>  
                <p>Boarding</p>
              </div>
              <div class="wfl-grooming" onClick={()=>this.getBanner("2")}>
                <a>
                  <img src="grooming-img.png" alt="img" />
                </a>  
                <p>Grooming</p>
              </div>
              <div class="wfl-training" onClick={()=>this.getBanner("3")}>
                <a>
                  <img src="training-img.png" alt="img" />
                </a>  
                <p>Training</p>
              </div>
              <div class="wfl-walking" onClick={()=>this.getBanner("4")}>
                <a>
                  <img src="walking-img.png" alt="img" />
                </a>  
                <p>Walking</p>
              </div>
              {/* <div class="wfl-vet" onClick={()=>this.getBanner("5")}>
                <a>
                  <img src="vet-img.png" alt="img" />
                </a>  
                <p>Vet @ Home</p>
              </div> */}
              {/* <div class="wfl-sitting" onClick={()=>this.getBanner("6")}>
                <a>
                  <img src="sitting-img.png" alt="img" />
                </a>  
                <p>Sitting</p>
              </div> */}
            </div>
        </div>
{/* 
        <div class="ad-frame m-b">
          <a href="">
            <img src="ad-img-1.png" alt="img" />
          </a>
        </div> */}

        <div class="our-partners m-b">
          <h6>Pet Masters </h6>
          <div class="partners-sec">
            <div>
              <div class="op-sec">
                <div class="op-sec-cont" style={{background: "#d6a1cc", boxShadow: "0px 5px 5px 0 #e8cfcd"}}>
                  <img src="team-1.png" alt="img" />
                  <p>190+</p>
                </div>
                <div class="op-sec-details">
                  <strong>Sam</strong>
                  <p>Boarder</p>
                </div>
              </div>
            </div>
            <div>
              <div class="op-sec">
                <div class="op-sec-cont" style={{background: "#7dcdb4", boxShadow: "0px 5px 5px 0 #e0e8d4"}}>
                  <img src="team-2.png" alt="img" />
                  <p>185+</p>
                </div>
                <div class="op-sec-details">
                  <strong>Vishal</strong>
                  <p>Groomer</p>
                </div>
              </div>
            </div>
            <div>
              <div class="op-sec">
                <div class="op-sec-cont" style={{background: "#6fc8cb", boxShadow: "0px 5px 5px 0 #dee9db"}}>
                  <img src="team-3.png" alt="img" />
                  <p>196+</p>
                </div>
                <div class="op-sec-details">
                  <strong>Sunder</strong>
                  <p>Trainer</p>
                </div>
              </div>
            </div>
            <div>
              <div class="op-sec">
                <div class="op-sec-cont" style={{background: "#6fc8cb", boxShadow: "0px 5px 5px 0 #dee9db" }}>
                  <img src="team-3.png" alt="img" />
                  <p>189+</p>
                </div>
                <div class="op-sec-details">
                  <strong>Vikas</strong>
                  <p>Walker</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="ad-frame m-b">
          <a>
            <img src="ad-img-2.png" alt="img" />
          </a>
        </div> 

        {/* <div class="workshop-sec m-b">
          <div class="workshop-sec-head">
            <h6>Workshops</h6>
            <button>see All</button>
          </div>
          <div class="wrk-blk">
            <div>  
              <div class="wrk-info">
                <div class="op-sec-cont">
                  <img src="workshop1.png" alt="img" />
                  <p>free</p>
                </div>
                <div class="wrk-details">
                  <p>Animal Telepathy Workshop</p>
                  <div class="wrk-timings">
                    <div class="wrk-timings-img">
                      <img src="calender-2.png" alt="img" />
                    </div>
                    <span>January 15 & 25</span>
                  </div>
                  <div class="wrk-timings">
                    <div class="wrk-timings-img">
                      <img src="clock.png" alt="img" />
                    </div>
                    <span>11am & 12pm</span>
                  </div>
                  <button class="b-btn">join</button>
                </div>
              </div>
            </div>
            <div>
              <div class="wrk-info">
                <div class="op-sec-cont">
                  <img src="workshop2.png" alt="img" />
                  <p>free</p>
                </div>
                <div class="wrk-details">
                  <p>Animal Telepathy Workshop</p>
                  <div class="wrk-timings">
                    <div class="wrk-timings-img">
                      <img src="calender-2.png" alt="img" />
                    </div>
                    <span>January 15 & 25</span>
                  </div>
                  <div class="wrk-timings">
                    <div class="wrk-timings-img">
                      <img src="clock.png" alt="img" />
                    </div>
                    <span>11am & 12pm</span>
                  </div>
                  <button class="b-btn">join</button>
                </div>
              </div>
            </div>
            <div>
              <div class="wrk-info">
                <div class="op-sec-cont">
                  <img src="workshop2.png" alt="img" />
                  <p>free</p>
                </div>
                <div class="wrk-details">
                  <p>Animal Telepathy Workshop</p>
                  <div class="wrk-timings">
                    <div class="wrk-timings-img">
                      <img src="calender-2.png" alt="img" />
                    </div>
                    <span>January 15 & 25</span>
                  </div>
                  <div class="wrk-timings">
                    <div class="wrk-timings-img">
                      <img src="clock.png" alt="img" />
                    </div>
                    <span>11am & 12pm</span>
                  </div>
                  <button class="b-btn">join</button>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div class="pcg-sec m-b">
          <h6>Popular Community Groups</h6>
          <div class="pcg-sec-cont" id="pcg-sec-cont">
            <a href="#">
              <img src="popular1.png" alt="img" />
            </a>
            <a href="#">
              <img src="popular2.png" alt="img" />
            </a>
            <a href="#">
              <img src="popular3.png" alt="img" />
            </a>
            <a href="#">
              <img src="popular3.png" alt="img" />
            </a>
          </div>
        </div> */}

        <div class="ad-frame m-b">
          <a href='https://wa.me/917997887788'>
            <img src="ad-img-3.png" alt="img" />
          </a>
        </div>

        <div class="pet-stories-sec">
          <div class="workshop-sec-head">
            <h6>Blogs</h6>
            {/* <button class="ad-btn"><i class="fa fa-solid fa-plus"></i> Post</button> */}
          </div>
          <div class="wrk-blk" id="pet-stories">
            <div>
              <div class="wrk-info" onClick={()=>{
                  window.open("https://www.petsfolio.com/in/10-most-affectionate-dog-breeds/", "_blank")
              }}>
                <div class="pss-subhead">
                  <h6>10 Most Affectionate Dog Breeds</h6>
                  <p>Humans love language, and so do dogs..</p>
                </div>
                <div class="pss-mid">
                  <img src="pet-story-3.jpg" alt="img" />
                </div>
                <div class="read-more-sec">
                  {/* <div class="pet-owner">
                    <div>
                      <img src="pet1.png" alt="img" />
                    </div>
                    <p> Nola
                      <span>13min ago</span>
                    </p>
                  </div> */}
                  {/* <div class="pss-like-sec">
                    <div class="pss-cmnt">
                      <img src="like-btn.png" alt="img" />
                      <p>24</p>
                    </div>
                    <div class="pss-cmnt">
                      <img src="cmnt-btn.png" alt="img" />
                      <p>13</p>
                    </div>
                  </div> */}
                  <button class="b-btn">Read More</button>
                </div>
              </div>
            </div>
            <div>
              <div class="wrk-info" onClick={()=>{
                  window.open("https://www.petsfolio.com/in/why-is-pet-registration-important-for-your-pet/", "_blank")
              }}>
                <div class="pss-subhead">
                  <h6>Importance Of Your Pet Registration</h6>
                  <p>Numerous pet owners cherish their four-legged children..</p>
                </div>
                <div class="pss-mid">
                  <img src="pet-story-2.jpg" alt="img" />
                </div>
                <div class="read-more-sec">
                  {/* <div class="pet-owner">
                    <div>
                      <img src="pet1.png" alt="img" />
                    </div>
                    <p> Nola
                      <span>13min ago</span>
                    </p>
                  </div> */}
                  {/* <div class="pss-like-sec">
                    <div class="pss-cmnt">
                      <img src="like-btn.png" alt="img" />
                      <p>24</p>
                    </div>
                    <div class="pss-cmnt">
                      <img src="cmnt-btn.png" alt="img" />
                      <p>13</p>
                    </div>
                  </div> */}
                  <button class="b-btn">Read More</button>
                </div>
              </div>
            </div>
            <div>
              <div class="wrk-info" onClick={()=>{
                  window.open("https://www.petsfolio.com/in/why-is-my-dog-so-stubborn/", "_blank")
              }}>
                <div class="pss-subhead">
                  <h6>Why is my dog so stubborn?</h6>
                  <p>Do you ever fret and get overwhelmed with..</p>
                </div>
                <div class="pss-mid">
                  <img src="pet-story-1.jpg" alt="img" />
                </div>
                <div class="read-more-sec">
                  {/* <div class="pet-owner">
                    <div>
                      <img src="pet1.png" alt="img" />
                    </div>
                    <p> Nola
                      <span>13min ago</span>
                    </p>
                  </div> */}
                  {/* <div class="pss-like-sec">
                    <div class="pss-cmnt">
                      <img src="like-btn.png" alt="img" />
                      <p>24</p>
                    </div>
                    <div class="pss-cmnt">
                      <img src="cmnt-btn.png" alt="img" />
                      <p>13</p>
                    </div>
                  </div> */}
                  <button class="b-btn">Read More</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
        </PullToRefresh>
          </div>
            
          {this.state.location_popup ? 
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

        {/* {this.state.pet_Interaction_popup ? 
         <PetInteraction
         closedogPopUp = {this.closedogPopUp}
         />  
         :""
      } */}


      {this.state.wallet_popup ? 
         <Wallet
         closeWalletPopUp = {this.closeWalletPopUp}
         WalletAmount={this.state.wallet}
         
         />  
         :""
      }
     

     
     <Footer
     
     />
     
      </div>

    )
}
}

export default Home