import { connectDB, closeConnection, client } from '../../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const path = req.nextUrl.pathname;
    const id = path.split('/').pop();

    const funding = await client.db('eoddb').collection('funding').findOne({ _id: new ObjectId(id) });

    if (!funding) {
      return NextResponse.json({ error: '해당하는 펀딩을 찾을 수 없습니다.' }, { status: 404 });
    }

    // 펀딩의 ideaId를 사용하여 ideas 컬렉션의 데이터 가져오기
    const idea = await client.db('eoddb').collection('ideas').findOne({ _id: new ObjectId(funding.ideaId) });

    if (!idea) {
      return NextResponse.json({ error: '해당하는 아이디어를 찾을 수 없습니다.' }, { status: 404 });
    }

    // 펀딩 및 아이디어 데이터를 클라이언트로 전송
    return NextResponse.json({ funding, idea }, { status: 200 });
  } catch (error) {
    console.error('개별 펀딩을 가져오는 중에 오류가 발생했습니다:', error);
    return NextResponse.json({ error: '펀딩 정보를 불러오는 중에 오류가 발생했습니다.' }, { status: 500 });
  }
}