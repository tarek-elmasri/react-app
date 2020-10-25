import  { useState } from 'react'

export default function useDebounce() {
  
  const [funcTimeOut, setFuncTimout] = useState("")

  function debounce(func,wait=1000){

    clearTimeout(funcTimeOut)
    const timing= setTimeout(() => func(), wait);
    setFuncTimout(timing)
  }
  
return debounce

}
