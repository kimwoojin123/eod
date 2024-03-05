import { connectDB, closeConnection, client } from '../../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const path = req.nextUrl.pathname;
    const id = path.split('/').pop();

    const team = await client.db('eoddb').collection('teams').findOne({ _id: new ObjectId(id) });

    if (!team) {
      return NextResponse.json({ error: '해당하는 팀를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(team, { status: 200 });
  } catch (error) {
    console.error('Error fetching individual idea:', error);
    return NextResponse.json({ error: '팀 정보를 불러오는 중에 오류가 발생했습니다.' }, { status: 500 });
  } 
}