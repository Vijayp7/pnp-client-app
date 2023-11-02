import React, { Component } from 'react'
import '../CSS/EntryCSS/Wallet.css'
import Services from '../Services/Services';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from './DarkBackground';


let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));

export class Wallet extends React.PureComponent {
  constructor(props){
    super(props);
  }

  state = {
    wallet : {},
    loading : true,
  }

  home = () =>{
    this.props.history.push({
      pathname : "/homepage"
    })
  }


  componentDidMount = () =>{

    if(navigator.onLine){
        this.setState({
          loading : true,
        })
        const obj = {
          userId: userData.id,
          status : "0"
        }
        Services.getInstance().Wallet(obj).then((result)=>{
          this.setState({
            wallet : result,
            loading : false
          })
        })
    }
    else{
      this.props.history.push({
        pathname : "/internet"
      })
    }


  }
  render() {
    return (
        <div class="my-wallet-main">
      <div class="srvc-dtls-hd">
          <h4>My Wallet</h4>
          <div class="srvc-dtls-bck go-home" onClick={this.home}>
            <img src="srvc-dtls-bck-icon.png" />
          </div>
      </div>
      <div class="wallet-main">
        <div class="wallet-bg">
          <div class="wallet-list">
            <div class="wallet-item full">
              <div class="wallet-item-lft">
                <img src="rq-amt-icon.png"/>
              </div>
              <div class="wallet-item-rht">
                <p>Wallet Balance Amount</p>
                <span>RS {this.state.wallet.walletAmount}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="wallet-table">
          
          <div class="wallet-table-hd">
            <span>Pet Master</span>
            <span>Service</span>
            <span>Amount</span>
            <span>Date</span>
          </div>
          {this.state.wallet.tmpTran && this.state.wallet.tmpTran.length > 0 ? this.state.wallet.tmpTran.map((tnx,index)=>{
            return(
              <div class="wallet-table-row">
              <p>{tnx.spname}</p>
              <p>{tnx.service}</p>
              {tnx.status == "0" ? 
                <p class="amt-rg"> +{tnx.amount}/-</p>
                :
                tnx.status == "1" ?
                <p class="amt-rg" style={{color : "red"}}> -{tnx.amount}/-</p>
                :
                tnx.status == "2" ?
                <p class="amt-rg" style={{color : "red"}}> -{tnx.amount}/-</p>
                :
                ""
            }
              
              {tnx.status == "0" ? <p>-</p> :
              tnx.status == "1" ?
              <p class="amt-r" ><small style={{color : "red"}}>{tnx.rdata}</small></p>
               :
               tnx.status == "2" ?
              <p class="amt-r" ><small style={{color : "red"}}>{tnx.rdata}</small></p>
              :
               "" 
              }
            </div>
            )
          }) : ""}
        </div>

        <div class="w-rupee">
          <img src="w-rupee-icon.png"/>
        </div>

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

export default Wallet