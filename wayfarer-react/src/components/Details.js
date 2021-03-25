import React, { Component } from 'react'
import PostCards from './PostCards'
import { Link } from 'react-router-dom';
export class Details extends Component {
  
  componentDidMount(){
    
    
  }


  deleteLocation = (postId) => {
    const confirm = prompt('Are you sure you want to delete this? Y/N')
    
    if (confirm.toUpperCase() === 'Y') {
      fetch(`http://localhost:4000/post/${postId}`, {
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

  render() {
    return (
      <>
        <div className="details-header">
          <div className="details-location">
            <h2 className="details-city text-shadow">{this.props.location?this.props.location.city:''}</h2>
            <h4 className="details-country text-shadow">{this.props.location?this.props.location.country:''}</h4>
          </div>
          <img src={this.props.location?this.props.location.image:''}
            alt="placeholder"
            className="details-pic"/>
        </div>
        <div>
          <ul className="post-header">
            <li>
              <h1 className="post-title text-shadow">Posts</h1>
            </li>
            <li>
              <Link 
                className="add-post btn-floating btn-large" 
                to={{
                  pathname: '/new',
                  state: this.props
                }}
              >
                <i className="material-icons">+</i>
              </Link>
            </li>
          </ul>
          <PostCards posts={this.props.posts} deleteLocation={this.deleteLocation}/>
        </div>
      </>
    )
  }
}

export default Details
/* to={{
  pathname: '/edit',
  state: post
}} 
className="btn"> */
