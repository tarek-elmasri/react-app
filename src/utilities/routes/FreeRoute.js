import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import appContext from '../appContext'
import Loading from '../Loading'

export default function FreeRoute(props) {
    const [user] = useContext(appContext)

    if(user.logged_in===null){
        return <Loading />
    }
    else{
      return <Route {...props}></Route>
    }
}
