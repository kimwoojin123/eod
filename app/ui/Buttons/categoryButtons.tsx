import Link from "next/link"
import Image from 'next/image'

export function IdeaApplyButton(){
  return <Link href="/ideaApply" className="mb-3 flex justify-center items-center"><Image src="/pencil.svg" alt="apply" width={23} height={20}/><p className="ml-4 category-menu hover:text-white">Apply Idea</p></Link>
}


export function IdeaSearchButton(){
  return <Link href="/ideaSearch" className="mb-3 flex justify-center items-center"><Image src="/search.svg" alt="apply" width={23} height={26}/><p className="ml-4 category-menu hover:text-white">Search Idea</p></Link>
}


export function TeamSearchButton(){
  return <Link href="/teamSearch" className="mb-3 flex justify-center items-center"><Image src="/people.svg" alt="apply" width={23} height={20}/><p className="ml-4 category-menu hover:text-white">Teams</p></Link>

}


export function FundingButton(){
  return <Link href="/funding" className=" flex justify-center items-center"><Image src="/dollar.svg" alt="apply" width={23} height={20}/><p className="ml-4 category-menu hover:text-white">Funding</p></Link>

}