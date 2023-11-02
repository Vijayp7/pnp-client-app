import { React, Component } from "react";

// Test Server
let baseURL = `https://cmschamps.com/pnp/index.php/`;
// "homepage": "https://cmschamps.com/pnp-mobile/cl/#",

// Live Server
// let baseURL = `https://www.petsfolio.com/pnp/index.php/`;
// "homepage": "https://www.xhtmlreviews.com/pfclientapp/#",

export class Services extends Component{


static myInstance = null;

static getInstance() {  
    return new Services();
}


//create-dog-form 
async BreedType() {
    try {
        let response = await fetch(
            baseURL + (`api/home/breeds`),
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}



async newLogin(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/users/login`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                        },
                body: JSON.stringify(obj),
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async verifyOTP(obj) {
    try {
      let response = await fetch(
            baseURL + (`api/users/otp`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),
            }
       )
      let responseJson = await response.json();
        return responseJson;  
    } catch (error) {
      console.log(error);
      return error;
    }
}


/////////

async PetList(obj1) {
    try {
      let response = await fetch(
            baseURL + (`api/customers/myDogs`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj1),
            }
       )
      let responseJson = await response.json();
        return responseJson;  
    } catch (error) {
      console.log(error);
      return error;
    }
}



async newRegistration(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/users/register`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),
            }
        )
        let responseJson = await response.json();
        return responseJson;
        
    } catch (error) {
        console.log(error);
        return error;
    }
}

async ServicesHomePage() {
    try {
        let response = await fetch(
            baseURL + (`api/home/services`),
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}




// async allServicesHomePage() {
//     try {
//         let response = await fetch(
//             baseURL + (`api/home/home`),
//             {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },

//             }
//         )
//         let responseJson = await response.json();
//         return responseJson;
//     } catch (error) {
//        console.log(error);
//        return error; 
//     }
// }


async delayedVerification(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/users/verify`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async getDogBreeds() {
    try {
        let response = await fetch(
            baseURL + (`api/home/breeds`),
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async Packages(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/bookings/packages`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async GroomingBookings(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/bookings/groomingBookings`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}






async AddPets(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/customers/addDog`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async bookingsCount(obj2) {
    try {
        let response = await fetch(
            baseURL + (`api/Customers/bookingsCount`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj2),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async groomingPreview(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/bookings/groomingPreview`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async boardingPreview(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/bookings/boardingPreview`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

// async boardingBooking(obj) {
//     try {
//         let response = await fetch(
//             baseURL + (`api/bookings/boarding`),
//             {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(obj),

//             }
//         )
//         let responseJson = await response.json();
//         return responseJson;
//     } catch (error) {
//        console.log(error);
//        return error; 
//     }
// }

async boardingBookings(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/bookings/boardingBookings`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async sittingBookings(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/bookings/sittingBookings`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async SittingPreview(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/bookings/sittingPreview`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async vet_issues() {
    try {
        let response = await fetch(
            baseURL + (`api/bookings/vet_issues`),
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async vetBookings(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/bookings/vetBookings`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async vetPreview(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/bookings/vetPreview`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async vetPreview(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/bookings/vetPreview`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async walkingBookings(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/bookings/walkingBookings`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async walkingPreview(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/bookings/walkingPreview`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async trainingBookings(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/bookings/trainingBookings`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async trainingPreview(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/bookings/trainingPreview`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async myQuotes(obj1) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/allquotations`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj1),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async bookingService(obj1) {
    try {
        let response = await fetch(
            baseURL + (`api/Quotations/getBookingService`),
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj1),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async getMyBooking(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/Quotations/getMyBooking`),
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async deleteMyBooking(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/deleteMyBooking`),
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async bookingConfirmation(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/bookingDetails`),
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async getClientBookings(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/getClientBookings`),
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async getClientBookingDetails(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/getClientBookingDetails`),
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async getCIWalletAmount(obj3) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/getCIWalletAmount`),
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj3),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}



async releasePayment(obj3) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/releasePayment`),
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj3),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async NotificationsData(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/getNotifications`),
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}



async EditProfile(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/Users/updateCiDetails`),
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async SpReviews(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/gerSpReviews`),
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async createPayment(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/createPayment`),
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}



async deleteTrainingBreakDown(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/deleteTrainigBrackDown`),
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async Wallet(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/ciWalletDetails`),
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async ReadNotifications(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/ciReadNotification`),
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}






async LikeQuotes(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/updateFavorite`),
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async SendBookingNotificationToSP(obj) {
    try {
        let response = await fetch(
            `https://fcm.googleapis.com/fcm/send`,
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : "key=AAAAqzOPiBU:APA91bFYaLxhUo4iIUnXyNfRRI6EJxKiWKcxbeZyzWwzwdrujLK_Mb7ASgHeOoFU0QgvpfIf16ZYjvyVD6mQJIsMmRk95GrtxpfmylsbkvbusHmqXL2-qcGqDdR6DiTLri_WE6nYE1fO"
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async get_device_tokens(obj1) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/get_device_tokens`),
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj1),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

























    render() 
    
    {
return (
<div>hello</div>
)


    }
}

export default Services