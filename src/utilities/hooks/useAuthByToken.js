import Axios from 'axios'
import ls from 'local-storage'


export default function AuthByToken() {

  function fetch(setUser,api,params){
      Axios.post(api , params)
      .then(res=> {
        setUser({...res.data.user , logged_in: true})
        ls.set('user' , {...res.data.user,logged_in: true})
      })
      .catch(err=>{
        ls.clear()
        setUser({logged_in: false})
      })
      
  }

  return fetch
}
