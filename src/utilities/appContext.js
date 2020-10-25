import React from 'react'

const appContext= React.createContext({
  user: {
    logged_in:false
  }
})
export default appContext;
//  const [user,setUser,flash,setFlash] = useContext(appContext)
