import React, { Component } from 'react'
import Cities from '../components/Cities';
import Details from '../components/Details';

require ('../index.css')

export class HomePage extends Component {
  state={
  }
  componentDidMount(){
    fetch(`http://localhost:4000/location/`,{
      method:'GET'
    })
      .then(res=>{
        return res.json()
      })
      .then(data=>{        
        this.setState({
          cities:data,
          location_id: data[0]._id
        })
        this.fetchData(data[0]._id)
      })
      .catch((err) => console.log(err));
    
  }
  fetchData=(location_id)=>{
    fetch(`http://localhost:4000/location/${location_id}`,{
      method:'GET'
    })
      .then(res=>{
        return res.json()
      })
      .then(data=>{
        this.setState({
          location: data
        })
      })
      .catch((err) => console.log(err));
    fetch(`http://localhost:4000/location/getposts/${location_id}`,{
      method:'GET'
    })
      .then(res=>{
        return res.json()
      })
      .then(data=>{
        this.setState({
          posts: data
        })
      })
      .catch((err) => console.log(err));
  }
  selector=(location_id)=>{
    this.setState({
      location_id:location_id
    })
    this.fetchData(location_id)
  }

  render() {
    // console.log(this.state.posts);
    
    return (
      <div className="main row">
        <div className="cities col s4">
          <h2 className="cities-title text-shadow">Cities</h2>
          <ul>
            <Cities locations={this.state.cities} selector={this.selector}/>
          </ul>
        </div>
        <div className="details col s8">
          <Details posts={this.state.posts} location={this.state.location} locations={this.state.cities}/>
        </div>
      </div>
    )
  }
}

export default HomePage
