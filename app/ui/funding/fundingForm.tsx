'use client'

import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getUsernameSomehow } from '@/app/ui/getUsername';
import { useRouter } from 'next/navigation';
import dynamic from "next/dynamic";
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

  const router = useRouter();
  const handleEditorChange = (value: string) => {
    const contentWithoutImages = removeImageTagsAndContent(value);
    setEditorValue(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      textEditorContent: contentWithoutImages,
    }));
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
        const response = await fetch(`/api/user-ideas/${username}`);
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
      const response = await fetch('/api/funding-regist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, ...formData, imageUrl, quillImageUrl }),
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
    <div className="container mx-auto p-4 mt-32 relative left-1/4">
      <h1 className="text-3xl font-bold mb-6">펀딩 등록</h1>
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
            <label htmlFor="image" className="text-2xl font-bold" style={{ lineHeight: '2' }}>이미지 : </label>
            <input
              type="file"
              id="image"
              name="image"
              className="w-full max-w-md"
              onChange={handleChange}
            />
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
      <Modal
        isOpen={ideaModalIsOpen}
        onRequestClose={closeIdeaModal}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: ' rgba(0, 0, 0, 0.4)',
            width: '100%',
            height: '100vh',
            zIndex: '10',
            position: 'fixed',
            top: '0',
            left: '0',
          },
          content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '500px',
            height: '700px',
            zIndex: '150',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
            backgroundColor: 'white',
            justifyContent: 'center',
            overflow: 'auto',
            whiteSpace: 'pre-line',
          },
        }}
        contentLabel="아이디어 선택 모달"
      >
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
      </Modal>
      <Modal
        isOpen={fundingModalIsOpen}
        onRequestClose={closeFundingModal}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: ' rgba(0, 0, 0, 0.4)',
            width: '100%',
            height: '100vh',
            zIndex: '10',
            position: 'fixed',
            top: '0',
            left: '0',
          },
          content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '360px',
            height: '200px',
            zIndex: '150',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
            backgroundColor: 'white',
            justifyContent: 'center',
            overflow: 'auto',
            whiteSpace: 'pre-line',
          },
        }}
        contentLabel="펀딩 등록 모달"
      >
        <p>{message}</p>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeFundingModal}>닫기</button>
      </Modal>
    </div>
  );
}