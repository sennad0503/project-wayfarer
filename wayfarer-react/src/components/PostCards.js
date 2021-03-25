import React from 'react'
import { Link } from 'react-router-dom';

function PostCards(props) {
  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, day, year].join('-');
}

  if (props.posts) {
    function compare(a, b) {
      if (a.updatedAt > b.updatedAt) return -1;
      if (b.updatedAt > a.updatedAt) return 1;
      return 0;
    }
    
    props.posts.sort(compare)
    
    const cards = props.posts.map((post,i)=>
      <li className="postcard" key={post._id}>
        <img src={post.image} alt="" className="postcard-img"/>
        <div className="postcard-detail">
          <Link to={{ pathname: '/show', state: post }}>
            <p className="postcard-title text-shadow">{post.title}</p>
          </Link>
          <p className="postcard-info">{post.comment}</p>
          <p>Submitted by:  {post.author} on {formatDate(post.updatedAt)+''}</p>
          <p>Comments:  {props.posts[i].location.length-1}</p>
        </div>
        <div className="postcard-btns">
          <Link 
            to={{
              pathname: '/edit',
              state: post
            }}
          >
          <button className="postcard-edit-btn add-post btn-floating btn-large">Edit</button>
          </Link>
            <button className="postcard-delete-btn add-post btn-floating btn-large" onClick={() => props.deleteLocation(post._id)}>Delete</button>
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
