import React, { Component } from 'react';

class CircleStation extends Component{
  style = {
    backgroundColor: `#${this.props.color}`
  }
  render(){
    return (
      <div className="circle-station" style={this.style}>
        <div className="inner"></div>
      </div>
    )
  }
}

export default class CinemaItem extends Component {
  render(){
    const { title, address, subway, id, labels } = this.props;
    return (
      <div key={id} className="list-item">
        <div className="info-part">
          <div className="title">{title}</div>
          <div className="address">{address}</div>
          <div className="station-list">{
            subway.sort((a,b)=>a.distance-b).map((station,id)=>
                <div key={id} className="station">
                  <CircleStation color={station.color}/>
                  {station.name}
                </div>
              )
            }
          </div>
        </div>
        <div className="available-part">
          {
            labels && labels[0].text ? 
              <div className="labels">{labels[0].text}</div> 
              : <div></div>
          }
          <button className="button">+</button>
        </div>  
      </div>
    )
  }
}