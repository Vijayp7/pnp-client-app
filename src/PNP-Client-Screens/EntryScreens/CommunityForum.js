import React, { Component } from 'react'
import Footer from './Footer';
import Header from './Header';
import LoadingSymbol from './LoadingSymbol'

export class CommunityForum extends React.PureComponent {
    constructor(props){
        super(props);
    }
    state = {
        loading: true,
    }

    componentDidMount = () =>{
        this.timeoutHandle = setTimeout(() => {
            this.setState({
                loading: false,
            })
          },1000);
    }


    openHome = () =>{
        this.props.history.push({
            pathname: "/homepage"
        })
    }
  render() {
    return (
        <div style={{width: "100%", height: "100vh"}}>
            {/* <Header /> */}

            {/* <p onClick={this.openHome}>Back</p> */}
            {this.state.loading === true ? <LoadingSymbol /> : ""}
            <iframe src="https://www.petnpro.in/community/#/" />
            <Footer />
        </div>
    )
  }
}

export default CommunityForum