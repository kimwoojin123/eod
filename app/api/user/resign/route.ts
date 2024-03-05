import { connectDB, closeConnection, client } from '../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const jsonData = await req.json();
    const { username } = jsonData;

    await client.db('eoddb').collection('users').updateOne(
      { username : username }, // 해당 id에 해당하는 문서를 찾아 업데이트
      {
        $set: {
          activate : false,
        },
      }
    );

    return NextResponse.json({ message: '데이터가 성공적으로 업데이트되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('Error updating data in MongoDB:', error);
    return NextResponse.json({ error: '데이터를 업데이트하는 중에 오류가 발생했습니다.' }, { status: 500 });
  }
}
