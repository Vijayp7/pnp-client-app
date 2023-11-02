import React, { Component } from 'react'

export class HandlingImage extends React.PureComponent {

    static myInstance = null;

    static getInstance() {  
        return new HandlingImage();
    }



async handleImagesMethod(event) {
    let image = event.target.files[0];
    try {
        let response =  new Promise((resolve, reject) =>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(image)
            fileReader.onload = () => {
              resolve(fileReader.result);
              console.log(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
                console.log(error);
                // toast.error(error);
              }
        })
        return response
    } catch (error) {
        console.error(error);
        return error;
    }



   
}











  render() {
    return (
      <div>HandlingImage</div>
    )
  }
}

export default HandlingImage