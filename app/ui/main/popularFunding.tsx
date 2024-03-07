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
        const response = await fetch('/api/funding/get-funding', { cache: 'no-store' });
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
    <div className="w-3/12 mt-10">
      <h1 className="text-xl text-white mb-4">Popular Fundings</h1>
      <div className='p-4 flex flex-col justify-start mix-blend-screen bg-white/10 rounded-3xl' style={{ height: '580px' }}>
        {fundings.map((funding, index) => (
          <div key={funding._id} className="py-2 cursor-pointer text-white" onClick={() => handleFundingClick(funding._id)}>
            <p className="hover:underline flex items-center text-white">{`${index + 1}. ${funding.title}`} <CurrencyDollarIcon className="w-5 h-5 ml-2" /> {funding.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}