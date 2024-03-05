'use client'

import { useState } from 'react';
import { getUsernameSomehow } from '@/app/ui/getUsername';
import { usePathname } from 'next/navigation';
import CustomModal from '../modal';

export default function FundingModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fundingAmount, setFundingAmount] = useState('');
  const [isFundingSuccess, setIsFundingSuccess] = useState(false);

  const idPath =  usePathname();
  const id = idPath.split('/').pop();

  const handleSubmit = async () => {
    try {
      const username = getUsernameSomehow();
      const response = await fetch(`/api/fund/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: fundingAmount, username }),
      });
      if (!response.ok) {
        throw new Error('Failed to fund');
      }
      setIsFundingSuccess(true);
      // 초기화
      setFundingAmount('');
    } catch (error) {
      console.error('Error funding:', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsFundingSuccess(false); // 모달이 닫힐 때 펀딩 성공 상태 초기화
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
        펀딩하기
      </button>
      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} width='360px' height='180px'>
        {!isFundingSuccess ? (
          <>
            <input
              type="text"
              placeholder="펀딩할 금액을 입력하세요"
              value={fundingAmount}
              onChange={(e) => setFundingAmount(e.target.value)}
              className="border border-gray-300 rounded mb-2 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              펀딩하기
            </button>
          </>
        ) : (
          <>
            <p className="mb-4 text-lg text-center">펀딩이 성공적으로 완료되었습니다.</p>
            <button onClick={closeModal} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              닫기
            </button>
          </>
        )}
      </CustomModal>
    </div>
  );
}