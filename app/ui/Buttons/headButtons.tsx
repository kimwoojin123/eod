'use client'
import Link from 'next/link'


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
  return <Link href='signup'>회원가입</Link>
}


export function LoginButton(){
  return (
    <button>로그인</button>
  )
}