import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams} from 'react-router-dom'
import Loading from '../../utilities/Loading'

export default function ReadPost() {
  const posts_api= process.env.REACT_APP_API_GET_POSTS
  const history= useHistory()
  const {id} = useParams();
  const [Post, setPost] = useState({title: "" , body: "" , id: null})
  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {

    Axios.get(`${posts_api}/${id}`)
    .then(res => {
      setIsLoading(false)
      setPost(res.data.post)
    })
    .catch(err=>{
      setIsLoading(false)
        history.replace('/post?err=postnotfound')
    })
    
  }, [])

  

  return  isLoading ? <Loading /> : (
    <div className='container-fluid mt-4'>
      <div className='row justify-content-center'>
        <div className='col-sm-10 col-md-10'>
          <h1 className='headerH1'>{Post.title} :</h1>
          <br/>
          <p className='headerSmall'>
            {Post.body}
          </p>

        </div>
      </div>
    </div>
  )
}
