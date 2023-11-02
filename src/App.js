import '../src/All.css';
import React, { Component } from "react"
import { Route, Switch, Redirect, HashRouter } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import BoardingScreen from './PNP-Client-Screens/EntryScreens/BoardingScreen'
import { WalkinSCreen } from './PNP-Client-Screens/EntryScreens/WalkinSCreen';
import TrainingScreen from './PNP-Client-Screens/EntryScreens/TrainingScreen';
import GroomingScreen from './PNP-Client-Screens/EntryScreens/GroomingScreen';
import Login from './PNP-Client-Screens/EntryScreens/Login';
import SignUp from './PNP-Client-Screens/EntryScreens/SignUp';
import OTP from './PNP-Client-Screens/EntryScreens/OTP';
import Home from './PNP-Client-Screens/EntryScreens/Home';
import AllBorderQuotations from './PNP-Client-Screens/BoardingModule/AllBorderQuotations';
import ViewBoarderProfile from './PNP-Client-Screens/BoardingModule/ViewBoarderProfile';
import BoardingBooking from './PNP-Client-Screens/BoardingModule/BoardingBooking';
import CommunityForum from './PNP-Client-Screens/EntryScreens/CommunityForum';
import VetBooking from './PNP-Client-Screens/Vet@Home/VetBooking';
import SitBooking from './PNP-Client-Screens/Sitting/SitBooking';
import CreateDogForm from './PNP-Client-Screens/EntryScreens/CreateDogForm';
import GroomBooking from './PNP-Client-Screens/Grooming/GroomBooking';
import GroomingInfo from './PNP-Client-Screens/Grooming/GroomingInfo';
import TrainingBooking from './PNP-Client-Screens/Training/TrainingBooking';
import TrainingInfo from './PNP-Client-Screens/Training/TrainingInfo';
import WalkingBooking from './PNP-Client-Screens/Walking/WalkingBooking';
import WalkingInfo from './PNP-Client-Screens/Walking/WalkingInfo';
import VetBookingInfo from './PNP-Client-Screens/Vet@Home/VetBookingInfo';
import SittingInfo from './PNP-Client-Screens/Sitting/SittingInfo';
import Thanku from './PNP-Client-Screens/Grooming/Thanku';
import Quotation from './PNP-Client-Screens/EntryScreens/Quotation';
import MyProfile from './PNP-Client-Screens/EntryScreens/MyProfile';
import Navigation from './PNP-Client-Screens/EntryScreens/Navigation';
import SplashScreen from './PNP-Client-Screens/EntryScreens/SplashScreen';
import Location from './PNP-Client-Screens/EntryScreens/Location';
import BoardingBookingUpdate from './PNP-Client-Screens/BoardingModule/BoardingBookingUpdate';
import BoardingInfo from './PNP-Client-Screens/BoardingModule/BoardingInfo';
import viewprofile from './PNP-Client-Screens/EntryScreens/viewprofile';
import PetInteraction from './PNP-Client-Screens/EntryScreens/PetInteraction';
import PetPurchase from './PNP-Client-Screens/PetPurchase/PetPurchase';
import MyBookings from './PNP-Client-Screens/EntryScreens/MyBookings';
import ResendQuotationPopup from './PNP-Client-Screens/EntryScreens/ResendQuotationPopup';
import BookingConfirmation from './PNP-Client-Screens/EntryScreens/BookingConfirmation';
import SuccessPay from './PNP-Client-Screens/EntryScreens/SuccessPay';
import FailurePay from './PNP-Client-Screens/EntryScreens/FailurePay';
import ActiveBookingDetails from './PNP-Client-Screens/EntryScreens/ActiveBookingDetails';
import Wallet from './PNP-Client-Screens/EntryScreens/Wallet';
import ReleasePayment from './PNP-Client-Screens/EntryScreens/ReleasePayment';
import NotificationsData from './PNP-Client-Screens/EntryScreens/NotificationsData';
import Internet from './PNP-Client-Screens/EntryScreens/Internet';






class App extends Component {
    render() {
      return (
        <HashRouter>
        {/* <BrowserRouter> */}
          <Switch>
            <Route exact path='/' component = {SplashScreen} />
            <Route exact path='/boardingentry' component = {BoardingScreen} />
            <Route exact path='/walkingentry' component = {WalkinSCreen} />
            <Route exact path='/trainingentry' component = {TrainingScreen} />
            <Route exact path='/groomingentry' component = {GroomingScreen} />
            <Route exact path='/login' component = {Login} />
            <Route exact path='/signup' component = {SignUp} />
            <Route exact path='/otppage' component = {OTP} />
            <Route exact path='/homepage' component = {Home} />
            <Route exact path='/boarding-booking' component={BoardingBookingUpdate} />
            <Route exact path='/boarding-info' component={BoardingInfo} />
            {/* <Route exact path='/book-bording-service' component={BoardingBooking} /> */}
            <Route exact path='/groom-booking' component={GroomBooking} />
            <Route exact path='/groom-info' component={GroomingInfo} />
            <Route exact path='/train-booking' component={TrainingBooking} />
            <Route exact path='/train-info' component={TrainingInfo} />
            <Route exact path='/walk-booking' component={WalkingBooking} />
            <Route exact path='/walk-info' component={WalkingInfo} />
            <Route exact path='/vet-booking' component={VetBooking} />
            <Route exact path='/vet-info' component={VetBookingInfo} />
            <Route exact path='/sit-booking' component={SitBooking} />
            <Route exact path='/sit-info' component={SittingInfo} />
            <Route exact path='/all-boarder-quotations' component={AllBorderQuotations} />
            <Route exact path='/view-border-profile' component={ViewBoarderProfile} />
            <Route exact path='/community' component={CommunityForum} />
            <Route exact path='/create-dog-form' component={CreateDogForm} />
            <Route exact path='/thank-u' component={Thanku} />
            <Route exact path='/quotation' component={Quotation} />
            <Route exact path='/myprofile' component={MyProfile} />
            <Route exact path='/navigation' component={Navigation} />
            <Route exact path='/location' component={Location} />
            <Route exact path='/viewprofile' component={viewprofile} />
            <Route exact path='/petInteraction' component={PetInteraction} />
            <Route exact path='/petpurchase' component={PetPurchase} />
            <Route exact path='/mybookings' component={MyBookings} />
            <Route exact path='/resendquote' component={ResendQuotationPopup} />
            <Route exact path='/bookingconfirmation' component={BookingConfirmation} />
            <Route exact path='/success-pay' component={SuccessPay} />
            <Route exact path='/failure-pay' component={FailurePay} />
            <Route exact path='/activeDetails' component={ActiveBookingDetails} />
            <Route exact path='/wallet' component={Wallet} />
            <Route exact path='/releasepayment' component={ReleasePayment} />
            <Route exact path='/notifications-page' component={NotificationsData} />
            <Route exact path='/internet' component={Internet} />

            
            
  
            
            {/* {this.state.user && <Route path = '/storeproducts' component={StoreProducts} />}
            {user && user.id ? <Redirect to='/StoreProducts'/> : <Redirect to='/login'/>} */}
          </Switch>
          {/* </BrowserRouter> */}
          </HashRouter>
      );
    }
  }

  export default App
