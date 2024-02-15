'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';

interface Funding {
  _id: string;
  title: string;
  amount: number;
}

export default function PopularFundingList() {
  const [fundings, setFundings] = useState<Funding[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPopularFundings = async () => {
      try {
        const response = await fetch('/api/get-funding');
        if (!response.ok) {
          throw new Error('Failed to fetch popular fundings');
        }
        const data = await response.json();
        const sortedFundings = data.sort((a: Funding, b: Funding) => b.amount - a.amount).slice(0, 10);
        setFundings(sortedFundings);
      } catch (error) {
        console.error('Error fetching popular fundings:', error);
      }
    };

    fetchPopularFundings();
  }, []);

  const handleFundingClick = (id: string) => {
    router.push(`/funding/${id}`);
  };

  return (
    <div className="w-1/5 mt-10">
      <h1 className="text-xl font-bold mb-4">인기 펀딩 리스트</h1>
      <div className="border border-gray-300 p-4" style={{ height: '580px' }}>
        {fundings.map((funding, index) => (
          <div key={funding._id} className="py-2 cursor-pointer" onClick={() => handleFundingClick(funding._id)}>
            <p className="hover:underline flex items-center">{`${index + 1}. ${funding.title}`} <CurrencyDollarIcon className="w-5 h-5 ml-2" /> {funding.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}