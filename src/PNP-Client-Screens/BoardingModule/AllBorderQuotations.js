import React, { Component } from 'react'
import Footer from '../EntryScreens/Footer';

export class AllBorderQuotations extends Component {

    constructor(props) {
        super(props);
    
    this.state = {
    
      };
    }

    homePage = () =>{
        this.props.history.push({
            pathname:'/homepage'
        })
    }

    viewProfile = () =>{
        this.props.history.push({
            pathname:'/view-border-profile'
        })
    }

  render() {
    return (
        <div>
             <div class="home-pnp">
        <div class="boarding-header">
          <div class="boarding-head">
            <a onClick={this.homePage}><img src="left-arrow.png"  /></a>
          </div>
          <h2>Pet Boarding</h2>
          <div class="boarding-chart">
            {/* <a><img src="boarding-filter-icon.png" /></a> */}
          </div>
        </div>
        <div class="boarding-middle-sec">
          <div class="boarding-search-section">
            <p>12 Result Found..</p>
          </div>

          <div class="boarding-result-section">
            <div class="result-section">
              <div class="result-lft">
                <img src="result-img1.jpg" alt="" />
              </div>
              <div class="result-rht">
                <div class="result-person">
                  <div class="result-adrs">
                        <h4>Rakesh (Banjarahill)</h4>
                        <span>
                          <img src="loc-icon.png" alt="" />
                          <p>3.1km away</p>
                        </span>
                        <ul>
                          <li><img src="star-rtng-icon.png" alt="" /></li>
                          <li><img src="star-rtng-icon.png" alt="" /></li>
                          <li><img src="star-rtng-icon.png" alt="" /></li>
                          <li><img src="star-rtng-icon.png" alt="" /></li>
                          <li><img src="star-rtng-icon.png" alt="" /></li>
                          <span>106 reviews</span>
                        </ul>
                  </div>
                  <div class="result-price">
                      <h5>₹ 3000/-</h5>
                      <p>Per month</p>
                  </div>
                </div>
                <div class="result-btns">
                  <button class="vp-btn" onClick={this.viewProfile}>View Profile</button>
                  <button class="bn-btn">Book Now</button>
                </div>
                
              </div>
            </div>
            <div class="result-section">
              <div class="result-lft">
                <img src="result-img1.jpg" alt="" />
              </div>
              <div class="result-rht">
                <div class="result-person">
                  <div class="result-adrs">
                        <h4>Rakesh (Banjarahill)</h4>
                        <span>
                          <img src="loc-icon.png" alt="" />
                          <p>3.1km away</p>
                        </span>
                        <ul>
                          <li><img src="star-rtng-icon.png" alt="" /></li>
                          <li><img src="star-rtng-icon.png" alt="" /></li>
                          <li><img src="star-rtng-icon.png" alt="" /></li>
                          <li><img src="star-rtng-icon.png" alt="" /></li>
                          <li><img src="star-rtng-icon.png" alt="" /></li>
                          <span>106 reviews</span>
                        </ul>
                  </div>
                  <div class="result-price">
                      <h5>₹ 3000/-</h5>
                      <p>Per month</p>
                  </div>
                </div>
                <div class="result-btns">
                  <button class="vp-btn">View Profile</button>
                  <button class="bn-btn">Book Now</button>
                </div>
                
              </div>
            </div>
            <div class="result-section">
              <div class="result-lft">
                <img src="result-img1.jpg" alt="" />
              </div>
              <div class="result-rht">
                <div class="result-person">
                  <div class="result-adrs">
                        <h4>Rakesh (Banjarahill)</h4>
                        <span>
                          <img src="loc-icon.png" alt="" />
                          <p>3.1km away</p>
                        </span>
                        <ul>
                          <li><img src="star-rtng-icon.png" alt="" /></li>
                          <li><img src="star-rtng-icon.png" alt="" /></li>
                          <li><img src="star-rtng-icon.png" alt="" /></li>
                          <li><img src="star-rtng-icon.png" alt="" /></li>
                          <li><img src="star-rtng-icon.png" alt="" /></li>
                          <span>106 reviews</span>
                        </ul>
                  </div>
                  <div class="result-price">
                      <h5>₹ 3000/-</h5>
                      <p>Per month</p>
                  </div>
                </div>
                <div class="result-btns">
                  <button class="vp-btn">View Profile</button>
                  <button class="bn-btn">Book Now</button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
        </div>
       
    )
  }
}

export default AllBorderQuotations