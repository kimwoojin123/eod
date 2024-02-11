import { connectDB, closeConnection, client } from '../../../utills/db'
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb


export async function POST(req: NextRequest) {
  try {
    const { ideaId, teamId, content } = req.body;
    await connectDB();

    // ideaApply 컬렉션에 데이터 추가
    const response = await client.db('eoddb').collection('ideaApply').insertOne({
      idea_id: new ObjectId(ideaId), // 클라이언트에서 전달된 아이디어 ID를 사용
      content,
      developer: teamId,
    });

    if (response.insertedId) {
      return NextResponse.json({ message: '아이디어 지원이 성공적으로 제출되었습니다.' }, { status: 200 });
    } else {
      return NextResponse.json({ error: '아이디어 지원 제출에 실패했습니다.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error submitting idea support:', error);
    return NextResponse.json({ error: '아이디어 지원 제출에 실패했습니다.' }, { status: 500 });
  } finally {
    await closeConnection();
  }
}