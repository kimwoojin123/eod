'use client'

import { useState } from 'react'
import { getUsernameSomehow } from '@/app/ui/getUsername';
import { useRouter } from 'next/navigation'
import Modal from 'react-modal'

export default function FundingForm(){
  const [formData, setFormData] = useState({
    image: null,
  });
  const [message, setMessage] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {setModalIsOpen(false); router.back()}


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const files = fileInput.files;
  
      if (files && files.length > 0) {
        const imageFile = files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataURL = reader.result as string;
          setFormData((prevData) => ({
            ...prevData,
            [name]: dataURL,
          }));
        };
        reader.readAsDataURL(imageFile);
              }
    } else {
      // 이미지가 아닌 경우
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const imageResponse = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dataURL: formData.image }),
      });
  
      const { imageUrl } = await imageResponse.json();
      const username = getUsernameSomehow();
      const response = await fetch('/api/funding-regist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, ...formData, imageUrl }),
      });
      if(response.ok){
      setMessage('팀 등록이 완료되었습니다.')
      openModal();
    }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };



  return (
    <div className="container mx-auto p-4 mt-32 relative left-1/4">
      <h1 className="text-3xl font-bold mb-6">펀딩 등록</h1>
      <form className="flex flex-col">
        <div className="mb-4">
          <label htmlFor="image" className="text-2xl font-bold" style={{ lineHeight: "2" }}>이미지 : </label>
          <input type="file" id="image" name="image"
          className="w-full max-w-md"
          onChange={handleChange}
          />
        </div>
       <button
            className="bg-blue-500 text-white px-5 py-3 rounded-md text-xl w-1/4"
            type="button"
            onClick={handleSubmit}
        >등록</button>
      </form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
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
            display:"flex",
            flexDirection : "column",
            alignItems : 'center',
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
        contentLabel="펀딩 등록 모달"
      >
        <p>{message}</p>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  )
}