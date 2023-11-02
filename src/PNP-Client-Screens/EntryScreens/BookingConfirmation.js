import React, { Component } from 'react'
import '../CSS/EntryCSS/BookingConfirmation.css'
import Services from '../Services/Services';
import LoadingOverlay from "react-loading-overlay";
import DarkBackground from './DarkBackground';


let userData = JSON.parse(localStorage.getItem(`PNP-Client-userData`));
let Bookingdata = JSON.parse(localStorage.getItem(`PNP-Booking-Data`));


export class BookingConfirmation extends React.PureComponent {
    constructor(props){
      super(props);
    }

    state = {
      quoteData : this.props.location.quoteData,
      packItems : [],
      addOn : [],
      booking_confirm_previewData : {},
      total_price : "",
      actualPrice : "",
      extraPrice : "",
      final_price : 0,
      host : "",
      new_pay_obj : {},
      isAdoons : "true",
      discount : 0,
      fx : 0,
      loading : false
    }

    componentDidMount = () =>{

      if(navigator.onLine){
          this.setState({
            loading : true
          })
          this.setState({
            host : window.location.origin
          })
          console.log(this.state.quoteData);

          if(this.state.quoteData != undefined){
            console.log("yyyyy")
            const obj = {
              userId : userData.id,
              spId : this.state.quoteData.spId,
              bookingId : this.state.quoteData.bookingId,
            }
            Services.getInstance().bookingConfirmation(obj).then((result)=>{
              
              this.setState({
                booking_confirm_previewData : result,
                packItems : result.packItm,
                addOn : result.addOn,
                total_price : result.totalPrice,
                actualPrice : result.actualPrice,
                extraPrice : result.extraPrice,
                final_price : result.totalPrice,
                discount : result.discount,
                loading : false
              }, ()=>{
                this.setState({
                  final_price : (Number(this.state.booking_confirm_previewData.totalPrice)) + ((Number(this.state.booking_confirm_previewData.totalPrice))*5/100),
                })
              })
            })
          }
          else{
            console.log("hfhhf")
            this.setState({
              quoteData : Bookingdata
            },()=>{
              const obj = {
                userId : userData.id,
                spId : this.state.quoteData.spId,
                bookingId : this.state.quoteData.bookingId,
              }
              Services.getInstance().bookingConfirmation(obj).then((result)=>{
                
                this.setState({
                  booking_confirm_previewData : result,
                  packItems : result.packItm,
                  addOn : result.addOn,
                  total_price : result.totalPrice,
                  actualPrice : result.actualPrice,
                  extraPrice : result.extraPrice,
                  final_price : result.totalPrice,
                  discount : result.discount,
                  loading : false
                }, ()=>{
                  this.setState({
                    final_price : (Number(this.state.booking_confirm_previewData.totalPrice)) + ((Number(this.state.booking_confirm_previewData.totalPrice))*5/100),
                  })
                })
              })
            })
          }
      }
      else{
        this.props.history.push({
          pathname : "/internet"
        })
      }




    }


    handleChange = e=>{
      const {name,value}= e.target;
      this.setState({
        [name]:value
      }
       ,()=>{console.log(this.state)}
      );
    }

    changeAddOnPrice = (id) =>{
      if(document.getElementById(id).checked === true){
        this.setState({
          final_price : (Number(this.state.booking_confirm_previewData.totalPrice)) + ((Number(this.state.booking_confirm_previewData.totalPrice))*5/100),
          isAdoons : "true"
        })
      }else{
        this.setState({
          isAdoons : "false",
          final_price :   (((Number(this.state.booking_confirm_previewData.actualPrice)) - (((Number(this.state.booking_confirm_previewData.actualPrice))*Number(this.state.discount))/100)) + (((((Number(this.state.booking_confirm_previewData.actualPrice)) - (((Number(this.state.booking_confirm_previewData.actualPrice))*Number(this.state.discount))/100)))*5)/100)).toFixed(2)
        })     
      }
    }


    MakePayment = () =>{
      document.getElementById("py").style.display = "block";
    }

    goBack=()=>{
        this.props.history.push({
            pathname : "/homepage"
          })
    }

    MoveToBookings = () =>{
      const timeout = setTimeout(() => {
        this.props.history.push({
          pathname : "/homepage"
        })
      }, 5000)
     
    }

