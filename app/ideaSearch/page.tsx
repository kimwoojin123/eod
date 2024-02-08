'use client'

import React, { useState, useEffect } from 'react';
import { ObjectId } from 'mongodb';
import Link from 'next/link'
import BackButton from '../ui/Buttons/backButton';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import SearchComponent from '../ui/ideaSearch/search';
import Modal from 'react-modal';
import { HeartIcon } from '@heroicons/react/24/solid';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';

interface BoardItem {
  _id: ObjectId;
  username: string;
  title: string;
  addDate: string;
  content : string;
  likes:string;
  replies: ObjectId[];
}

const IdeasPerPage = 2;

export default function IdeaSearch(){
  const [boardList, setBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const params = useSearchParams();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false)

  const PageGroupSize = 5;

  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        let response;
  
        if (searchResults.length === 0) {
          response = await fetch('/api/board-list');
          const data = await response.json();
          setTotalPages(Math.ceil(data.length / IdeasPerPage));
          setBoardList(data.reverse().slice((currentPage - 1) * IdeasPerPage, currentPage * IdeasPerPage));
        }
      } catch (error) {
        console.error('Error fetching board list:', error);
      }
    };
    fetchBoardList();
  }, [currentPage, searchResults]);


  useEffect(() => {
    const page = parseInt(params.get('page') as string, 10) || 1;
    setCurrentPage(page);
  }, [params]);

  const handlePageChange = (newPage: number) => {
    router.push(`/ideaSearch?page=${newPage}`);
  };

  const renderPageButtons = () => {
    const pages = [];
    const startPage = Math.floor((currentPage - 1) / PageGroupSize) * PageGroupSize + 1;

    for (let i = startPage; i < startPage + PageGroupSize; i++) {
      if (i <= totalPages) {
        pages.push(
          <button
            key={i}
            className={`mx-1 px-3 py-1 border rounded ${i === currentPage ? 'bg-gray-300' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    }

    return pages;
  };


  const handleSearch = (searchOption :string, searchText:string) => {
    if(searchText.length > 0){
    fetch(`/api/search?searchOption=${searchOption}&searchText=${searchText}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.searchResults);
      })
      .catch((error) => console.error('Error fetching search results:', error));
    } else {
      setMessage('검색어를 1글자 이상 입력하세요')
      openModal();
    }
  };

  const handleShowAll = () => {
    setSearchResults([]); 
    router.push('/ideaSearch');
  };


  return (
    <div className='h-screen p-4'>
      <BackButton />
      <button className="rounded-xl bg-gray-300 w-28 h-10 ml-80 mb-5" onClick={handleShowAll}>전체 글 보기</button>
        <div className="flex justify-center items-start w-screen">
      <table className="table-auto w-8/12 border border-collapse mb-10">
        <thead>
          <tr className='bg-gray-100'>
            <th className="w-1/5 px-4 py-2 border-b border-r">작성자</th>
            <th className="w-3/5 px-4 py-2 border-b border-r">글 제목</th>
            <th className="w-1/5 px-4 py-2 border-b">작성일시</th>
          </tr>
        </thead>
        <tbody>
    {searchResults.length > 0 ? (
      searchResults.map((item: BoardItem, index: number) => (
        <tr key={item._id.toString()}>
          <td className="px-4 py-2 border-b border-r">{item.username}</td>
          <td className="px-4 py-2 border-b border-r">
            <Link href={`/ideaSearch/${item._id}`}>
              {item.title}
            </Link>
          </td>
          <td className="px-4 py-2 border-b">{item.addDate}</td>
        </tr>
      ))
    ) : (
    boardList.map((item: BoardItem, index: number) => (
      <tr key={item._id.toString()}>
        <td className="px-4 py-2 border-b border-r">{item.username}</td>
        <td className="px-4 py-2 border-b border-r flex items-center">
          <Link href={`/ideaSearch/${item._id}`}>
            {item.title}
          </Link>
            <ChatBubbleOvalLeftEllipsisIcon className='w-4 h-4 ml-3'/>{item.replies?.length || 0}
            <HeartIcon className='w-4 h-4 text-red-500 ml-2'/>{item.likes}
        </td>
        <td className="px-4 py-2 border-b">{item.addDate}</td>
      </tr>
    ))
  )}
</tbody>
      </table>
    </div>
    <div className='flex justify-center'>
      <SearchComponent onSearch={handleSearch} />
    </div>
    <div className="flex justify-center mt-4">
        <button
          className="mx-1 px-3 py-1 border rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        {renderPageButtons()}
        <button
          className="mx-1 px-3 py-1 border rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {'>'}
        </button>
      </div>
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
        contentLabel="아이디어 검색 모달"
      >
        <p>{message}</p>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
}
