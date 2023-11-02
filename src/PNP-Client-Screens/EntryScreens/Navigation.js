import React, { Component } from 'react'
import '../CSS/EntryCSS/Navigation.css'

let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));

export class Navigation extends React.PureComponent {
  constructor(props){
    super(props);
  }
  state = {
    pf_pic : userData.profile_pic,
  }

  componentDidMount = () =>{
    if(!userData.profile_pic){
      this.setState({
        pf_pic : "pf-icon.png"
      })
    }
    else{
      this.setState({
        pf_pic : userData.profile_pic,
      })
    }
  }

  profile=()=>{
  //  this.props.history.push({
  //   pathname : "/myprofile"
  //  })
   window.open("#/myprofile", "_self");
  }
  
  render() {
    return (
      <div class="f-menu">
        <div class="m-ordr-sumry-sec">
          <div class="side-menu">
            <span onClick={this.props.closeMenu}><img src="menu-close.png"/></span>
            <div class="m-prfl-edit">
              <div class="m-prfl-img">
                <img src={this.state.pf_pic}/>
              </div>
              <div class="m-prfl-cnt">
                <h6>{userData.name}</h6>
                <p onClick={this.profile}>Edit</p>
              </div>
            </div>

            <div class="menu-list">
              <h5>Menu</h5>

              {/* <div class="menu-item">
                <div class="menu-item-lft">
                  <img src="history-time.png"/>
                </div>
                <span>History</span>
                <small>10</small>
              </div>
              <div class="menu-item">
                <div class="menu-item-lft">
                  <img src="blnc-icon.png"/>
                </div>
                <span>Balance</span>
              </div>
              <div class="menu-item">
                <div class="menu-item-lft">
                  <img src="referal-icon.png"/>
                </div>
                <span>Referal</span>
              </div>
              <div class="menu-item">
                <div class="menu-item-lft">
                  <img src="my-badge-icon.png"/>
                </div>
                <span>My Badges</span>
              </div>
              <div class="menu-item">
                <div class="menu-item-lft">
                  <img src="add-new-service-icon.png"/>
                </div>
                <span>Add New Services</span>
              </div>
              <div class="menu-item">
                <div class="menu-item-lft">
                  <img src="add-media-icon.png"/>
                </div>
                <span>Add Videos or Photos</span>
              </div>
              <div class="menu-item">
                <div class="menu-item-lft">
                  <img src="review-icon.png"/>
                </div>
                <span>My Reviews</span>
              </div> */}
              <div class="menu-item" onClick={this.props.logout}>
                <div class="menu-item-lft">
                  <img src="logout-icon.png"/>
                </div>
                <span onClick={this.props.logout}>Log out</span>
              </div>
            </div>

            <div class="menu-btm-logo">
              <img src="pnp-logo.png"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Navigation