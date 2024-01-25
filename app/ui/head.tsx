import { ReloadButton, MyPageButton, SignUpButton, LoginButton } from "./Buttons/headButtons"


export default function Head(){
  return (
    <div className="flex w-screen h-14 bg-gray-300 justify-between items-center">
      <div className="ml-10"><ReloadButton /></div>
      <div className="w-96 flex justify-between mr-20">
        <MyPageButton />
        <SignUpButton />
        <LoginButton />
      </div>
    </div>
  )
}