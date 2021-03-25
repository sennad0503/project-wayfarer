import React from 'react'
import { Link } from 'react-router-dom';
import ShowComment from './ShowComment'

function PostCards(props) {
  
  if (props.posts) {
    function compare(a, b) {
      if (a.updatedAt > b.updatedAt) return -1;
      if (b.updatedAt > a.updatedAt) return 1;
      return 0;
    }
    props.posts.sort(compare)
    

    const cards = props.posts.map(post=>
      <li className='card post-card' key={post._id}>
        <img src={post.image} alt="" className="post-pic"/>
        <div className="post-card-details">

          <h6>{post.title}</h6>

          <p>{post.comment}</p>
          <p>{(new Date(post.updatedAt))+''}</p>
          <p>{post.author}</p>
          <Link to={{
              pathname: '/edit',
              state: post
            }} 
            className="btn">
            Edit
          </Link>
          {/* <ShowComment post_id={post._id}/> */}
        </div>
        <div>
            <button onClick={() => props.deleteLocation(post._id)}>Delete</button>{' '}
        </div>

      </li>
    )
    return (
      cards
    )
  }
  return <li></li>
}

export default PostCards
