import Link from 'next/link'

export function IdeaWriteButton(){
  return <Link href="/ideaApply/ideaWrite" className="mix-blend-screen w-80 h-80 rounded-3xl bg-white/10 hover:bg-gray-800"><p className='flex h-full justify-center items-center text-white'>Apply Idea</p></Link>

}

export function IdeaDrawButton(){
  return <Link href="/ideaApply/ideaDraw" className="bg-gray-300 w-80 h-80 rounded-xl"><p className='flex h-full justify-center items-center'>아이디어 그리기</p></Link>

}