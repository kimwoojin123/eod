import { connectDB, closeConnection, client } from '../../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const path = req.nextUrl.pathname; 
    const username = path.split('/').pop();

    const userData = await client.db('eoddb').collection('users').findOne({ username });

    if (userData) {
      return NextResponse.json(userData, { status: 200 });
    } else {
      return NextResponse.json({ message: '사용 가능한 아이디입니다.' }, { status: 404 }); 
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: '유저정보를 불러오는 중에 오류가 발생했습니다.' }, { status: 500 });
  } 
}