'use client'

import { useState } from 'react'
import { getUsernameSomehow } from '@/app/ui/getUsername';
import { useRouter } from 'next/navigation'
import Modal from 'react-modal'

export default function CreateForm(){
  const [formData, setFormData] = useState({
    image: null,
    name: '',
    lang: 'JavaScript',
    purpose: '',
    headCount: 1,
    tag: '',
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
      const response = await fetch('/api/team-create', {
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

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    if (value.includes(',')) {
      value = value.replace(',', ' #');
      if (!value.startsWith('#')) {
        value = `#${value}`;
      }
    } else if (!value.startsWith('#')) { // 입력 값이 #로 시작하지 않는 경우
      value = `#${value}`;
    }
    setFormData((prevData) => ({
      ...prevData,
      tag: value,
    }));
  };



  return (
    <div className="container flex h-screen w-screen justify-center items-center">
      <form className="flex flex-col w-1/3">
        <div className="flex">
          <label htmlFor="image">이미지 : </label>
          <input type="file" id="image" name="image"
          className="w-full max-w-md"
          onChange={handleChange}
          />
        </div>
        <div className="flex">
          <label htmlFor="name">팀 명 : </label>
          <input type="text" id="name" name="name"
          className="border-boutline-none pl-2 border border-gray-300"
          onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lang">개발언어</label>
          <select id="lang" name="lang" onChange={handleChange}>
            <option>JavaScript</option>
            <option>Python</option>
            <option>C</option>
            <option>C++</option>
            <option>C#</option>
            <option>Java</option>
            <option>Go</option>
          </select>
        </div>
        <div>
          <label htmlFor="purpose">팀 목표 : </label>
          <input type="textarea" id="purpose" name="purpose"
          className="border-boutline-none pl-2 border border-gray-300"
          onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="headCount">모집 인원 : </label>
          <input type="number" min="1" id="headCount" name="headCount"
          className="border-boutline-none pl-2 border border-gray-300"
          value={formData.headCount}
          onChange={handleChange}
          />
        </div>
        <div>
        <label htmlFor="headCount">태그 등록 : </label>
          <input type="text" id="tag" name="tag"
          className="border-boutline-none pl-2 border border-gray-300"
          value={formData.tag}
          onChange={handleTagChange}
          />
        </div>
        <button
            className="bg-blue-500 text-white px-5 py-3 rounded-md text-xl"
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
        contentLabel="팀 등록 모달"
      >
        <p>{message}</p>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  )
}