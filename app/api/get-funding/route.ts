import { connectDB, closeConnection, client } from '../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';


export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const fundingList = await client.db('eoddb').collection('funding').find().toArray();

    return NextResponse.json(fundingList, { status: 200 });
  } catch (error) {
    console.error('Error fetching funding list:', error);
    return NextResponse.json({ error: '펀딩 목록을 불러오는 중에 오류가 발생했습니다.' }, { status: 500 });
  } 
}