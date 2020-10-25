import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import appContext from '../utilities/appContext'

export default function Navbar(route) {

  const [user,setUser,,setFlash] = useContext(appContext)
  
  function signout(){
    setUser({logged_in:false})
    localStorage.clear()
    setFlash({active: true , msg: "Logged Out Successfully" , type: "success"})
  }
  return (    
    <div className='navbar navbar-expand-md navbar-dark bg-dark'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'> Posts App v.2</Link>
        <button className='navbar-toggler' data-toggle='collapse' data-target='#navbarRes'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarRes'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/posts'>Articles</Link>
            </li>
            {user.logged_in ? <li className='nav-item'><Link className='nav-link' to="/" onClick={signout}>SignOut</Link></li>:
            <React.Fragment>
              <li className='nav-item'>
                <Link className='nav-link' to='/login'>Login</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/register'>Register</Link>
              </li>
            </React.Fragment>
            }
          </ul>
        </div>
      </div>
    </div>
  )
}
