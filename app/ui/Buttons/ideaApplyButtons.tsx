import Link from 'next/link'

export function IdeaWriteButton(){
  return <Link href="/ideaApply/ideaWrite" className="bg-gray-300 w-80 h-80 rounded-xl"><p className='flex h-full justify-center items-center'>아이디어 작성</p></Link>

}

export function IdeaDrawButton(){
  return <Link href="/ideaApply/ideaDraw" className="bg-gray-300 w-80 h-80 rounded-xl"><p className='flex h-full justify-center items-center'>아이디어 그리기</p></Link>

}