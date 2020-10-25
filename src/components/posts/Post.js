import React from 'react'
import { Link } from 'react-router-dom'

export default function Post({post}) {
  return (
    <div className='col-md-4 col-sm-8 '>
      <div className='card mt-5 card-bg'>
        <div className='card-header card-header-style'>
          {post.title}
        </div>
        <div className='card-body card-body-style text-left'>
          { (post.body.length > 50) ? post.body.slice(0,49) + '...' : post.body}
        </div>
        <div className='card-footer card-footer-style'>
          <Link to={`/posts/${post.id}`} className='btn btn-secondary card-btn-style'>Read more</Link>
        </div>
      </div>
    </div>
  )
}