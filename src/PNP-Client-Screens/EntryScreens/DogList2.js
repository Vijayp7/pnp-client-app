import React, { Component } from 'react'
import '../CSS/EntryCSS/DogsList.css'
import Services from '../Services/Services';


let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));


export class DogsList extends React.PureComponent {
  constructor(props){
    super(props);
  }
  state={
    userdogs : [],
    checkbox1: false,
    user_checked_input : "",
    
  }

  componentDidMount=()=>{
      const obj1={
        customer_id : userData.id,
       }
      Services.getInstance().PetList(obj1).then((result)=>{
        if(result.status === true) {
          if(result.data.length > 0){
            this.setState({
              userdogs : result.data
            },()=>{
              setTimeout(function() {
                // this.props.DogInfo(result.data[0],result.data[0].id)
              },1500)
            })
          } 
        }
        else if(result.status === false){
          this.setState({
            error_messgae: result.msg,
          })
        }
      })
  }


  dogForm=()=>{
   window.open("#/create-dog-form","_self");
  }


  render() {
    return (
        <div class="pet-pd-head-img">
        {this.state.userdogs && this.state.userdogs.length>0 ? this.state.userdogs.map((dogdata,index)=>{
            return(
              <div class="pet-head-list-item" key={index}>

{/* <input type="radio" 
				 id="Day1"
				  name="Service_time" 
				  value="Day" 
				  onChange={this.handleChange}/> */}
              <input
              type="radio"
              id={dogdata.id}
              value='dog_chk'
              name="dog"
              onChange={this.props.handleDogChange}
              onClick={()=>this.props.DogInfo(dogdata,dogdata.id)}
              ></input>
              <label for={dogdata.id}></label>
              <span class="checkmark"></span>
              <div class="pet-wl-list-img">
                <img src="dog.png"/>
              </div>
              <p>{dogdata.pet_name}</p>
          </div>
            )
        }) : ""
      }
               
                <div  class="pet-head-list-item" >
                  <div class="pet-wl-list-img2" onClick={this.dogForm}>
                    <img src="plus2.png"/>
                  </div>
                </div>
            </div>
    )
  }
}

export default DogsList