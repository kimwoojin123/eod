import { ReloadButton, MyPageButton, AuthButton } from "./Buttons/headButtons"


export default function Head(){
  return (
    <div className="flex w-screen h-14 bg-gray-400 justify-between items-center">
      <div className="ml-10"><ReloadButton /></div>
      <div className="w-96 flex justify-between mr-20">
        <div className="flex items-center">
        <MyPageButton />
        </div>
        <div className="flex items-center">
        <AuthButton />
        </div>
      </div>
    </div>
  )
}