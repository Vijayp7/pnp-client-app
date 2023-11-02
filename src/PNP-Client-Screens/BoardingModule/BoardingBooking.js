import React, { Component } from 'react'
import Services from '../Services/Services';
import LoadingSymbol from '../EntryScreens/LoadingSymbol';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 



let today = new Date();
const defaultValue = {
    year: today.getFullYear(),
    month: today.getMonth()+1,
    day: today.getDate(),
  }
//const userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));

let Dogs_List = [
  {
    id: 0,
    dog_name: "Dog 1",
    from_date: "",
    to_date: "",
    gender: "",
    dog_age: "",
    dog_size: "",
    temparament: "",
    message: "",  
    dog_breed: "",
    dog_obedience: "",
    }];

    

export class BoardingBooking extends Component {

    constructor(props) {
        super(props)

        this.state = {
        options: [],
        //userData: userData,
        final_Dogs_List: Dogs_List,
        defaultValue: defaultValue,
        error_message: "",
        loading: false,
        form_type: this.props.location.form_type,
        form_bg_color: this.props.location.form_bg_color || "#57d0ef",
        }
    }

    componentDidMount () {
      // let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));        
        Services.getInstance().getDogBreeds().then((result)=>{
            console.log(result);
            if(result.status === true) {
                this.setState({
                    options: result.data,
                    //userData: userData,
                })
            }
            else {
                //
            }
        })
    }

    add_More_Dogs = () =>{
      Dogs_List.push({
        id: (Dogs_List.length),
        dog_name: "Dog "+((Dogs_List.length)+1),
        from_date: "",
        to_date: "",
        gender: "",
        dog_age: "",
        dog_size: "",
        temparament: "",
        message: "",  
        dog_breed: "",
      })
      this.setState({
        Dogs_List: Dogs_List
      })
      // console.log(Dogs_List)
    }

    
   
    selected_Breed = (list) =>{
        let e = document.getElementById("elementId");
        let value = e.options[e.selectedIndex].value;
        let text = e.options[e.selectedIndex].text;

        let Dogs_list = Dogs_List;
        Dogs_List.map((s,index)=>{
          if(s.id === list.id){
          s.dog_breed = value
          } 
        })
        this.setState({
          final_Dogs_List: Dogs_List,
          clicked: list.id
        })
        // console.log(this.state.final_Dogs_List);
    }

    selected_Obidience = (list) =>{
      let e = document.getElementById("obd");
      let value = e.options[e.selectedIndex].value;
      let text = e.options[e.selectedIndex].text;

      let Dogs_list = Dogs_List;
      Dogs_List.map((s,index)=>{
        if(s.id === list.id){
        s.dog_obedience = value
        } 
      })
      this.setState({
        final_Dogs_List: Dogs_List,
        clicked: list.id
      })
      console.log(this.state.final_Dogs_List);
  }

    handleNameChange = (e, list) => {
      e.preventDefault();
      const { name, value } = e.target;

      let Dogs_list = Dogs_List;
      Dogs_List.map((s,index)=>{
      if(s.id === list.id){
       s.dog_name = value
      } 
      })
      this.setState({
        final_Dogs_List: Dogs_List,
      })
      // console.log(this.state.final_Dogs_List);
    
  };

    
    get_From_Date = (defaultValue, list) =>{
      let Dogs_list = Dogs_List;
      Dogs_List.map((s,index)=>{
      if(s.id === list.id){
       s.from_date = new Date(defaultValue).toISOString().split('T')[0]
      } 
      })
      this.setState({
        final_Dogs_List: Dogs_List,
      })
      // console.log(this.state.final_Dogs_List);


    }

    get_To_Date = (defaultValue, list) =>{
      let Dogs_list = Dogs_List;
      Dogs_List.map((s,index)=>{
      if(s.id === list.id){
       s.to_date = new Date(defaultValue).toISOString().split('T')[0]
      } 
      })
      this.setState({
        final_Dogs_List: Dogs_List,
      })
      // console.log(this.state.final_Dogs_List);
  }

  dogMale = (list) =>{
    let Dogs_list = Dogs_List;
    Dogs_List.map((s,index)=>{
      if(s.id === list.id){
       s.gender = "Male"
      } 
    })
    this.setState({
      final_Dogs_List: Dogs_List,
    })
    // console.log(this.state.final_Dogs_List);


  }

  dogFeMale = (list) =>{
    let Dogs_list = Dogs_List;
    Dogs_List.map((s,index)=>{
      if(s.id === list.id){
       s.gender = "Female"
      }
      
    })
    this.setState({
      final_Dogs_List: Dogs_List,
      clicked: list.id
    })
    // console.log(this.state.final_Dogs_List);
  }

