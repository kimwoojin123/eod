'use client'

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import FundingModal from '@/app/ui/funding/fundingModal';

interface Funding{
  imageUrl : string;
  title: string;
  textContent : string;
  quillImageUrl : string;
  amount : number;
}
interface Idea{
  title : string;
}

export default function FundingPage() {
  const idPath = usePathname();
  const id = idPath.split('/').pop();
  const [fundingData, setFundingData] = useState<Funding | null>(null);
  const [ideaData, setIdeaData] = useState<Idea | null>(null);
  const [fundingAmount, setFundingAmount] = useState<Funding | null>(null); // 펀딩 금액 상태 추가


  useEffect(() => {
    const fetchFundingData = async () => {
      try {
        const response = await fetch(`/api/funding-detail/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch funding data');
        }
        const { funding, idea } = await response.json();
        setFundingData(funding);
        setIdeaData(idea);
        setFundingAmount(funding);
      } catch (error) {
        console.error('Error fetching funding data:', error);
      }
    };

    if (id) {
      fetchFundingData();
    }
  }, [id]);

  if (!fundingData || !ideaData || fundingAmount === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Image src={fundingData.imageUrl} alt={fundingData.title} width={200} height={200} />
        <div className="ml-4">
          <p className="text-lg font-semibold">아이디어명: {ideaData.title}</p>
          <p className="text-lg font-semibold">펀딩금액 : {fundingAmount.amount}원</p>
          <FundingModal />
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg p-4">
        <Image src={fundingData.quillImageUrl} alt='추가이미지' width={300} height={300} className="mb-4" />
        <div className="text-sm text-gray-700 prose" dangerouslySetInnerHTML={{ __html: fundingData.textContent }} />
      </div>
    </div>
  );
}