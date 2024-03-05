'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link';

interface Funding{
  _id : string;
  imageUrl : string;
  title : string;
}

export default function FundingList() {
  const [fundingData, setFundingData] = useState<Funding[]>([]);

  useEffect(() => {
    const fetchFundingData = async () => {
      try {
        const response = await fetch('/api/funding/funding-list', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to fetch funding data');
        }
        const data = await response.json();
        setFundingData(data);
      } catch (error) {
        console.error('Error fetching funding data:', error);
      }
    };

    fetchFundingData();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fundingData.map((item) => (
          <li key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link href={`/funding/${item._id}`}>
      
                <div className="relative h-60">
                  <Image src={item.imageUrl} alt={item.title} layout="fill" objectFit="contain" />
                </div>
                <div className="p-4">
                  <p className="text-lg font-semibold">{item.title}</p>
                </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}