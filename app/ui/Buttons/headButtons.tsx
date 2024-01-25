'use client'

export function Reload(){
  const reloadPage = () =>{
    window.location.href="/"
  }

  return (
    <button onClick={reloadPage}>EveryOneDeveloper</button>
  )
}