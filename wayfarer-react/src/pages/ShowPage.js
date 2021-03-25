import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import CommentCards from '../components/CommentCards'

export class ShowPage extends Component {
  state={

  }
  componentDidMount(){
    const post = this.props.location.state
    this.setState(post)
    fetch(`http://localhost:4000/post/getposts/${this.props.location.state._id}`,{
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

  handleNew=(event)=>{
    event.preventDefault();

    const obj = {
      title: this.state.title,
      comment: this.state.comment,
      location: this.props.location.state.location._id
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

  deleteLocation = (postId) => {
    const confirm = prompt('Are you sure you want to delete this? Y/N')
    
    if (confirm.toUpperCase() === 'Y') {
      fetch(`http://localhost:4000/comment/${postId}`, {
        method: 'DELETE',
      })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        const stateCopy = {...this.state}
        const updatedState = stateCopy.posts.filter((post) => {
          return postId !== post._id
        })
        this.setState({
          posts: updatedState
        })
      })
      .catch((err) => console.log(err));
    }
  }

  render=()=>{
    // console.log(this.state.location.length)
    const getPost=(post)=>{
      if (post._id){
        return post
      }
      return {
        _id:'',
        image:'',
        title:'',
        comment:'',
        updatedAt:'',
        author:''
      }
    }
    const post = getPost(this.state)
    return (
      <>
        <div className='card post-card' key={post._id}>
          <img src={post.image} alt="" className="post-pic"/>
          <div className="post-card-details">
            <h6>{post.title}</h6>
            <p>{post.comment}</p>
            <p>{(new Date(post.updatedAt))+''}</p>
            <p>{post.author}</p>
            <p>{this.state.location?this.state.location.length-1:''} comments</p>
            <Link to={{
                pathname: '/edit',
                state: post
              }} 
              className="btn">
              Edit
            </Link>
          </div>
        </div>
        <Link className="btn-floating btn-large waves-effect waves-light red col offset-s11" 
          to={{
            pathname: '/new/comment',
            state: this.state
          }}
        >
        <i className="material-icons">+</i></Link>
        <CommentCards posts={post.posts} deleteLocation={this.deleteLocation}/>
      </>
    )
  }
}

export default ShowPage
