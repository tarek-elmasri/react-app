import React, { useContext } from 'react'
import {Link } from 'react-router-dom'
import appContext from '../../utilities/appContext'

export default function Header() {
  const [user,setUser] = useContext(appContext)

  function signout(){
    localStorage.clear()
    setUser({logged_in: false})
  }
  return (
    <div className='jumbotron jumb-padding'>
        <div className='container-fluid text-center'>
          <div className='row justify-content-center'>
            <div className='col-12'>
              <h1>
                Welcome to my React v.2 App
              </h1>
              {user.logged_in && <small>{user.username}</small>}
              <p>this is a simpile practice for react posts app</p>
              <Link to='/posts' className='btn btn-success m-2'>Dashboard</Link>
              {user.logged_in ? <Link to='/'className='btn btn-danger m-2' onClick={signout}>Sign Out</Link> :
              <Link to='/login' className='btn btn-primary m-2'>Login</Link>}
            </div>
          </div>
        </div>
      </div>
  )
}
