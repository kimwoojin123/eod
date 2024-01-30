import Link from "next/link"

export function IdeaApplyButton(){
  return <Link href="/ideaApply" className="flex justify-center items-center w-40 h-20 bg-gray-200 rounded-lg shadow-md shadow-gray-400"><p>아이디어 등록</p></Link>
}


export function IdeaSearchButton(){
  return <Link href="/ideaSearch" className="flex justify-center items-center w-40 h-20 bg-gray-200 rounded-lg shadow-md shadow-gray-400"><p>아이디어 검색</p></Link>
}


export function TeamSearchButton(){
  return (
    <button className="w-40 h-20 bg-gray-200 rounded-lg shadow-md shadow-gray-400">팀 찾기</button>
  )
}


export function FundingButton(){
  return (
    <button className="w-40 h-20 bg-gray-200 rounded-lg shadow-md shadow-gray-400">펀딩</button>
  )
}