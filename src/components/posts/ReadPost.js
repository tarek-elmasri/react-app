import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams} from 'react-router-dom'
import Loading from '../../utilities/Loading'

export default function ReadPost() {
  const history= useHistory()
  const {id} = useParams();
  const [Post, setPost] = useState({title: "" , body: "" , id: null})
  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {

    Axios.get(`/api/v1/posts/${id}`)
    .then(res => {
      setIsLoading(false)
      setPost(res.data.post)
    })
    .catch(err=>{
      setIsLoading(false)
        history.replace('/post?err=res&ds_pNF')
    })
    
  }, [])

  

  return  isLoading ? <Loading /> : (
    <div>
      {Post.title}<br/>
      {Post.body}
    </div>
  )
}
