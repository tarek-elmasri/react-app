import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import ls from 'local-storage'


export default function AuthByEmailAndPassword() {
  const history = useHistory()
  
  function fetch(setIsLoading,setUser,api,params,setErrors){
      setIsLoading(true)
      Axios.post(api , params)
      .then(res=> {
        setIsLoading(false)
        setUser({...res.data.user , logged_in: true})
        ls.set('user' , {...res.data.user,logged_in: true})
        history.replace("/")
      })
      .catch(err=>{
        setIsLoading(false)
        ls.clear()
        setErrors([
          err.response.status===504 ? 'Unable to connect to server' :
          err.response.data.errors
        ])
      })
      
  }

  return fetch
}
