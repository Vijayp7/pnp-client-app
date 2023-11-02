import React, { Component } from 'react'
import Footer from '../EntryScreens/Footer';

export class ViewBoarderProfile extends Component {

    facilities = () =>{
        document.getElementById("tab-1").style.display = 'block';
        document.getElementById("tab-2").style.display = 'none';
        document.getElementById("tab-3").style.display = 'none';
        document.getElementById("tab-1-main").classList.add("current");
        document.getElementById("tab-2-main").classList.remove("current");
        document.getElementById("tab-3-main").classList.remove("current");
    } 
   photos = () =>{
    document.getElementById("tab-1").style.display = 'none';
    document.getElementById("tab-2").style.display = 'block';
    document.getElementById("tab-3").style.display = 'none';
    document.getElementById("tab-1-main").classList.remove("current");
    document.getElementById("tab-2-main").classList.add("current");
    document.getElementById("tab-3-main").classList.remove("current");
    } 

   reviews = () =>{
    document.getElementById("tab-1").style.display = 'none';
    document.getElementById("tab-2").style.display = 'none';
    document.getElementById("tab-3").style.display = 'block';
    document.getElementById("tab-1-main").classList.remove("current");
    document.getElementById("tab-2-main").classList.remove("current");
    document.getElementById("tab-3-main").classList.add("current");
    } 


  render() {
    return (
        <div class="home-pnp">
          <div class="view-profile-header">
            <div class="boarding-head">
              <a ><img src="left-arrow.png" alt="arrow" /></a>
            </div>
            
          </div>
          <div class="view-profile-sec">
            <div class="profile-id">
              <div class="profile-id-lft">
                <div class="profile-id-img">
                  <img src="profile-img1.jpg" alt="" />
                </div>
                <div class="profile-id-info">
                  <h4>Rakesh (Banjarahill)</h4>
                  <span>
                    <img src="booking-icon.png" />
                    <p>34 Booking Completed</p>
                  </span>
                </div>
              </div>
              <div class="profile-id-rht">
                <span>
                  <img src="star-icon.png" alt="" />
                  <p>5.0</p>
                </span>
                <div class="secure">
                  <img src="secure-icon.png" alt=""/>
                  <p>Secure</p>
                </div>
              </div>
            </div>
  
            <div class="view-profile-tabs">
              <ul class="tabs">
                <li id='tab-1-main' class="tab-link current" data-tab="tab-1" onClick={this.facilities}>Facilities</li>
                <li id='tab-2-main' class="tab-link" data-tab="tab-2" onClick={this.photos}>Photos</li>
                <li id='tab-3-main' class="tab-link" data-tab="tab-3" onClick={this.reviews}>Reviews</li>
              </ul>
              <div id="tab-1" class="tab-content current">
                  <div class="facilities-sec">
                    <div class="facilities-heading">
                      <div>
                        <h4>Facilities</h4>
                      </div>
                      <button>Book now</button>
                    </div>
                    <div class="facilities-list">
                      <div class="facilities">
                        <img src="facilities1-img.png" alt="" />
                        <p>Meals</p>
                      </div>
                      <div class="facilities">
                        <img src="facilities2-img.png" alt="" />
                        <p>Care</p>
                      </div>
                      <div class="facilities">
                        <img src="facilities3-img.png" alt="" />
                        <p>Out Door</p>
                      </div>
                    </div>
                    <div class="facilities-list-2">
                      <div class="facilities-2">
                        <img src="facilities4-img.png" alt="" />
                        <p>Combing</p>
                      </div>
                      <div class="facilities-2">
                        <img src="facilities6-img.png" alt="" />
                        <p>Walking</p>
                      </div>
                    
                    </div>
                  </div>
              </div>
              <div id="tab-2" class="tab-content ">
                <div class="profile-photo-sec">
                  <div class="profile-photo">
                    <img src="blog-photo1.png" />
                  </div>
                  <div class="profile-photo">
                    <img src="blog-photo1.png" />
                  </div>
                  <div class="profile-photo">
                    <img src="blog-photo1.png" />
                  </div>
                  <div class="profile-photo">
                    <img src="blog-photo1.png" />
                  </div>
                  <div class="profile-photo">
                    <img src="blog-photo1.png" />
                  </div>
                  <div class="profile-photo">
                    <img src="blog-photo1.png" />
                  </div>
                </div>
              </div>
              <div id="tab-3" class="tab-content">
                <div class="based-review">
                  <div class="rating-sec">
                    <p>4.0</p>
                    <div class="rating-stars">
                      <img src="rating-star.png" />
                      <img src="rating-star.png" />
                      <img src="rating-star.png" />
                      <img src="rating-star.png" />
                      <img src="rating-star.png" />
                    </div>
                    <span>Based on 53 reviews</span>
                  </div>
                  <div class="rating-sec-ryt">
                    <ul>
                      <li>
                        <p>Excellent</p>
                        <div class="rating-bar"></div>
                      </li>
                      <li>
                        <p>Good</p>
                        <div class="rating-bar"></div>
                      </li>
                      <li>
                        <p>Average</p>
                        <div class="rating-bar"></div>
                      </li>
                      <li>
                        <p>Below Average</p>
                        <div class="rating-bar"></div>
                      </li>
                      <li>
                        <p>Poor</p>
                        <div class="rating-bar"></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div class="google-rev-info">
                    <div class="google-rev">
                      <div class="google-feedback">
                        <img src="pro-1.png" />
                        <div>
                          <h6>Jayanta Pal</h6>
                          <div class="rating-stars">
                            <img src="rating-star.png" />
                            <img src="rating-star.png" />
                            <img src="rating-star.png" />
                            <img src="rating-star.png" />
                            <img src="rating-star.png" />
                            <span>5.0</span>
                          </div>
                        </div>
                      </div>
                      <div class="google-frt">
                        <img src="clock2.png" />
                        <p>30 days ago</p>
                      </div>
                    </div>
                    <p class="para">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                  </div>
                  <div class="google-rev-info">
                    <div class="google-rev">
                      <div class="google-feedback">
                        <img src="pro-1.png" />
                        <div>
                          <h6>Jayanta Pal</h6>
                          <div class="rating-stars">
                            <img src="rating-star.png" />
                            <img src="rating-star.png" />
                            <img src="rating-star.png" />
                            <img src="rating-star.png" />
                            <img src="rating-star.png" />
                            <span>5.0</span>
                          </div>
                        </div>
                      </div>
                      <div class="google-frt">
                        <img src="clock2.png" />
                        <p>30 days ago</p>
                      </div>
                    </div>
                    <p class="para">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
         <Footer />
        </div>
    )
  }
}

export default ViewBoarderProfile