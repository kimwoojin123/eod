import Link from 'next/link';

export default function FundingFormButton() {
  return (
    <Link href="/funding/fundingCreate">
      <p className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
        펀딩 등록
      </p>
    </Link>
  );
}