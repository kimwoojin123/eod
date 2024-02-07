import Link from 'next/link'

export default function TeamListButton() {
  return (
    <Link href="/mypage/teamList">
        <span className="hover:underline">팀 목록보기</span>
    </Link>
  );
}