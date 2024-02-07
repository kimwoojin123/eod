import Link from 'next/link'

export default function TeamManageButton() {
  return (
    <Link href="/mypage/teamManage">
        <span className="hover:underline">팀 관리하기</span>
    </Link>
  );
}