import { NextRequest, NextResponse } from 'next/server';
import { connectDB, closeConnection, client } from '../../../../utills/db'
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const path = req.nextUrl.pathname;
    const id = path.split('/').pop();

    const { amount, username } = await req.json();

    await client.db('eoddb').collection('funding').updateOne(
      { _id: new ObjectId(id) },
      { $inc: { amount: parseInt(amount) } }
    );

    // 예시: fundUser 컬렉션에 사용자와 펀딩 관련 정보 추가
    await client.db('eoddb').collection('fundUser').insertOne({
      funding_id: new ObjectId(id),
      username,
      amount: parseInt(amount)
    });

    // 성공적인 응답 반환
    return NextResponse.json({ message: '펀딩이 성공적으로 완료되었습니다.' }, {status:200});
  } catch (error) {
    // 오류 발생 시 오류 응답 반환
    console.error('펀딩 오류:', error);
    return NextResponse.json({ error: '펀딩 중 오류가 발생했습니다.' }, {status:500});
  }
}