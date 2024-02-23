import { connectDB, closeConnection, client } from '../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const path = req.nextUrl.pathname;
    const id = path.split('/').pop();
    
    const replies = await client.db('eoddb').collection('reply').find({ ideaId : id }).toArray();
    if (!replies) {
      return NextResponse.json({ error: '해당하는 댓글목록을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(replies, { status: 200 });
  } catch (error) {
    console.error('Error fetching individual idea:', error);
    return NextResponse.json({ error: '댓글 정보를 불러오는 중에 오류가 발생했습니다.' }, { status: 500 });
  }
}