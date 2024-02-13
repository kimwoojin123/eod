import Link from 'next/link'

export default function IdeaListButton() {
  return (
    <Link href="/mypage/ideaList">
        <span className="hover:underline">아이디어 목록보기</span>
    </Link>
  );
}