    getUpdate = () =>{
      this.setState({
        loading : true
      })
      const obj ={
        userId: userData.id,
        spId: this.state.booking_confirm_previewData.spId,
        bookingId:this.state.booking_confirm_previewData.bookingId,
        quotId:this.state.booking_confirm_previewData.quotId,
        isAdoons:this.state.isAdoons,
      }
      console.log(obj);
      Services.getInstance().createPayment(obj).then((result)=>{
        console.log(result);
        this.setState({
          new_pay_obj : result
        }, ()=>{
          var form = document.getElementById("my_form");
          form.submit();
          this.setState({
            loading : false
          })
          const timeout = setTimeout(() => {
            this.props.history.push({
              pathname : "/homepage"
            })
          }, 5000)
        })
      })
    }

  


  render() {
    // console.log(this.state.quoteData);
    return (
      <div>
        <div class="quotation-n-main">
          <div class="quotation-n-hd">
            <h4>Booking Details</h4>
            <img src="q-arrow.png" onClick={this.goBack}/>
          </div>

          <div class="srvc-prvdr">
              <div class="profile-id mq">
                <div class="profile-id-lft">
                  <div class="profile-id-img">
                    <img src={this.state.booking_confirm_previewData.photo} alt=""/>
                  </div>
                  <div class="profile-id-info">
                    <h4>{this.state.booking_confirm_previewData.firstName + " " + this.state.booking_confirm_previewData.lastName}</h4>
                    <span>
                      <img src="booking-done.png"/>
                      <p> {this.state.booking_confirm_previewData.jobsComple} Booking Completed</p>
                    </span>
                  </div>
                </div>
                <div class="profile-id-rht">
                  <span>
                    <img src="star-silver.png" alt=""/>
                    <p>{this.state.booking_confirm_previewData.avgRat}</p>
                  </span>
                  
                </div>
                
              </div>
              <div class="secure">
                    <img src="pnp-vrfd-strip.png" alt=""/>
              </div>



          </div>

          <div class="client-q-info">
            <div class="client-package">
              <div>
                <img src="mq-star-icon.png" alt="img"/>
              </div>
              <strong>Package</strong>
            </div>
            <div class="client-pricing">
              <strong><i class="fa-solid fa fa-check"></i>{this.state.booking_confirm_previewData.packname} Cost</strong>
              <p>{this.state.booking_confirm_previewData.actualPrice}/-
                {this.state.booking_confirm_previewData.packname == "Monthly Package" ||
                  this.state.booking_confirm_previewData.packname == "PerDay Package" ?
                  <span>Per Walk</span>
                  :
                  ""
                  // <span>Per Day</span>
                }
                </p>
            </div>

            {this.state.packItems.length > 0 ?
            <div class="client-pack-type trainy-pack-types">
              {this.state.packItems.length > 0 ?
                this.state.packItems.map(str => {
                  return(
                    <p><i class="fa-solid fa fa-check"></i> <span>{str}</span></p>
                  )
                }) 
               : "" } 
  
            </div>
            : ""}
            <div style={{border: "1px dashed #ece5db" ,margin: "25px 0 20px"}}></div>

            {this.state.addOn.length > 0 ?
            <div>
            <div class="client-pricing">
              <div class="clp-check active">
                <input 
                  type="checkbox" 
                  id="day1"
                  value = "day1"
                  defaultChecked={true}
                  onChange={this.handleChange}
                  onClick={()=>this.changeAddOnPrice("day1")}
                  />
                <label for="day1">Add-Ons</label>
              </div>
              <p>{this.state.booking_confirm_previewData.extraPrice}/-
                {/* <span>6 session</span>  */}
                </p>
            </div> 
            <div class="client-pack-type">

            {this.state.addOn.length > 0 ?
                this.state.addOn.map(str => {
                  return(
                    <p><i class="fa-solid fa fa-check"></i> <span>{str}</span></p>
                    )
                }) 
               : 
               
               this.state.booking_confirm_previewData.haircut && this.state.booking_confirm_previewData.haircut == "" ? "" 
                :
                <p><i class="fa-solid fa fa-check"></i> <span>{this.state.booking_confirm_previewData.haircut}</span></p>
               
               
            } 
              
            </div>
            </div>
            : 
            ""
            // this.state.booking_confirm_previewData.haircut && this.state.booking_confirm_previewData.haircut == "" ? "" :
            // <div>
            // <div class="client-pricing">
            //   <div class="clp-check active">
            //     <input 
            //       type="checkbox" 
            //       id="day1"
            //       value = "day1"
            //       defaultChecked={true}
            //       onChange={this.handleChange}
            //       onClick={()=>this.changeAddOnPrice("day1")}
            //       />
            //     <label for="day1">Add-Ons</label>
            //   </div> 
            //   <p>{this.state.booking_confirm_previewData.extraPrice}/-
            //     {/* <span>6 session</span>  */}
            //     </p>
            // </div> 
            // <div class="client-pack-type">
            //     <p><i class="fa-solid fa fa-check"></i> <span>{this.state.booking_confirm_previewData.haircut}</span></p>
            // </div>
            // </div>        
            }


            <div class="parent_time">
            <div class="img_time">
              <div class="fltr-pet-img">
                <img src="fltr-calndr.png" />
              </div>
              <div class="date">
                <h4>Service Date and Time</h4>
              </div>
            </div>
          </div>

{this.state.booking_confirm_previewData.packname == "Monthly Package" ? 
          <div class="p-time prv">
            <div class="p-item">
                <p>From Date</p>
                <div class="trng-adons dt">
                  <div class="ad-ons-cst">
                    <span>{this.state.booking_confirm_previewData.fromData}</span>
                    <small></small>
                  </div>
                </div>
              </div>
              <div class="p-item">
                <p>To Date</p>
                <div class="trng-adons dt">
                  <div class="ad-ons-cst">
                    <span>{this.state.booking_confirm_previewData.toDate}</span>
                    <small></small>
                  </div>
                </div>
              </div>

              <div class="p-item">
                <p>No.of Walks</p>
                <div class="trng-adons">
                  <div class="ad-ons-cst">
                    
                    <span>{this.state.booking_confirm_previewData.noOfWalks}</span>
                  </div>
                </div>
              </div>

              {/* <div class="p-item">
                <p>No.of Days</p>
                <div class="trng-adons">
                  <div class="ad-ons-cst">
                    <span>{this.state.booking_confirm_previewData.noOfDays}</span>
                  </div>
                </div>
              </div> */}




{this.state.booking_confirm_previewData.spmorning == "" ? "" :
                <div class="p-item">
                <p>Time</p>
                <div class="trng-adons">
                  <div class="ad-ons-cst">
                    <span>{this.state.booking_confirm_previewData.spmorning} {this.state.booking_confirm_previewData.spmorning > "12:00" ? "PM" : "AM" }</span>
                  </div>
                </div>
              </div>
}


            {this.state.booking_confirm_previewData.spafternoon == "" ? "" :
                <div class="p-item">
                <p>Time</p>
                <div class="trng-adons">
                  <div class="ad-ons-cst">
                    <span>{this.state.booking_confirm_previewData.spafternoon} {this.state.booking_confirm_previewData.spafternoon > "12:00" ? "PM" : "AM" }</span>
                  </div>
                </div>
              </div>
              }


            {this.state.booking_confirm_previewData.spevening == "" ? "" :
                <div class="p-item">
                <p>Time</p>
                <div class="trng-adons">
                  <div class="ad-ons-cst">
                    <span>{this.state.booking_confirm_previewData.spevening} {this.state.booking_confirm_previewData.spevening > "12:00" ? "PM" : "AM" }</span>
                  </div>
                </div>
              </div>
              }
        </div>
 : 
 
 ""}




{this.state.booking_confirm_previewData.packname == "Per Day Package" ? 
          <div class="p-time prv">
            <div class="p-item">
                <p>From Date</p>
                <div class="trng-adons dt">
                  <div class="ad-ons-cst">
                    <span>{this.state.booking_confirm_previewData.fromData}</span>
                    <small></small>
                  </div>
                </div>
              </div>
              <div class="p-item">
                <p>To Date</p>
                <div class="trng-adons dt">
                  <div class="ad-ons-cst">
                    <span>{this.state.booking_confirm_previewData.toDate}</span>
                    <small></small>
                  </div>
                </div>
              </div>

              <div class="p-item">
                <p>No.of Walks</p>
                <div class="trng-adons">
                  <div class="ad-ons-cst">
                    
                    <span>{this.state.booking_confirm_previewData.noOfWalks}</span>
                  </div>
                </div>
              </div>

              <div class="p-item">
                <p>No.of Days</p>
                <div class="trng-adons">
                  <div class="ad-ons-cst">
                    <span>{this.state.booking_confirm_previewData.noOfDays}</span>
                  </div>
                </div>
              </div>


              {this.state.booking_confirm_previewData.spmorning == "" ? "" :
                <div class="p-item">
                <p>Time</p>
                <div class="trng-adons">
                  <div class="ad-ons-cst">
                    <span>{this.state.booking_confirm_previewData.spmorning} {this.state.booking_confirm_previewData.spmorning > "12:00" ? "PM" : "AM" }</span>
                  </div>
                </div>
              </div>
              }


            {this.state.booking_confirm_previewData.spafternoon == "" ? "" :
                <div class="p-item">
                <p>Time</p>
                <div class="trng-adons">
                  <div class="ad-ons-cst">
                    <span>{this.state.booking_confirm_previewData.spafternoon} {this.state.booking_confirm_previewData.spafternoon > "12:00" ? "PM" : "AM" }</span>
                  </div>
                </div>
              </div>
              }


            {this.state.booking_confirm_previewData.spevening == "" ? "" :
                <div class="p-item">
                <p>Time</p>
                <div class="trng-adons">
                  <div class="ad-ons-cst">
                    <span>{this.state.booking_confirm_previewData.spevening} {this.state.booking_confirm_previewData.spevening > "12:00" ? "PM" : "AM" }</span>
                  </div>
                </div>
              </div>
              }
        </div>
 : 
 
 ""}




{this.state.booking_confirm_previewData.packname == "Boarding" ? 
          <div class="p-time prv">
            <div class="p-item">
                <p>From Date</p>
                <div class="trng-adons dt">
                  <div class="ad-ons-cst">
                    <span>{this.state.booking_confirm_previewData.fromDate}</span>
                    <small></small>
                  </div>
                </div>
              </div>
              <div class="p-item">
                <p>To Date</p>
                <div class="trng-adons dt">
                  <div class="ad-ons-cst">
                    <span>{this.state.booking_confirm_previewData.toDate}</span>
                    <small></small>
                  </div>
                </div>
              </div>
        </div>
 : 
 
 ""}


{(this.state.booking_confirm_previewData.packname == "Obedience Training" || 
    this.state.booking_confirm_previewData.packname == "Puppy Training" ||
    this.state.booking_confirm_previewData.packname == "Intermediate Training" || 
    this.state.booking_confirm_previewData.packname == "Advance Training"
) ? 
          <div class="p-time prv">
            <div class="p-item">
                <p>From Date</p>
                <div class="trng-adons dt">
                  <div class="ad-ons-cst">
                    <span>{this.state.booking_confirm_previewData.bookingDate}</span>
                    <small></small>
                  </div>
                </div>
              </div>
              {this.state.booking_confirm_previewData.spmorning == "" ? "" :
                <div class="p-item">
                <p>Time</p>
                <div class="trng-adons">
                  <div class="ad-ons-cst">
                    <span>{this.state.booking_confirm_previewData.spmorning} {this.state.booking_confirm_previewData.spmorning > "12:00" ? "PM" : "AM" }</span>
                  </div>
                </div>
              </div>
              }


            {this.state.booking_confirm_previewData.spafternoon == "" ? "" :
                <div class="p-item">
                <p>Time</p>
                <div class="trng-adons">
                  <div class="ad-ons-cst">
                    <span>{this.state.booking_confirm_previewData.spafternoon} {this.state.booking_confirm_previewData.spafternoon > "12:00" ? "PM" : "AM" }</span>
                  </div>
                </div>
              </div>
              }


            {this.state.booking_confirm_previewData.spevening == "" ? "" :
                <div class="p-item">
                <p>Time</p>
                <div class="trng-adons">
                  <div class="ad-ons-cst">
                    <span>{this.state.booking_confirm_previewData.spevening}
                    {this.state.booking_confirm_previewData.spevening > "12:00" ? "PM" : "AM" }
                    </span>
                  </div>
                </div>
              </div>
              }

        </div>
        
 : 
 
 ""}



{this.state.booking_confirm_previewData.packname == "Grooming Basic Package" ? 
          <div class="p-time prv">
            <div class="p-item">
                <p>From Date</p>
                <div class="trng-adons dt">
                  <div class="ad-ons-cst">
                    <span>{this.state.booking_confirm_previewData.bookingDate}</span>
                    <small></small>
                  </div>
                </div>
              </div>
        {this.state.booking_confirm_previewData.bookingTime < "12:00" ?             
              <div class="p-item">
                <p>Time</p>
                <div class="trng-adons">
                  <div class="ad-ons-cst">
                    
                    <span>{this.state.booking_confirm_previewData.bookingTime}</span>
                  </div>
                  <small>AM</small>
                </div>
              </div>
          :
          this.state.booking_confirm_previewData.bookingTime > "12:00" && this.state.booking_confirm_previewData.bookingTime < "17:00" ?
            <div class="p-item">
            <p>Time</p>
            <div class="trng-adons">
              <div class="ad-ons-cst">
                
                <span>{this.state.booking_confirm_previewData.bookingTime}</span>
              </div>
              <small>PM</small>
            </div>
          </div>
          :
          this.state.booking_confirm_previewData.bookingTime > "17:00" ?
            <div class="p-item">
            <p>Time</p>
            <div class="trng-adons">
              <div class="ad-ons-cst">
                
                <span>{this.state.booking_confirm_previewData.bookingTime}</span>
              </div>
              <small>PM</small>
            </div>
          </div>
          : ""}

        </div>    
 : 
 
 ""}



            <div class="all-tx-item">
            <div class="all-tx-lft">
              <span>Package Cost
                <small>(including {this.state.booking_confirm_previewData.discount}% discount)</small>
              </span>
            </div>
            {this.state.isAdoons == "true" ? <p>{this.state.booking_confirm_previewData.totalPrice}/-</p> 
            :
            <p>{(((Number(this.state.booking_confirm_previewData.actualPrice)) - (((Number(this.state.booking_confirm_previewData.actualPrice))*Number(this.state.discount))/100))).toFixed(2)}/-</p>
            }
            
          </div>
          <div class="all-tx-item">
            <div class="all-tx-lft">
              <span>Add-On Cost</span>
            </div>
            {this.state.isAdoons == "true" ? <p>{this.state.booking_confirm_previewData.extraPrice}/-</p> 
              : 
            <p>0/-</p>}
            
          </div>
          <div class="all-tx-item">
            <div class="all-tx-lft">
              <span>Taxes and Fee</span>
            </div>
            {this.state.isAdoons == "true" ? <p>{(((Number(this.state.booking_confirm_previewData.totalPrice))*5/100)).toFixed(2) }/-</p> 
              : 
            <p>{((((((Number(this.state.booking_confirm_previewData.actualPrice)) - (((Number(this.state.booking_confirm_previewData.actualPrice))*Number(this.state.discount))/100)))*5)/100)).toFixed(2)}/-</p>}
            
          </div>

            <div style={{border: "1px dashed #ece5db" ,margin: "25px 0 20px"}}></div>
            <div class="cli-p-total"> 
              <strong>Total Cost</strong>
              <p>{(Number(this.state.final_price)).toFixed(2)}/-
                </p> 
            </div>
          </div>

          <div class="mq-bd-main">
              <button class="make-pymnt-btn" onClick={this.getUpdate} >
                Book Now
              </button>
            
              <form action='https://test.payu.in/_payment' method='post' id="my_form">
              {/* <form action='https://secure.payu.in/_payment' method='post' id="my_form"> */}
              <input type="hidden" name="key" value={this.state.new_pay_obj.key} />
              <input type="hidden" name="txnid" value={this.state.new_pay_obj.txnid} />
              <input type="hidden" name="amount" value={this.state.new_pay_obj.amount} />
              <input type="hidden" name="productinfo" value={this.state.new_pay_obj.productinfo} />
              <input type="hidden" name="firstname" value={this.state.new_pay_obj.firstname} />
              <input type="hidden" name="email" value={this.state.new_pay_obj.email} />
              <input type="hidden" name="lastname" value=" "/>
              <input type="hidden" name="surl" value={this.state.new_pay_obj.surl} />
              <input type="hidden" name="furl" value={this.state.new_pay_obj.furl} />
              <input type="hidden" name="udf1" value={this.state.new_pay_obj.udf1} />
              <input type="hidden" name="udf2" value={this.state.new_pay_obj.udf2} />
              <input type="hidden" name="udf3" value={this.state.new_pay_obj.udf3} />
              <input type="hidden" name="udf4" value={this.state.new_pay_obj.udf4} />
              <input type="hidden" name="udf5" value={this.state.new_pay_obj.udf5} />
              <input type="hidden" name="hash" value={this.state.new_pay_obj.hash} />
              </form>

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

export default BookingConfirmation