  ageUpto_6_months = (list) =>{
    let Dogs_list = Dogs_List;
    Dogs_List.map((s,index)=>{
      if(s.id === list.id){
       s.dog_age = "1"
      } 
    })
    this.setState({
      final_Dogs_List: Dogs_List,
    })
    // console.log(this.state.final_Dogs_List);
  }

  age_6to8_months = (list) =>{
    let Dogs_list = Dogs_List;
    Dogs_List.map((s,index)=>{
      if(s.id === list.id){
       s.dog_age = "2"
      } 
    })
    this.setState({
      final_Dogs_List: Dogs_List,
    })
    // console.log(this.state.final_Dogs_List);
  }

  ageUpto_Adult = (list) =>{
    let Dogs_list = Dogs_List;
    Dogs_List.map((s,index)=>{
      if(s.id === list.id){
       s.dog_age = "3"
      } 
    })
    this.setState({
      final_Dogs_List: Dogs_List,
    })
    // console.log(this.state.final_Dogs_List);
  }

  ageUpto_Senior = (list) =>{
    let Dogs_list = Dogs_List;
    Dogs_List.map((s,index)=>{
      if(s.id === list.id){
       s.dog_age = "4"
      } 
    })
    this.setState({
      final_Dogs_List: Dogs_List,
    })
    // console.log(this.state.final_Dogs_List);
  }

  small_Size = (list) =>{
    let Dogs_list = Dogs_List;
    Dogs_List.map((s,index)=>{
      if(s.id === list.id){
       s.dog_size = "Small"
      } 
    })
    this.setState({
      final_Dogs_List: Dogs_List,
    })
    // console.log(this.state.final_Dogs_List);
  }

  medium_Size = (list) =>{
    let Dogs_list = Dogs_List;
    Dogs_List.map((s,index)=>{
      if(s.id === list.id){
       s.dog_size = "Medium"
      } 
    })
    this.setState({
      final_Dogs_List: Dogs_List,
    })
    // console.log(this.state.final_Dogs_List);
  }

  large_Size = (list) =>{
    let Dogs_list = Dogs_List;
    Dogs_List.map((s,index)=>{
      if(s.id === list.id){
       s.dog_size = "Large"
      } 
    })
    this.setState({
      final_Dogs_List: Dogs_List,
    })
    // console.log(this.state.final_Dogs_List);
  }

  yes_Temperment = (list) =>{
    let Dogs_list = Dogs_List;
    Dogs_List.map((s,index)=>{
      if(s.id === list.id){
       s.temparament = "Yes"
      } 
    })
    this.setState({
      final_Dogs_List: Dogs_List,
    })
    // console.log(this.state.final_Dogs_List);
    
  }

  no_Temperment = (list) =>{
    let Dogs_list = Dogs_List;
    Dogs_List.map((s,index)=>{
      if(s.id === list.id){
       s.temparament = "No"
      } 
    })
    this.setState({
      final_Dogs_List: Dogs_List,
    })
    // console.log(this.state.final_Dogs_List);
  }

  handleMessageChange = (e, list) => {
    e.preventDefault();
    const { name, value } = e.target;

    let Dogs_list = Dogs_List;
    Dogs_List.map((s,index)=>{
    if(s.id === list.id){
     s.message = value
    } 
    })
    this.setState({
      final_Dogs_List: Dogs_List,
    })
    
  
  };

