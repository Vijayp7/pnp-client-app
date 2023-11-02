import React, { Component } from 'react'
import '../CSS/EntryCSS/Splash.css'
import { motion } from 'framer-motion';
import Services from '../Services/Services';

let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));

export class SplashScreen extends React.PureComponent {
    constructor(props){
        super(props);
    }
    state = {

    }
    componentDidMount = () =>{
      if(navigator.onLine){
        const timeout = setTimeout(() => {
            if(!userData){
                this.props.history.push({
                    pathname : "/boardingentry"
                })
            }
            else{
              const obj3={
                clientId : userData.id,
              }
              Services.getInstance().getCIWalletAmount(obj3).then((result)=>{
                if(result.notifi >=1){
                  this.props.history.push({
                    pathname : "/notifications-page"
                })
                }
                else{
                    this.props.history.push({
                      pathname : "/homepage"
                  })
                }
              })
            }
        }, 3000);
      }
      else{
        this.props.history.push({
          pathname : "/internet"
        })
      }
    }


  render() {
    return (
        <div class="enter-page">
        <motion.div 
          animate={{ y: 300, scale: 1}} 
          initial={{scale: 0}}
        //   animate={{ y: 300, scale: 1, x: [-200, 100, 0] }}
          transition = {{type: "tween", duration: 2}} 
          >
          <div class="enter-page-logo">
            <img src="pnp-logo.png" alt="logo" />
          </div>
        </motion.div>
        </div>
    )
  }
}

export default SplashScreen