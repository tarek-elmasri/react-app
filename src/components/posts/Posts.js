import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from './Post'
import Loading from '../../utilities/Loading'
import { Link } from 'react-router-dom'


export default function Posts() {
  //API
  const posts_api = process.env.REACT_APP_API_GET_POSTS
  //posts
  const [Posts, setPosts] = useState([])
  // context
  
  const [Errors, setErrors] = useState([])
  const [postsIsLoading , setPostsIsLoading] = useState(true)

  useEffect(() => {
    
    Axios.get(posts_api)
      .then(res => {
        setPostsIsLoading(false)
        setPosts(res.data.posts)
      })
      .catch(err=> {
        setPostsIsLoading(false)
        setErrors(['unable to fetch data'])
      })
  }, [])

  
  return postsIsLoading ?  <Loading /> : (
    <div className='bg-dark'>
      <div className='container-fluid'>
        {Errors.length > 0 ? <div className='alert alert-danger'>{Errors} </div> : null }
        <div className='row justify-content-center'>
          <div className='col-md-10 text-center'>
            <div className='mt-5 article-top' >
              <h1>Articles</h1><br/>
            </div>
            <Link className='btn btn-outline-primary btn-md text-left' to='/posts/new'>New Post</Link>
            <div className='row justify-content-center '>
              {Posts.map(post =>(
                <Post key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
