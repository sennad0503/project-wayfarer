import React, { Component } from 'react'

export class NewPostPage extends Component {
  state ={
    title:'',
    comment:'',
    cities:[],
  }
  componentDidMount(){

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
      location: this.props.location.state._id
    }
    
    fetch(`http://localhost:4000/comment`,{
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
      <div>
        <form action="" onSubmit={this.handleNew}>
          <p className="">Create a new post</p>
          <div className="input-field">
          </div>
          <label htmlFor="">Title</label>
          <br></br>
          <input 
            type="textarea" 
            name="title" 
            id="title" 
            onChange={this.handleChange} 
            autoComplete="off"
          />
          <br></br>
          <input 
            type="textarea" 
            name="comment" 
            id="comment" 
            onChange={this.handleChange} 
            autoComplete="off"
          />
          <br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default NewPostPage
