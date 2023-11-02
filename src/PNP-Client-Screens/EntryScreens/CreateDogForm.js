import React, { Component } from 'react'
import '../CSS/EntryCSS/CreateDogForm.css'
import Services from '../Services/Services';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from './DarkBackground';




const user = JSON.parse(localStorage.getItem(`PNP-Client-userData`));
export class CreateDogForm extends React.PureComponent {
  constructor(props){
    super(props);
  }

  state={ 
    pet_type : "dog",
    petname : "",
    gender : "",
    age :"",
    dob : "",
    aggression : "",
    breeds : [] ,
    breed_type :"",
    vaccination:"",
    licence:"",
    loading:false,
    insurance:"",
    input_error : {
      input_error_petname : "",
      input_error_gender : "",
      input_error_age : "",
      input_error_dob : "",
      input_error_aggression : "",
      input_error_breed_type : "",
    }
    
  }

  handleChange = e=>{
    const {name,value}= e.target;
    this.setState({
      [name]:value
    }
     ,()=>{
      let today = new Date().toISOString().split('T')[0];
      document.getElementsByName("dob")[0].setAttribute('max', today);
      document.getElementsByName("vaccination")[0].setAttribute('min', this.state.dob);
      document.getElementsByName("vaccination")[0].setAttribute('this.state.dob', this.state.vaccination);
      console.log(this.state);
    }
    );
  }

  Gender=(pet_gender)=>{
    this.setState({
      gender : pet_gender
    })
    if(pet_gender=="Male"){
      document.getElementById(pet_gender).classList.add("active");
      document.getElementById("Female").classList.remove("active");
    }
    else if(pet_gender=="Female"){
      document.getElementById(pet_gender).classList.add("active");
      document.getElementById("Male").classList.remove("active");
    }else{
      document.getElementById("Male").classList.remove("active");
      document.getElementById("Female").classList.remove("active")
    }
    
  }

  Age=(pet_age)=>{
    this.setState({
      age : pet_age
    })
    if(pet_age=="upto 6m"){
      document.getElementById(pet_age).style.border = "2px solid #f6c39b";
      document.getElementById("upto 14m").style.border="none";
      document.getElementById("upto 3y").style.border="none";
    }
    else if(pet_age=="upto 14m"){
      document.getElementById(pet_age).style.border = "2px solid #f6c39b";
      document.getElementById("upto 6m").style.border="none";
      document.getElementById("upto 3y").style.border="none";
    }
    else if(pet_age=="upto 3y"){
      document.getElementById(pet_age).style.border = "2px solid #f6c39b";
      document.getElementById("upto 14m").style.border="none";
      document.getElementById("upto 6m").style.border="none";
    }
    else{
      document.getElementById("upto 6m").style.border="none";
      document.getElementById("upto 14m").style.border="none";
      document.getElementById("upto 3y").style.border="none";
    }
  }

  Aggression=(petagg)=>{
    this.setState({
      aggression : petagg
    })
    if(petagg=="Low"){
      document.getElementById(petagg).classList.add("active");
      document.getElementById("Medium").classList.remove("active");
      document.getElementById("High").classList.remove("active");
    }else if(petagg=="Medium"){
      document.getElementById(petagg).classList.add("active");
      document.getElementById("Low").classList.remove("active");
      document.getElementById("High").classList.remove("active");
    }else if(petagg=="High"){
      document.getElementById(petagg).classList.add("active");
      document.getElementById("Medium").classList.remove("active");
      document.getElementById("Low").classList.remove("active");
    }else{
        document.getElementById("Low").classList.remove("active");
        document.getElementById("Medium").classList.remove("active");
        document.getElementById("High").classList.remove("active");
    }
  }

