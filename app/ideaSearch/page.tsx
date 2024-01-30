'use client'

import React, { useState, useEffect } from 'react';
import { ObjectId } from 'mongodb';
import Link from 'next/link'

interface BoardItem {
  _id: ObjectId;
  username: string;
  title: string;
  addDate: string;
}

export default function IdeaSearch(){
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        const response = await fetch('/api/board-list');
        const data = await response.json();
        setBoardList(data);
      } catch (error) {
        console.error('Error fetching board list:', error);
      }
    };

    fetchBoardList();
  }, []); 
  return (
    <div className="flex justify-center items-center w-screen h-screen">
        <table className="table-auto w-8/12 border border-collapse">
        <thead>
          <tr>
            <th className="w-1/5 px-4 py-2 border-b border-r">작성자</th>
            <th className="w-3/5 px-4 py-2 border-b border-r">글 제목</th>
            <th className="w-1/5 px-4 py-2 border-b">작성일시</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map((item: BoardItem, index: number) => (
            <tr key={item._id.toString()} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="px-4 py-2 border-b border-r">{item.username}</td>
              <td className="px-4 py-2 border-b border-r">                
              <Link href={`/ideaSearch/${item._id}`}>
                  {item.title}
              </Link></td>
              <td className="px-4 py-2 border-b">{item.addDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}