import { connectDB, closeConnection, client } from '../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const path = req.nextUrl.pathname; 
    const ideaId = path.split('/').pop();

    // 해당 아이디어에 대한 지원 목록 가져오기
    const appliedIdeas = await client.db('eoddb').collection('ideaApply').find({ idea_id: new ObjectId(ideaId) }).toArray();

    return NextResponse.json(appliedIdeas, { status: 200 });
  } catch (error) {
    console.error('Error fetching applied ideas:', error);
    return NextResponse.json({ error: '아이디어 지원 목록을 불러오는 중에 오류가 발생했습니다.' }, { status: 500 });
  } finally {
    await closeConnection();
  }
}