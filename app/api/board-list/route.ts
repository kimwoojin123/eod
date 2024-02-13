import { connectDB, closeConnection, client } from '../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const boardList = await client.db('eoddb').collection('ideas').find().toArray();

    return NextResponse.json(boardList, { status: 200 });
  } catch (error) {
    console.error('Error fetching board list:', error);
    return NextResponse.json({ error: '게시판 목록을 불러오는 중에 오류가 발생했습니다.' }, { status: 500 });
  } 
}