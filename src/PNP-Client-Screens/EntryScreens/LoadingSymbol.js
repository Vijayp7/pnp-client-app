import React, { Component } from 'react'

export class LoadingSymbol extends React.PureComponent {

  render() {
    return (
        <div className="loading-main-lg">
        <div className="loader--roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="loader--title">Loading</div>
      </div>
    )
  }
}

export default LoadingSymbol