import React, { Component } from 'react'
import '../CSS/EntryCSS/NotificationsData.css'
import Services from '../Services/Services';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from './DarkBackground';



let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));

export class NotificationsData extends React.PureComponent {
    constructor(props){
        super(props);
    }
    state = {
      notifications : [],
      notify_length:"",
      loading : false
    }

    componentDidMount=()=>{

      if(navigator.onLine){
          this.setState({
            loading : true,
          })
          const obj = {
            userId : userData.id,
            searchTrm : "ci"
          }
          Services.getInstance().NotificationsData(obj).then((result)=>{
            console.log(result)
            this.setState({
              notifications : result,
              loading : false,        
            })
            
          })

          const obj1 = {
            userId : userData.id,
          }
          Services.getInstance().ReadNotifications(obj1).then((result)=>{
            console.log(result);
          })
        }
        else{
          this.props.history.push({
            pathname : "/internet"
          })
        }
    }

    getDates(sp_date){
      const date2 = new Date();
      let data = new Date(sp_date.replace(/[-]/g,'/'))
      let date1 = new Date(Date.UTC(data.getFullYear(), data.getMonth(), data.getDate(), data.getHours(), data.getMinutes(), data.getSeconds()));
      let tmpdate = (date2.getTime() - date1.getTime()) / 1000;
      let returnTime = ''
      if (tmpdate < 60){
        returnTime = parseInt(tmpdate) + ' seconds ago'
      }
      else if (tmpdate < 3600){
        returnTime = parseInt(tmpdate/60) + ' minutes ago'

      }
      else if (tmpdate < 86400){
        returnTime = parseInt(tmpdate/3600) + ' hours ago'

      }
      else if (tmpdate < 2592000){
        returnTime = parseInt(tmpdate/86400) + ' days ago'

      }
      else if (tmpdate < 31536000){
        returnTime = parseInt(tmpdate/2592000) + ' months ago'

      }
      else if (tmpdate > 31536000){
        returnTime = parseInt(tmpdate/31536000) + ' years ago'

      }
      return returnTime
      // console.log(diffTime + " milliseconds");
      // console.log(diffDays + " days");
      // if(diffDays == 1){
      //   return "Today";
      // }
      // else if(diffDays > 1 && diffDays <= 2){
      //   return "Yesterday"
      // }
      // else if(diffDays < 30){
      //   return (diffDays-1) + " days ago";
      // }
      // else if(diffDays > 30){
      //   return "1 month ago"
      // }
      // else if(diffDays > 60){
      //   return "2 months ago"
      // }
      // else if(diffDays > 180){
      //   return "6 months ago"
      // }
      // else if(diffDays > 365){
      //   return "1 year ago"
      // }
    }





    goBack = () =>{
        this.props.history.push({
            pathname : "/homepage"
        })
    }


    redirectUser = (notification) =>{
      if(notification.rStatus == "open"){
          if(notification.notType == "quot_received" || notification.notType == "quot_edited"){
            const obj = {
              spId : notification.spId,
              bookingId : notification.quotId,
            }
            this.props.history.push({
              pathname : "/bookingconfirmation",
              quoteData : obj,
            })
          }
          else if(notification.notType == "pay_request" && notification.rStatus == "open"){
            const obj = {
              bookingId : notification.booking_id,
              serviceId  : notification.service_id
            }
            this.props.history.push({
              pathname : "/activeDetails",
              confirm_data : obj,
            })
          }
        }
          
        else{
            confirmAlert({
              title: '',
              message: "Booking has been done for this requirement",
              buttons: [
                {
                  label: 'Ok',
                  onClick: () => {}
                },
              ]
            });
          }
          
          
    }





  render() {
    return (
        <div id="wrapper">
        <div class="ntfn-main">
          <div class="ntfn-hd">
            <h4>Notifications </h4>
            <img src="q-arrow.png" onClick={this.goBack}/>
          </div>
          {this.state.notifications && this.state.notifications.length > 0 ? this.state.notifications.map((notify, index)=>{
            return(
              <div class="ntfn-item" onClick={()=>this.redirectUser(notify)}>
              <div class="ntfn-bell">
                <img src="b-ntfn-icon.png" />
              </div>
              <div class="ntfn-cnt">
                <h6>{notify.title}</h6>
                <p>{notify.description}</p>
              </div>
              <div class="ntfn-tm">
              <p>{this.getDates(notify.date_created)}</p>
              </div>
            </div>
            )
          }) 
          
          : 
          
          <div class="no-ntfn">
                <img src='no-ntfn-icon.png'/>
                <h5>No notifications yet</h5>
                <p>You have no notifications right now</p>
            </div>
          }


        </div>
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

export default NotificationsData