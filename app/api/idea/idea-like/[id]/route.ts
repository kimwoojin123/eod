import { connectDB, closeConnection, client } from '../../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const jsonData = await req.json();
    const { username } = jsonData;

    const path = req.nextUrl.pathname;
    const id = path.split('/').pop();

    if (!username) {
      return NextResponse.json({ error: '유저 정보를 가져올 수 없습니다.' }, { status: 400 });
    }

    // 해당 아이디어 조회
    const idea = await client.db('eoddb').collection('ideas').findOne({ _id: new ObjectId(id) });

    if (!idea) {
      return NextResponse.json({ error: '아이디어를 찾을 수 없습니다.' }, { status: 404 });
    }

    // 이미 좋아요를 누른 경우 취소, 아니면 좋아요 추가
    const isLiked = idea.likedBy.includes(username);

    const update = isLiked
      ? { $inc: { likes: -1 }, $pull: { likedBy: username } }
      : { $inc: { likes: 1 }, $addToSet: { likedBy: username } };

      if (!idea.likedBy) {
        update.$addToSet = { likedBy: username };
      }

    // 해당 아이디어 업데이트
    const updatedIdea = await client.db('eoddb').collection('ideas').findOneAndUpdate(
      { _id: new ObjectId(id) },
      update,
      { returnDocument: 'after' } // 업데이트 이후의 문서를 반환
    );

    // 클라이언트에 전송할 데이터 가공
    const responseData = {
      likes: updatedIdea.likes,
      likedBy: updatedIdea.likedBy,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error updating idea:', error);
    return NextResponse.json({ error: '아이디어를 업데이트하는 중에 오류가 발생했습니다.' }, { status: 500 });
  }
}