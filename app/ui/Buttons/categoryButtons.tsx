import Link from "next/link"

export function IdeaApplyButton(){
  return <Link href="/ideaApply" className="flex justify-center items-center"><p className="text-white">Apply Idea</p></Link>
}


export function IdeaSearchButton(){
  return <Link href="/ideaSearch" className="flex justify-center items-center"><p className="text-white">Search Idea</p></Link>
}


export function TeamSearchButton(){
  return <Link href="/teamSearch" className="flex justify-center items-center"><p className="text-white">Teams</p></Link>

}


export function FundingButton(){
  return <Link href="/funding" className="flex justify-center items-center"><p className="text-white">Funding</p></Link>

}