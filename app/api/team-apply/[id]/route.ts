import { connectDB, closeConnection, client } from '../../../../utills/db'
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { stack, content, username } = await req.json();
    const path = req.nextUrl.pathname;
    const id = path.split('/').pop();

    // 사용자 ID 가져오는 로직 추가
    const user = await client.db('eoddb').collection('users').findOne({ username });
    const user_id = user._id;

    const teamApplyData = {
      team_id: new ObjectId(id),
      user_id: user_id,
      stack: stack,
      content: content,
    };

    const result = await client.db('eoddb').collection('teamApply').insertOne(teamApplyData);

    if (result.insertedId) {
      return NextResponse.json({ message: '팀 지원이 성공적으로 제출되었습니다.' }, { status: 200 });
    } else {
      return NextResponse.json({ error: '팀 지원 제출 중 오류가 발생했습니다.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error submitting team application:', error);
    return NextResponse.json({ error: '팀 지원 제출 중 오류가 발생했습니다.' }, { status: 500 });
  } 
}