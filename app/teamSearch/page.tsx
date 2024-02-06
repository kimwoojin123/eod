import Link from 'next/link'
export default function TeamSearch(){
  return (
    <Link href="teamSearch/teamApply"><p className='flex justify-center items-center w-32 h-10 text-white bg-green-500 rounded-2xl'>팀 등록하기</p></Link>
  )
}