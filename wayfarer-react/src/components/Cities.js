import React, { Component } from 'react'

export class Cities extends Component {
  componentDidMount(){

  }
  handleDetailSelect(){

  }
  render() {
    let cities=[]
    if(this.props.locations){
      cities = this.props.locations.map(city=>{
        return (
          <li id="city-card" key={city._id} onClick={()=>this.props.selector(city._id)}>
            <img src={city.image} alt=""className="city-pic" />
            <p className="city-name">{city.city}</p>
          </li>
        )
      })
    }
    
    return (
      <>
        {cities}
      </>
    )
  }
}

export default Cities
