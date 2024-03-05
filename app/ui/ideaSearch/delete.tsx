'use client'

import { useState } from 'react';
import CustomModal from '../modal';

interface DeleteProps {
  onDelete: () => void;
  onClose: () => void;
}

export default function Delete({ onDelete, onClose }: DeleteProps) {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const handleDelete = () => {
    onDelete();
    setModalIsOpen(false);
  };

  const handleClose = () => {
    onClose();
    setModalIsOpen(false);
  };

  return (
    <CustomModal isOpen={modalIsOpen} onRequestClose={handleClose} width='360px' height='180px'>
      <p>정말로 삭제하시겠습니까?</p>
      <button className="w-40 h-10 rounded-2xl bg-red-500 text-white mt-5" onClick={handleDelete}>
        삭제
      </button>
      <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-3" onClick={handleClose}>
        취소
      </button>
    </CustomModal>
  );
}