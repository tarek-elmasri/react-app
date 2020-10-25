import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import appContext from '../appContext'
import Loading from '../Loading'

export default function AuthRoutes(props) {
    const [user,,,setFlash] = useContext(appContext)

    if(user.logged_in===null){
        return <Loading />
    }
    if(user.logged_in) {
        return <Route {...props} />
    }
    if (!user.logged_in){
        setFlash({active:true , type:"danger" ,msg: "please log in first"})
        return <Redirect to="/login" {...props} ></Redirect>
    }
}
