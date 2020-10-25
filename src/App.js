import React, { useEffect, useState} from 'react';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import ls from 'local-storage'
//context 
import appContext from './utilities/appContext'
//components and hooks
import Navbar from './components/Navbar';
import PageNotFound from './components/PageNotFound';
import Flash from './utilities/Flash';
import routes from './utilities/routes/routes'
import AuthRoutes from './utilities/routes/AuthRoutes';
import GuestRoutes from './utilities/routes/GuestRoutes';
import FreeRoute from './utilities/routes/FreeRoute';
import useAuthByToken from './utilities/hooks/useAuthByToken'



function App() {
  //api keys
  const auth_api = process.env.REACT_APP_API_USERS_AUTH
  //context values 
  const [User, setUser] = useState({logged_in:null})
  const [flash,setFlash] =useState({active: false , msg: "",type: ""})
  //auth func()
  const authByToken= useAuthByToken()
  //if current user => check valid token and renew
  useEffect(() => {
    const stored_user = ls.get('user')
    if (stored_user){
    authByToken(setUser,auth_api,{token : stored_user.token})
    }else{
      setUser({logged_in: false})
    }
    
  }, [])
  
  return (

    <Router>
      <appContext.Provider value={[User,setUser,flash,setFlash]}>
        <Navbar />
        {flash.active && <Flash />}
        <Switch>
          {routes.map(route =>{
            if(route.protected==="auth") {
              return <AuthRoutes path={route.path} exact={route.exact} component={route.component} key={route.key} />
            }else if(route.protected ==='guest'){
              return <GuestRoutes path={route.path} exact={route.exact} component={route.component} key={route.key} />
            }else if(route.protected==="free"){
              return <FreeRoute path={route.path} exact={route.exact} component={route.component} key={route.key} />
            }
            })}
          <Route component={PageNotFound} />
        </Switch>
      </appContext.Provider>
    </Router>
  );
}
export default App;
