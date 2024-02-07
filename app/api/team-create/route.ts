import { connectDB, closeConnection, client } from '../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const jsonData = await req.json();
    const { username, name, lang, purpose, headCount, imageUrl, tag } = jsonData;

    // MongoDB에 저장
    await saveToMongoDB({ username, name, lang, purpose, headCount, imageUrl, tag });

    return NextResponse.json({ message: '데이터가 성공적으로 저장되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
    return NextResponse.json({ error: '데이터를 저장하는 중에 오류가 발생했습니다.' }, { status: 500 });
  } finally {
    await closeConnection();
  }
}

async function saveToMongoDB(data: {
  username: string;
  name: string;
  lang: string;
  purpose: string;
  headCount: string;
  imageUrl: string;
  tag: string;
}) {
  const { username, name, lang, purpose, headCount, imageUrl, tag } = data;

  // MongoDB에 저장하는 코드 추가
  await client.db('eoddb').collection('teams').insertOne({
    username,
    name,
    lang,
    purpose,
    headCount,
    imageUrl,
    tag,
  });
}