  onSubmit = () =>{
    this.setState({
      loading: true,
    })
    const obj = [];
    for(let i=0; i < this.state.final_Dogs_List.length; i++){
      obj.push(
        {
          //customer_id: userData.id,
          dog_name : this.state.final_Dogs_List[i].dog_name,
          from_date : this.state.final_Dogs_List[i].from_date,
          to_date : this.state.final_Dogs_List[i].to_date,
          gender : this.state.final_Dogs_List[i].gender,
          dog_age : this.state.final_Dogs_List[i].dog_age,
          dog_breed : this.state.final_Dogs_List[i].dog_breed,
          dog_size : this.state.final_Dogs_List[i].dog_size,
          temparament : this.state.final_Dogs_List[i].temparament,
          message : this.state.final_Dogs_List[i].message,
        }
        
      )
    }
    // console.log(obj);

    for(let i=0; i<obj.length; i++){
          if(obj[i].dog_name === "") {
            this.setState({
              loading: false,
            })
            confirmAlert({
              title: "Name is required for Dog" + [i+1],
              message: '',
              buttons: []
          });

          }
          else if(obj[i].from_date === "") {
            this.setState({
              loading: false,
            })
            confirmAlert({
              title: "From date is required for " + obj[i].dog_name,
              message: '',
              buttons: []
          });
          }
          else if(obj[i].to_date === "") {
            this.setState({
              loading: false,
            })
            confirmAlert({
              title: "To date is required for " + obj[i].dog_name,
              message: '',
              buttons: []
          });
          }
          else if(obj[i].gender === "") {
            this.setState({
              loading: false,
            })
            confirmAlert({
              title: "Gender is required for  " + obj[i].dog_name,
              message: '',
              buttons: []
          });
          }
          else if(obj[i].dog_age === "") {
            this.setState({
              loading: false,
            })
            confirmAlert({
              title: "Age is required for  " + obj[i].dog_name,
              message: '',
              buttons: []
          });
          }
          else if(obj[i].dog_breed === "") {
            this.setState({
              loading: false,
            })
            confirmAlert({
              title: "Breed type is required for  " + obj[i].dog_name,
              message: '',
              buttons: []
          });
          }
          else if(obj[i].dog_size === "") {
            this.setState({
              loading: false,
            })
            confirmAlert({
              title: "size is required for  " + obj[i].dog_name,
              message: '',
              buttons: []
          });
          }
          else if(obj[i].temparament === "") {
            this.setState({
              loading: false,
            })
            confirmAlert({
              title: "Temperment is required for  " + obj[i].dog_name,
              message: '',
              buttons: []
          });
          }

          else{
              Services.getInstance().boardingBooking(obj).then((result)=>{
                // console.log(result);
                if(result.status === true){
                  this.setState({
                    loading: false,
                  })
                  confirmAlert({
                    title: result.msg,
                    message: '',
                    buttons: [
                      {
                        label: 'Ok',
                        onClick: () => {
                          window.location.reload();
                        }
                      }
                    ]
                });
              }
              else{
                this.setState({
                  loading: false,
                })
                confirmAlert({
                  title: result.msg,
                  message: '',
                  buttons: [
                    {
                      label: 'Ok',
                      onClick: () => {
                        //
                      }
                    }
                  ]
              });
              }
            })
          }
    }
}


