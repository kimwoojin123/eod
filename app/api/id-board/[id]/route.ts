import { connectDB, closeConnection, client } from '../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const path = req.nextUrl.pathname; // Assuming the id is part of the URL parameters
    const id = path.split('/').pop();

    const idea = await client.db('eoddb').collection('ideas').findOne({ _id: new ObjectId(id) });

    if (!idea) {
      return NextResponse.json({ error: '해당하는 아이디어를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(idea, { status: 200 });
  } catch (error) {
    console.error('Error fetching individual idea:', error);
    return NextResponse.json({ error: '아이디어 정보를 불러오는 중에 오류가 발생했습니다.' }, { status: 500 });
  } finally {
    await closeConnection();
  }
}