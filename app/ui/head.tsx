import { MyPageButton, AuthButton } from "./Buttons/headButtons"


export default function Head(){
  return (
    <div className="flex bg-gray-400">
        <div className="flex items-center">
        <MyPageButton />
        </div>
        <div className="flex items-center">
        <AuthButton />
        </div>
    </div>
  )
}