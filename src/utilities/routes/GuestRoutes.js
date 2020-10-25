import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import appContext from '../appContext'
import Loading from '../Loading'

export default function GuestRoutes(props) {
  const [user] = useContext(appContext)


  if (user.logged_in===null){
    return <Loading />
  }
  if (user.logged_in) {
    return <Redirect to="/" {...props}></Redirect>

  }
  if(!user.logged_in){
    return <Route {...props} ></Route>
  }
}
