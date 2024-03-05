import { connectDB, closeConnection, client } from '../../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const idPath = req.nextUrl.pathname;
    const teamId = idPath.split('/').pop();

    // teamId에 해당하는 모든 ideaRequest 가져오기
    const ideaRequests = await client.db('eoddb').collection('ideaRequest').find({ teamId: teamId }).toArray();
    // 각 ideaRequest에 대한 아이디어 가져오기
    const detailedRequests = await Promise.all(ideaRequests.map(async (request:any) => {
      const idea = await client.db('eoddb').collection('ideas').findOne({ _id: new ObjectId(request.ideaId) });
      return idea;
    }));
    
    return NextResponse.json({detailedRequests, ideaRequests}, { status: 200 });
  } catch (error) {
    console.error('Error fetching idea requests:', error);
    return NextResponse.json({ error: '정보를 불러오는 중에 오류가 발생했습니다.' }, { status: 500 });
  }
}