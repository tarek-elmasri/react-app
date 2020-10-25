import React, { useContext, useEffect } from 'react'
import appContext from './appContext'

export default function Flash() {
  const [,,flash,setFlash] = useContext(appContext)


  useEffect(() => {
    setTimeout(()=>{
      setFlash({active:false , msg:"" , type:""})
    },3000)
  }, [])
  return (
    <div className={`alert alert-${flash.type} flash-margin`}>
      {flash.msg}
    </div>
  )
}
