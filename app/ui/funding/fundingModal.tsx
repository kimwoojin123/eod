'use client'

import { useState } from 'react';
import Modal from 'react-modal';
import { getUsernameSomehow } from '@/app/ui/getUsername';
import { usePathname } from 'next/navigation';

export default function FundingModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fundingAmount, setFundingAmount] = useState('');

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
      // Modal close or any other action after successful funding
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error funding:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>펀딩하기</button>
      <Modal 
      isOpen={modalIsOpen} 
      onRequestClose={() => setModalIsOpen(false)}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: " rgba(0, 0, 0, 0.4)",
          width: "100%",
          height: "100vh",
          zIndex: "10",
          position: "fixed",
          top: "0",
          left: "0",
        },
        content: {
          display: "flex",
          flexDirection: "column",
          alignItems: 'center',
          width: "360px",
          height: "180px",
          zIndex: "150",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
          boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
          backgroundColor: "white",
          justifyContent: "center",
          overflow: "auto",
          whiteSpace: 'pre-line',
        },
      }}
      contentLabel="펀딩 모달"
      >
        <input
          type="text"
          placeholder="펀딩할 금액을 입력하세요"
          value={fundingAmount}
          onChange={(e) => setFundingAmount(e.target.value)}
        />
        <button onClick={handleSubmit}>펀딩하기</button>
      </Modal>
    </div>
  );
}