  render() {
    const { values, handleChange } = this.props; 
    return (
     
      <div class="board-pnp">
        <div class="board-header" style={{ backgroundColor: this.state.form_bg_color}}>
        </div>
        <div class="board-middle-sec">
          <div class="board-nav-btns">
            <img src="close-icon2.png" alt="img" 
                style={{width:"22px", height:"22px"}} 
                onClick={()=>
                  this.props.history.push({
                    pathname:'/homepage'
                })
                }/>
            <img src="re-load.png" alt="img" style={{width:"20px", height:"26px"}} onClick={()=>window.location.reload()}/>
          </div>
          <div class="type-breed">
            <h6>Book Your {this.state.form_type} Service</h6>
            <ul>
              {this.state.final_Dogs_List && this.state.final_Dogs_List.length >0 ? this.state.final_Dogs_List.map((listA, index)=>{

                return (
                  <li class="active" key={index} style={{backgroundColor: this.state.form_bg_color}}>
                  <p>{listA.dog_name}</p>
                  </li>
                )
              }) : "" }
              
              <li>
                 <p onClick={this.add_More_Dogs}>Add More +</p>
              </li>
            </ul>
          </div>

          {this.state.final_Dogs_List && this.state.final_Dogs_List.length >0 ? this.state.final_Dogs_List.map((list, index)=>{

          return (

              <div key={index}>
              <div className='board-sep-section'>
                <input
                type="text"
                name = "dog_name"
                placeholder='Enter Dog Name'
                onChange={(e)=>this.handleNameChange(e, list)}                 />
              </div>
              <div class="board-date">
                {/* <div class="reverse-icon">
                  <img src="reverse.png" />
                </div> */}

                <div class="start-date">
                  <span>Start Date</span>
                  <div>
                  <img src="calender.png" />
                    <DatePicker className='react-datepicker__input-container'
                      value={list.from_date}
                      onChange={(date) => this.get_From_Date(date, list)} />
                  </div>
                </div>

                <div class="end-date" >
                  <span>End Date</span>
                  <div>
                    <img src="calender.png" />
                    <DatePicker className='react-datepicker__input-container'
                      value={list.to_date}
                      onChange={(date) => this.get_To_Date(date, list)} />
                  </div>
                </div>
              </div>
              
              <div class="select-gender">
                <span>Gender</span>
                <div class="gender-otp">
                  <div class="gender">
                    <div onClick={()=>this.dogMale(list)} style={{backgroundColor: (list.gender == "Male") ? this.state.form_bg_color : ""}}>
                      <img src="board-pup1.png" />
                      <p>Male</p>
                    </div>
                  </div>
                  <div class="gender">
                    <div onClick={()=>this.dogFeMale(list)} style={{backgroundColor: (list.gender == "Female") ? this.state.form_bg_color : ""}}>
                      <img src="board-pup2.png" />
                      <p>Female</p>
                    </div>
                  </div>
                </div>
              </div>
              { this.state.loading === true ? <LoadingSymbol /> : "" }
              <div class="select-Age">
                <span>Age Of Your Dog</span>
                <div class="age-otp">
                  <div class="age-cord">
                    <div onClick={()=>this.ageUpto_6_months(list)} style={{backgroundColor: (list.dog_age == "1") ? this.state.form_bg_color : ""}}>
                      <img src="board-pup3.png" />
                      <p>Puppyhood  <span>Upto 6 months</span></p>
                    </div>
                  </div>
                  <div class="age-cord">
                    <div onClick={()=>this.age_6to8_months(list)} style={{backgroundColor: (list.dog_age == "2") ? this.state.form_bg_color : ""}}>
                      <img src="board-pup4.png" />
                      <p>Adolescenes <span>6-8 months</span></p>
                    </div>
                  </div>
                  <div class="age-cord">
                    <div onClick={()=>this.ageUpto_Adult(list)} style={{backgroundColor: (list.dog_age == "3") ? this.state.form_bg_color : ""}}>
                      <img src="board-pup5.png" />
                      <p>Adulthood <span>1.5-3 years</span></p>
                    </div>
                  </div>
                  <div class="age-cord">
                    <div onClick={()=>this.ageUpto_Senior(list)} style={{backgroundColor: (list.dog_age == "4") ? this.state.form_bg_color : ""}}> 
                      <img src="board-pup6.png" />
                      <p>Senior <span>3 years or more</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="select-breed">
                <span>Breed Of Your Dog</span>
                <div class="breed-otp">
                <select 
                id='elementId' 
                onChange={()=>this.selected_Breed(list)} 
                name="breedtype" >
                { this.state.options && this.state.options.length > 0 ? this.state.options.map((op, index)=>{
                            return(
                                <option
                                key={index} 
                                value={op.id} 
                                style={{color: "black"}} 
                                > {op.title}
                                </option>
                            ) 
                }) : ""}
                
                  </select>
                </div>
              </div>
              <div class="size-breed">
                <span>Size of your Dog</span>
                <ul>
                  <li onClick={()=>this.small_Size(list)} style={{backgroundColor: (list.dog_size == "Small") ? this.state.form_bg_color : ""}}>
                    <p>Small</p>
                  </li>
                  <li onClick={()=>this.medium_Size(list)} style={{backgroundColor: (list.dog_size == "Medium") ? this.state.form_bg_color : ""}}>
                    <p>Medium</p>
                  </li>
                  <li onClick={()=>this.large_Size(list)} style={{backgroundColor: (list.dog_size == "Large") ? this.state.form_bg_color : ""}}>
                    <p>Large</p>
                  </li>
                </ul>
              </div>
              <div class="temperment-breed">
                <span>Temperment</span>
                <ul>
                  <li onClick={()=>this.yes_Temperment(list)} style={{backgroundColor: (list.temparament == "Yes") ? this.state.form_bg_color : ""}}>
                    <p>Yes</p>
                  </li>
                  <li onClick={()=>this.no_Temperment(list)} style={{backgroundColor: (list.temparament == "No") ? this.state.form_bg_color : ""}}>
                    <p>NO</p>
                  </li>
                  <li></li>
                </ul>
              </div>

                <div class="slct-trng" style={{display: this.state.form_type == "Training" ? "flex" : "none"}}>
                  <div class="breed-otp">
                    <select 
                      id='obd' 
                      onChange={()=>this.selected_Obidience(list)} 
                      name="dog_obedience">
                      <option>Dog obedience</option>
                      <option>two</option>
                      <option>three</option>
                      <option>four</option>
                    </select>
                  </div>
                  <div class="sugst-t">
                    <p>Suggest Training</p>
                  </div>
              </div>

              <div class="msg-breed">
                <span>Message</span>
                <textarea
                  name = "message"
                  onChange={(e)=>this.handleMessageChange(e, list)} >
                  </textarea>
              </div>
              <div style = {{backgroundColor: "red"}}></div>
              </div>

              )
              }) : "" }




              <button className='board-sub-btn' onClick={this.onSubmit} style={{backgroundColor: this.state.form_bg_color}}>Submit</button>
        </div> 

      </div>




   
    )
  }
}

export default BoardingBooking