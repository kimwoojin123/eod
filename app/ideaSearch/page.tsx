'use client'

import React, { useState, useEffect } from 'react';
import { ObjectId } from 'mongodb';
import Link from 'next/link'
import BackButton from '../ui/Buttons/backButton';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

interface BoardItem {
  _id: ObjectId;
  username: string;
  title: string;
  addDate: string;
}

const IdeasPerPage = 2;

export default function IdeaSearch(){
  const [boardList, setBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const params = useSearchParams();

  const PageGroupSize = 5;

  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        const response = await fetch('/api/board-list');
        const data = await response.json();
        setTotalPages(Math.ceil(data.length / IdeasPerPage));
        setBoardList(data.reverse().slice((currentPage - 1) * IdeasPerPage, currentPage * IdeasPerPage));
      } catch (error) {
        console.error('Error fetching board list:', error);
      }
    };

    fetchBoardList();
  }, [currentPage]);
  
  
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

  return (
    <div>
      <BackButton />
        <div className="flex justify-center items-start w-screen h-screen">
      <table className="table-auto w-8/12 border border-collapse">
        <thead>
          <tr className='bg-gray-100'>
            <th className="w-1/5 px-4 py-2 border-b border-r">작성자</th>
            <th className="w-3/5 px-4 py-2 border-b border-r">글 제목</th>
            <th className="w-1/5 px-4 py-2 border-b">작성일시</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map((item: BoardItem, index: number) => (
            <tr key={item._id.toString()}>
              <td className="px-4 py-2 border-b border-r">{item.username}</td>
              <td className="px-4 py-2 border-b border-r">
                <Link href={`/ideaSearch/${item._id}`}>
                  {item.title}
                </Link>
              </td>
              <td className="px-4 py-2 border-b">{item.addDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
}
