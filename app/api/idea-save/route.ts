import { connectDB, closeConnection, client } from '../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const jsonData = await req.json();
    const { textContent, imageUrl } = jsonData;

    // MongoDB에 저장
    await saveToMongoDB({ textContent, imageUrl });

    return NextResponse.json({ message: '데이터가 성공적으로 저장되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
    return NextResponse.json({ error: '데이터를 저장하는 중에 오류가 발생했습니다.' }, { status: 500 });
  } finally {
    await closeConnection();
  }
}

async function saveToMongoDB(data: { textContent: string; imageUrl: string }) {
  // MongoDB에 데이터 저장하는 로직 작성
  const { textContent, imageUrl } = data;
  // 예시: ideas 컬렉션에 데이터 추가
  await client.db('eoddb').collection('ideas').insertOne({ textContent, imageUrl });
}