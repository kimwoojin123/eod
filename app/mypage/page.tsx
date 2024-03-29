import ResignButton from "../ui/mypage/resignButton"
import UserInfo from "../ui/mypage/userInfo"
import UserEditButton from "../ui/mypage/userEditButton"
import TeamListButton from "../ui/mypage/teamListButton"
import TeamManageButton from "../ui/mypage/teamManageButtont"
import Link from "next/link"
import IdeaListButton from "../ui/mypage/ideaList"

export default function MyPage(){
  return (
    <div className="flex flex-col w-full justify-center items-center pr-10">
      <div className="text-4xl font-semibold mb-12 mt-40 text-white">MYPAGE</div>
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <div>
          <div className="text-xl font-medium mb-4">
            <UserInfo />
          <div className="h-2 w-full bg-gray-300 mb-4"></div>
          </div>
          <div className="mb-8">
          <div className="text-xl font-medium">나의 아이디어</div>
          <div className="h-2 w-full bg-gray-300 mb-2"></div>
          <div className="flex flex-col">
            <IdeaListButton />
          </div>
        </div>
        <div className="text-xl font-medium">나의 팀정보</div>
        </div>
        <div className="h-2 w-full bg-gray-300 mb-2"></div>
        <div className="flex flex-col mb-8">
          <TeamManageButton />
          </div>
        <div className="mb-8">
          <div className="text-xl font-medium">나의 계정정보</div>
          <div className="h-2 w-full bg-gray-300 mb-2"></div>
          <div className="flex flex-col">
            <UserEditButton />
            <ResignButton />
          </div>
        </div>
      </div>
    </div>
  );
}