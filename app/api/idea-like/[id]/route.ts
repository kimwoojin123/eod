import { connectDB, closeConnection, client } from '../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const jsonData = await req.json();
    const { username } = jsonData
    console.log(username)
    const path = req.nextUrl.pathname;
    const id = path.split('/').pop();
    console.log(id)

    if (!username) {
      return NextResponse.json({ error: '유저 정보를 가져올 수 없습니다.' }, { status: 400 });
    }

    // 좋아요를 누른 사용자의 _id 가져오기
    const user = await client.db('eoddb').collection('users').findOne({ username });
    const userId = user?._id;

    if (!userId) {
      return NextResponse.json({ error: '유저 정보를 찾을 수 없습니다.' }, { status: 400 });
    }

    // 해당 아이디어 업데이트
    const updatedIdea = await client.db('eoddb').collection('ideas').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $inc: { likes: 1 }, $addToSet: { likedBy: userId } },
      { returnDocument: 'after' } // 업데이트 이후의 문서를 반환
    );

    return NextResponse.json(updatedIdea.likes);
  } catch (error) {
    console.error('Error updating idea:', error);
    return NextResponse.json({ error: '아이디어를 업데이트하는 중에 오류가 발생했습니다.' }, { status: 500 });
  } finally {
    await closeConnection();
  }
}