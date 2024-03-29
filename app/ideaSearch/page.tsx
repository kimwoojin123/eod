'use client'

import React, { useState, useEffect, Suspense } from 'react';
import { ObjectId } from 'mongodb';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import SearchComponent from '../ui/ideaSearch/search';
import { HeartIcon } from '@heroicons/react/24/solid';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import CustomModal from '../ui/modal';

interface BoardItem {
  _id: ObjectId;
  username: string;
  title: string;
  addDate: string;
  content : string;
  likes:string;
  replies: ObjectId[];
}

const IdeasPerPage = 4;

export default function IdeaSearch(){
  const [boardList, setBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false)

  const PageGroupSize = 5;

  useEffect(() => {
    const fetchBoardList = async () => {
      try {
          const response = await fetch('/api/idea/board-list', { cache: 'no-store' });
          const data = await response.json();
          setTotalPages(Math.ceil(data.length / IdeasPerPage));
          setBoardList(data.reverse().slice((currentPage - 1) * IdeasPerPage, currentPage * IdeasPerPage));
        
      } catch (error) {
        console.error('Error fetching board list:', error);
      }
    };
    fetchBoardList();
  }, [currentPage, searchResults]);


  
  const handlePageChange = (newPage: number) => {
    router.push(`/ideaSearch?page=${newPage}`);
    setCurrentPage(newPage);
  };

  const renderPageButtons = () => {
    const pages = [];
    const startPage = Math.floor((currentPage - 1) / PageGroupSize) * PageGroupSize + 1;

    for (let i = startPage; i < startPage + PageGroupSize; i++) {
      if (i <= totalPages) {
        pages.push(
          <button
            key={i}
            className={`mx-1 px-3 py-1 border rounded ${i === currentPage ? 'bg-gray-300 text-black' : 'text-white'}`}
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
    fetch(`/api/idea/search/${searchOption}/${searchText}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.searchResults);
        console.log(data)
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
    <div className='h-full overflow-x-hidden w-full items-center flex flex-col pr-96 mt-20'>
        <div className="flex justify-center items-start w-screen">
      <button className="rounded-xl bg-gray-300 w-28 h-10 relative left-28" onClick={handleShowAll}>전체 글 보기</button>
      <table className="table-auto w-8/12 border border-collapse mb-10 mt-14">
        <thead>
          <tr className='bg-gray-300'>
            <th className="w-1/5 px-4 py-2 border-b border-r">작성자</th>
            <th className="w-3/5 px-4 py-2 border-b border-r">글 제목</th>
            <th className="w-1/5 px-4 py-2 border-b">작성일시</th>
          </tr>
        </thead>
        <tbody>
    {searchResults.length > 0 ? (
      searchResults.map((item: BoardItem, index: number) => (
        <tr key={item._id.toString()}>
          <td className="px-4 py-2 border-b border-r text-white">{item.username}</td>
          <td className="px-4 py-2 border-b border-r text-white">
            <Link href={`/ideaSearch/${item._id}`}>
              {item.title}
            </Link>
          </td>
          <td className="px-4 py-2 border-b text-white">{item.addDate}</td>
        </tr>
      ))
    ) : (
    boardList.map((item: BoardItem, index: number) => (
      <tr key={item._id.toString()}>
        <td className="px-4 py-2 border-b border-r text-white">{item.username}</td>
        <td className="px-4 py-2 border-b border-r flex items-center text-white">
          <Link href={`/ideaSearch/${item._id}`}>
            {item.title}
          </Link>
            <ChatBubbleOvalLeftEllipsisIcon className='w-4 h-4 ml-3'/>{item.replies?.length || 0}
            <HeartIcon className='w-4 h-4 text-red-500 ml-2'/>{item.likes}
        </td>
        <td className="px-4 py-2 border-b text-white">{item.addDate}</td>
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
          className="mx-1 px-3 py-1 border rounded text-white"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          >
          {'<'}
        </button>
        {renderPageButtons()}
        <button
          className="mx-1 px-3 py-1 border rounded text-white"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          >
          {'>'}
        </button>
      </div>
      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} width='360px' height='180px'>
        <p>{message}</p>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
      </CustomModal>
    </div>
  );
}
