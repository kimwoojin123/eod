'use client'

import { useRouter } from 'next/navigation'

export default function BackButton(){
  const router = useRouter();
  
  return <svg xmlns="http://www.w3.org/2000/svg" width="15" height="25" viewBox="0 0 15 25" fill="none" onClick={()=>router.back()} className='cursor-pointer'>
  <path d="M14.1406 3.55235L5.5692 12.1238L14.1406 20.6952L12.4263 24.1238L0.426343 12.1238L12.4263 0.123779L14.1406 3.55235Z" fill="#23A6F0"/>
  </svg>
}