import React, { Component } from 'react'
import { Select } from 'react-materialize';

export class NewPostPage extends Component {
  state ={
    title:'',
    comment:'',
    image: '',
    location: '',
    cities:[],
  }
  componentDidMount(){
    fetch('http://localhost:4000/location',{
      method:'GET'
    })
      .then(res=>{
        return res.json()
      })
      .then(data=>{
        this.setState({
          cities: data,
          city: data[0]
        })
      })
      .catch((err) => console.log(err));
  }

  handleChange=(event)=>{
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleNew=(event)=>{
    event.preventDefault();

    const obj = {
      title: this.state.title,
      comment: this.state.comment,
      image: this.state.image,
      location: this.props.location.state.location._id
    }
    
    fetch(`http://localhost:4000/post`,{
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          obj
        ),
      })
      .then(()=>{
        this.props.history.push('/');
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="row">
        <div className="col s6 offset-s3 newpost">
          <form action="" onSubmit={this.handleNew}>
            <h1 className="newpost-title text-shadow">Create A New Post</h1>
            <div className="input-field">
              <Select
                onChange={this.handleChange}
                value={this.props.location.state?this.props.location.state.location.city:''}
                name="city" 
                id="city"
              >
                <option value={this.props.location.state?this.props.location.state.location.city:''}>
                  {this.props.location.state?this.props.location.state.location.city:''}
                </option>
              </Select>
            </div>
            <label>Title</label>
            <input 
              type="textarea" 
              name="title" 
              id="title" 
              onChange={this.handleChange} 
              autoComplete="off"
            />
            <label>Description</label>
            <input 
              type="textarea" 
              name="comment" 
              id="comment" 
              onChange={this.handleChange} 
              autoComplete="off"
            />
            <label>ImageURL</label>
            <input 
              type="textarea" 
              name="image" 
              id="image" 
              onChange={this.handleChange} 
              autoComplete="off"
            />
            <button className="newpost-submit btn-large" type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default NewPostPage
