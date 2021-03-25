import React, { Component } from 'react'
import { Select } from 'react-materialize';

export class EditPostPage extends Component {
  state ={
    title:'',
    comment:'',
    image: '',
    _id:'',
    locations:[],
  }
  componentDidMount(){
    const post = this.props.location.state
    console.log(post);
    
    fetch(`http://localhost:4000/location/`,{
      method:'GET'
    })
      .then(res=>{
        return res.json()
      })
      .then(data=>{  
        const city = data.filter(city => city._id+'' === post.location+'')[0]
        
        this.setState({
          locations: data,
          location: city,
          _id: post._id,
          title: post.title,
          comment: post.comment,
          image: post.image,
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

  handleUpdate=(event)=>{
    event.preventDefault();
    const obj = {
      title: this.state.title,
      comment: this.state.comment,
      image: this.state.image,
    }
    
    fetch(`http://localhost:4000/post/${this.state._id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          obj
        ),
      })
      .then(() => {
        this.props.history.push('/');
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <form action="" onSubmit={this.handleUpdate}>
          <p className="">Edit post</p>
          <div className="input-field col s6">
          <Select
            onChange={this.handleChange}
            value={this.state.locations[0]?this.state.locations[0].city:''}
            name="city" 
            id="city"
            className="col s6"
          >
            <option value={this.state.locations[0]?this.state.locations[0].city:''}>
              {this.state.locations[0]?this.state.locations[0].city:''}
            </option>
          </Select>
          </div>
          <label htmlFor="" className='postTitle'>Title</label>
          <br></br>
          <input 
            type="textarea" 
            name="title" 
            id="title" 
            onChange={this.handleChange} 
            autoComplete="off"
            value={this.state.title?this.state.title:''}
          />
          <br></br>
          <input className='comment'
        
            type="textarea" 
            name="comment" 
            id="comment" 
            onChange={this.handleChange} 
            autoComplete="off"
            value={this.state.comment?this.state.comment:''}
          />
          <br></br>
          <input 
            type="textarea" 
            name="image" 
            id="image" 
            onChange={this.handleChange} 
            autoComplete="off"
            value={this.state.image?this.state.image:''}
          />
          <br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default EditPostPage
