import { MyPageButton, AuthButton } from "./Buttons/headButtons"


export default function Head(){
  return (
    <div className="flex">
        <div className="flex items-center">
        <AuthButton />
        </div>
    </div>
  )
}