'use client'

export function ReloadButton(){
  const reloadPage = () =>{
    window.location.href="/"
  }

  return (
    <button onClick={reloadPage}>EveryOneDeveloper</button>
  )
}


export function MyPageButton(){
  return (
    <button>마이페이지</button>
  )
}


export function SignUpButton(){
  return (
    <button>회원가입</button>
  )
}


export function LoginButton(){
  return (
    <button>로그인</button>
  )
}