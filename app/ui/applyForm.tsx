'use client'

import { useState } from 'react'
import { getUsernameSomehow } from '@/app/ui/getUsername';

export default function ApplyForm(){
  const [formData, setFormData] = useState({
    image: null,
    name: '',
    lang: 'JavaScript',
    purpose: '',
    headCount: '',
  });

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
      const response = await fetch('/api/team-apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, ...formData, imageUrl }),
      });
  
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('에러 발생:', error);
    }
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
          <input type="text" id="headCount" name="headCount"
          className="border-boutline-none pl-2 border border-gray-300"
          onChange={handleChange}
          />
        </div>
        <button
            className="bg-blue-500 text-white px-5 py-3 rounded-md text-xl"
            type="button"
            onClick={handleSubmit}
        >등록</button>
      </form>
    </div>
  )
}