  componentDidMount=()=>{

    if(navigator.onLine){
        for(let i=0; i<50; i++){
        window.history.pushState('forward', null, window.location);
        }

        let today = new Date().toISOString().split('T')[0];
          document.getElementsByName("dob")[0].setAttribute('max', today);
          document.getElementsByName("vaccination")[0].setAttribute('max', today);
          console.log(today);
        if(!user){
        window.location.reload();
        }
        document.getElementById("yes").classList.add("active");
        document.getElementById("yes").style.border="2px solid #e18b49";
        Services.getInstance().BreedType().then((result)=>{
          console.log(result);
          if(result.status === true) {
            this.setState({
              breeds : result.data,
            })                  
          }
          else if(result.status === false){
            this.setState({
              error_messgae: result.msg,
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

  SubmitDogForm=()=>{
    this.validateForm();
  }

  validateForm=()=>{
    if(this.state.petname== "" ){
      this.setState({
        input_error : {
          petname : "Please Enter PetName"
        }
      })
    }
    else if(this.state.breed_type == "" ){
      this.setState({
        input_error : {
          breed_type : "Please Select BreedType"
        }
      })
    }
    else if(this.state.gender== "" ){
      this.setState({
        input_error : {
          gender : "Please Select PetGender"
        }
      })
    }
    // else if(this.state.age == "" ){
    //   this.setState({
    //     input_error : {
    //       age : "Please Select PetAge"
    //     }
    //   })
    // }
    else if(this.state.dob == "" ){
      this.setState({
        input_error : {
          dob : "Please Enter Pet Date Of Birth"
        }
      })
    }

    
     else if(this.state.insurance == "" ){
      this.setState({
        input_error : {
         insurance : "Please Select Insurance"
        }
      })
    } 
    else if(this.state.licence == "" ){
      this.setState({
        input_error : {
         licence : "Please Select Licence"
        }
      })
    }
    else if(this.state.aggression == "" ){
      this.setState({
        input_error : {
          aggression : "Please Select Aggression"
        }
      })
    }
    else if(this.state.vaccination == "" ){
      this.setState({
        input_error : {
          vaccination : "Please Select Last Vaccination Date"
        }
      })
    }
    
    else{
      this.setState({
        error_name : "",
        loading : true
      })
      const obj = {
        customer_id : user.id,
        pet_type : this.state.pet_type,
        pet_name : this.state.petname,
        gender : this.state.gender,
        age : "",
        dob : this.state.dob,
        vaccination : this.state.vaccination,
        breed_type : this.state.breed_type,
        aggression : this.state.aggression,
        insurance : this.state.insurance,
        licence : this.state.licence,
      }
      console.log(obj);
      Services.getInstance().AddPets(obj).then((result)=>{
        console.log(result);
        if(result.status === true) {
          this.setState({
            loading : false
          })
          this.props.history.push({
              pathname: '/homepage',
              data: result.data,
              })                       
        }
        else if(result.status === false){
          confirmAlert({
            title: '',
            message: result.msg,
            buttons: [
              {
                label: 'Ok',
                onClick: () => {}
              },
            ]
          });
          this.setState({
            error_messgae: result.msg,
            loading: false,
          })

        }
    })
    }
  }

  petInfo=(pet_info)=>{
   
    if(pet_info=="yes"){
      document.getElementById("dog-form").style.display ="block";
      document.getElementById(pet_info).classList.add("active");
      document.getElementById(pet_info).style.border="2px solid #e18b49"
    }
    else if(pet_info=="no"){
      document.getElementById(pet_info).classList.add("active");
      document.getElementById(pet_info).style.border="2px solid #e18b49"
      this.props.history.push({
        pathname : "/homepage"
      })
    }else{
      
    }
  }

  Insurance=(insure_info)=>{
    this.setState({
      insurance : insure_info
    })
    if(insure_info=="1"){
      document.getElementById("Yes").classList.add("active")
      document.getElementById("No").classList.remove("active")
    }
    else if(insure_info=="0"){
      document.getElementById("No").classList.add("active")
      document.getElementById("Yes").classList.remove("active")
    }else{
      
    }

  }

  License=(license_info)=>{
    console.log(this.state.licence)
    this.setState({
      licence : license_info
    })
    if(license_info=="1"){
      document.getElementById("Yes_L").classList.add("active")
      document.getElementById("No_L").classList.remove("active")
    }
    else if(license_info=="0"){
      document.getElementById("No_L").classList.add("active")
      document.getElementById("Yes_L").classList.remove("active")
    }else{
      
    }

  }

  reset=()=>{
    window.location.reload();
  }
   

  //   console.log(obj)
    
    

  
  
  render() {
    return (
        <div body="pet-details-body">
       <div class="pet-det-head">
            {/* <div class="bk-btn">
             <img src="q-arrow.png" />
           </div> */}
           <h4>Add Pet Details</h4>
       </div>
       <div class="typeof-pet-list mr-b">
              <div class="typeof-pet-text" >
                <h5 class="h5">Select Pet</h5>
                <span onClick={this.reset}>Reset</span>
              </div>
              <div class="pet-imglist">
                  <div class="pet-img-item m-r" id='yes' onClick={()=>this.petInfo("yes")}>
                    <img src="sit-dog.png" />
                    <p>Dog</p>
                  </div>
                  {/* <div class="pet-img-item m-r"><img src="cat.png" /></div> */}
                  <div class="pet-img-item m-r" id='no' onClick={()=>this.petInfo("no")}>
                    <img src="slash.png" />
                    <p>No Pet</p>
                  </div>
              </div>
          </div>
       
          {/* <div class="pet-gender mr-b hp">
            <h5 class="h5">Do You Have A Pet</h5>
            <div class="pet-gender-list">
              <div style={{marginRight:"20px"}} class="list-item" id='yes' onClick={()=>this.petInfo("yes")}>
                
                Yes
              </div>
              <div class="list-item" id='no' onClick={()=>this.petInfo("no")}>
                
                No
              </div>
            </div>
          </div> */}


      
       
       <section class="typeof-pet" id="dog-form" style={{display : "block"}}>
         
          <div class="pet-name mr-b" >
              <h5 class="h5">Pet Name</h5>
              <div class="pet-name-input">
                  <input type="text"
                   placeholder="E.g. zora"
                   name='petname'
                   onChange={this.handleChange}
                   ></input>
              </div>
              <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.petname}</div>
          </div>
          <div class="pet-age-input">
                <h5 class="h5">Dog Breed</h5>
              <select onChange={this.handleChange} name="breed_type">
              
                   <option>Select Breed</option>
              {this.state.breeds && this.state.breeds.length>0 ? this.state.breeds.map((list,index)=>{
                  return(
                    <option value={list.id} key={index}>{list.title}</option>
                  )
              }): "" 
              }
              </select>  
              </div>    
              <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.breed_type}</div>
          <div class="pet-gender mr-b">
            <h5 class="h5">Gender</h5>
            <div class="pet-gender-list">
              <div style={{marginRight:"20px"}} class="list-item" id='Male' onClick={()=>this.Gender("Male")}>
                <img class="icon-o" src="male.png" />
                <img class="icon-w" src="male-w.png"  />
                Male
              </div>
              <div class="list-item" id='Female' onClick={()=>this.Gender("Female")}>
                <img class="icon-o" src="female.png" />
                <img class="icon-w" src="female-w.png" />
                Female
              </div>
            </div>
          </div>
          <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.gender}</div>
          <div class="pet-age">
            {/* <h5 class="h5">Age</h5> */}
            {/* <div class="pet-age-img-list">
                <div class="pet-age-img-item" id='upto 6m' onClick={()=>this.Age("upto 6m")}>
                  <img src="dog-1.png" />
                  <p>Upto 6m</p>
                </div>
                <div class="pet-age-img-item" id='upto 14m' onClick={()=>this.Age("upto 14m")}>
                  <img src="dog-2.png" />
                  <p>7-14m</p>
                </div>
                <div class="pet-age-img-item" id='upto 3y' onClick={()=>this.Age("upto 3y")}>
                  <img src="dog-3.png" />
                  <p>15m-3y</p>
                </div>
            </div> */}
            {/* <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.age}</div> */}
            <div class="pet-age-input">
             <h5 class="h5">Date of Birth</h5>

               <input class="date"
                type="date" 
                placeholder="Date of Birth"
                name='dob'
                onChange={this.handleChange}
                style={{border : "1px solid #f6c39b"}}
                ></input>
                <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.dob}</div>
                <div class="pet-gender mr-b">
            <h5 class="h5">Is Your Pet Insured? </h5>
            <div class="pet-gender-list">
              <div class="list-item" id='Yes' onClick={()=>{this.Insurance("1")}}>
                Yes
              </div>
              <div class="list-item" id='No' onClick={()=>{this.Insurance("0")}} >
                No
              </div>
            </div>
          </div>
          <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.insurance}</div>
          <div class="pet-gender mr-b">
            <h5 class="h5">Is Your Pet Licensed? </h5>
            <div class="pet-gender-list">
              <div class="list-item" id='Yes_L'  onChange={this.handleChange} onClick={()=>{this.License("1")}}>
                Yes
              </div>
              <div class="list-item" id='No_L'  onChange={this.handleChange} onClick={()=>{this.License("0")}}>
                No
              </div>
            </div>
          </div>
          <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.licence}</div>
            </div>
        </div>
       
        <div class="pet-agresion">
             <h5 class="h5">Pet's Aggression level ?</h5>
             <div class="pet-agresion-list">
                  <div class="agresion-list-item" id='Low' onClick={()=>this.Aggression("Low")}>Normal</div>
                  <div class="agresion-list-item" id='Medium' onClick={()=>this.Aggression("Medium")}>Slightly</div>
                  <div class="agresion-list-item" id='High' onClick={()=>this.Aggression("High")}>High</div>
             </div>
        </div>
        <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.aggression}</div>
        
        <div class="pet-age-input">
        <h5 class="h5">Last Vaccination</h5>
                  <input class="date vacc"
                  style={{border : "1px solid #f6c39b"}}
                  type="date" 
                  placeholder="Vaccination Date"
                  name='vaccination'
                  onChange={this.handleChange}
                  ></input>
                <div style={{margin: '1px', color: 'red', fontSize: '14px', bottom: '3px'}}>{this.state.input_error.vaccination}</div>
        </div>
        <div class="submit-button">
            <button onClick={this.SubmitDogForm}>Submit</button>
        </div>
       </section>

       <DarkBackground disappear={this.state.loading}>
            <LoadingOverlay
              active={true}
              spinner={true}
              text="Please Wait..."
            >
            </LoadingOverlay>
          </DarkBackground>
    </div>
    )
  }
}

export default CreateDogForm