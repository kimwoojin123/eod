import { connectDB, closeConnection, client } from '../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const jsonData = await req.json();
    const { ideaId, userId, teamId } = jsonData;

    // MongoDB에 저장
    await saveToMongoDB({ ideaId, userId, teamId });

    return NextResponse.json({ message: '데이터가 성공적으로 저장되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
    return NextResponse.json({ error: '데이터를 저장하는 중에 오류가 발생했습니다.' }, { status: 500 });
  }
}

async function saveToMongoDB(data: { ideaId: ObjectId; userId:ObjectId; teamId: ObjectId; }) {
  const { ideaId, userId, teamId } = data;
  
  await client.db('eoddb').collection('ideaRequest').insertOne({ ideaId, userId, teamId });
}