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
        const response = await fetch('/api/funding-list');
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
    <div>
      <ul>
        {fundingData.map((item) => (
          <li key={item._id}>
            <Link href={`/funding/${item._id}`}>
            <Image src={item.imageUrl} alt={item.title} height={200} width={200} />
            <p>{item.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}