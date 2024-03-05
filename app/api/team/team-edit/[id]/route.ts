import { connectDB, closeConnection, client } from '../../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const path = req.nextUrl.pathname; // Assuming the id is part of the URL parameters
    const id = path.split('/').pop();
    const jsonData = await req.json();
    const { name, lang, purpose, headCount, tag } = jsonData;

    if (!id) {
      throw new Error('Invalid id format');
    }
    // MongoDB에서 해당 아이디에 해당하는 문서를 찾아 업데이트
    await updateToMongoDB(id, { name, lang, purpose, headCount, tag });

    return NextResponse.json({ message: '데이터가 성공적으로 업데이트되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('Error updating data in MongoDB:', error);
    return NextResponse.json({ error: '데이터를 업데이트하는 중에 오류가 발생했습니다.' }, { status: 500 });
  }
}

async function updateToMongoDB(id: string, data: { name:string, lang:string, purpose:string, headCount:number, tag:string }) {
  const { name, lang, purpose, headCount, tag } = data;

  await client.db('eoddb').collection('teams').updateOne(
    { _id: new ObjectId(id) }, // 해당 id에 해당하는 문서를 찾아 업데이트
    {
      $set: {
        name,
        lang,
        purpose,
        headCount,
        tag,
      },
    }
  );
}