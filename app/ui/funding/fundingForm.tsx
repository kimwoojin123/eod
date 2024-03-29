'use client'

import { useState, useEffect } from 'react';
import { getUsernameSomehow } from '@/app/ui/getUsername';
import { useRouter } from 'next/navigation';
import dynamic from "next/dynamic";
import CustomModal from '../modal';
const DynamicTextEditor = dynamic(() => import('@/app/ui/textEditor'), { ssr: false });

interface Idea {
  _id: string;
  title: string;
  matched: boolean;
}

export default function FundingForm() {
  const [editorValue, setEditorValue] = useState<string>('');
  const [formData, setFormData] = useState({
    image: null,
    selectedIdeaId: null as string | null, 
    textEditorContent: '', 
  });
  const [message, setMessage] = useState('');
  const [ideaModalIsOpen, setIdeaModalIsOpen] = useState(false);
  const [fundingModalIsOpen, setFundingModalIsOpen] = useState(false);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [selectedIdeaTitle, setSelectedIdeaTitle] = useState('');
  const [title, setTitle] = useState<string>('');


  const router = useRouter();
  const handleEditorChange = (value: string) => {
    const contentWithoutImages = removeImageTagsAndContent(value);
    setEditorValue(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      textEditorContent: contentWithoutImages,
    }));
  };
  
  const handleTitleChange = (value : string) => {
    setTitle(value);
  };

  const removeImageTagsAndContent = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const images = doc.querySelectorAll('img');
    
    images.forEach((img) => img.remove());
    doc.body.innerHTML = doc.body.innerHTML.replace(/<img[^>]*>/g, ''); // 이미지 태그 삭제
    
    return doc.body.innerHTML;
  };


  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const username = getUsernameSomehow();
        const response = await fetch(`/api/idea/user-ideas/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ideas');
        }
        const data = await response.json();
        setIdeas(data);
      } catch (error) {
        console.error('Error fetching ideas:', error);
      }
    };
    fetchIdeas();
  }, []);

  const openIdeaModal = () => setIdeaModalIsOpen(true);
  const closeIdeaModal = () => setIdeaModalIsOpen(false);
  const openFundingModal = () => setFundingModalIsOpen(true);
  const closeFundingModal = () => {setFundingModalIsOpen(false); router.back()}

  const handleIdeaSelect = (ideaId: string, ideaTitle: string) => {
    setFormData({ ...formData, selectedIdeaId: ideaId });
    setSelectedIdeaTitle(ideaTitle);
    closeIdeaModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const fileInput = e.target;
      const files = fileInput.files;

      if (files && files.length > 0) {
        const imageFile = files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataURL = reader.result;
          setFormData((prevData) => ({
            ...prevData,
            [name]: dataURL,
          }));
        };
        reader.readAsDataURL(imageFile);
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const extractImageDataFromEditorValue = (editorValue: string) => {
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const matches = editorValue.match(imgRegex);
    if (matches) {
      const imageDataArray = matches.map((match) => {
        const srcRegex = /src="([^"]+)"/;
        const srcMatch = match.match(srcRegex);
        if (srcMatch && srcMatch[1]) {
          return srcMatch[1];
        }
        return null;
      });
      return imageDataArray.filter((data) => data !== null);
    }
    return [];
  };
  
  const imageDatas = extractImageDataFromEditorValue(editorValue);
  const handleSubmit = async () => {
    try {
      // 이미지 업로드
      const imageResponse = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dataURL: formData.image }),
      });
      if (!imageResponse.ok) {
        throw new Error('Failed to upload image');
      }
      const { imageUrl } = await imageResponse.json();
  
      // 텍스트 에디터 내 이미지 업로드
      const quillImageUploadPromises = imageDatas.map(async (dataURL: string | null) => {
        if (dataURL !== null) {
        const base64Data = dataURL.split(',')[1]; // data:image/png;base64, 부분을 제외한 base64 데이터 추출
        const quillImageResponse = await fetch('/api/upload-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ dataURL: `data:image/png;base64,${base64Data}` }), // 전체 데이터 전송
        });
        if (!quillImageResponse.ok) {
          throw new Error('Failed to upload quill image');
        }
        const { imageUrl } = await quillImageResponse.json();
        return imageUrl; // 이미지 URL만 반환
      }
      return null
      });
  
      const quillImageUrls = await Promise.all(quillImageUploadPromises);
      const quillImageUrl = quillImageUrls[0]

      const username = getUsernameSomehow();
      const response = await fetch('/api/funding/funding-regist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, ...formData, imageUrl, quillImageUrl, title }),
      });
      if (response.ok) {
        setMessage('펀딩이 등록되었습니다.');
        openFundingModal();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <div className='flex flex-col pl-96'>
      <h1 className="text-3xl font-bold mb-6 text-white">펀딩 등록</h1>
      <form className="flex flex-col">
        <div className="flex flex-col mb-4">
          <div className='flex'>
          <button
            className="bg-blue-500 text-white px-5 py-3 rounded-md text-xl w-1/4"
            type="button"
            onClick={openIdeaModal}
          >
            아이디어 선택
          </button>
          <div className="selected-idea-title flex justify-center items-center">{selectedIdeaTitle}</div> 
          </div>
          <div>
            <label htmlFor="image" className="text-2xl font-bold text-white" style={{ lineHeight: '2' }}>이미지 : </label>
            <input
              type="file"
              id="image"
              name="image"
              className="w-full max-w-md text-white"
              onChange={handleChange}
            />
          </div>
          <div className='w-screen flex mb-2'>
          <label htmlFor='title' className='text-white'>제목</label>
          <input className='ml-10 w-1/3 border-gray-400 border' type='text' id='title' value={title} onChange={(e) => handleTitleChange(e.target.value)} />
          </div>
          <DynamicTextEditor value={editorValue} onChange={handleEditorChange} />
        </div>
        <button
          className="bg-blue-500 text-white px-5 py-3 rounded-md text-xl w-1/4 mt-20"
          type="button"
          onClick={handleSubmit}
        >
          등록
        </button>
      </form>
      <CustomModal isOpen={ideaModalIsOpen} onRequestClose={closeIdeaModal} width='500px' height='700px'>
        <h1 className="text-2xl font-bold mb-4">아이디어 선택</h1>
        <ul>
          {ideas
          .filter(idea => idea.matched === true)
          .map((idea) => (
            <li key={idea._id} onClick={() => handleIdeaSelect(idea._id, idea.title)} className="cursor-pointer">
              {idea.title}
            </li>
          ))}
        </ul>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeIdeaModal}>닫기</button>
      </CustomModal>
      <CustomModal isOpen={fundingModalIsOpen} onRequestClose={closeFundingModal} width='360px' height='200px'>
        <p>{message}</p>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeFundingModal}>닫기</button>
      </CustomModal>
    </div>
  );
}