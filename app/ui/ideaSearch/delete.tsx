'use client'

import { useState } from 'react';
import Modal from 'react-modal';

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
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleClose}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.4)",
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
      contentLabel="글 삭제 모달"
    >
      <p>정말로 삭제하시겠습니까?</p>
      <button className="w-40 h-10 rounded-2xl bg-red-500 text-white mt-5" onClick={handleDelete}>
        삭제
      </button>
      <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-3" onClick={handleClose}>
        취소
      </button>
    </Modal>
  );
}