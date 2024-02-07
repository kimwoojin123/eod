import { connectDB, closeConnection, client } from '../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const jsonData = await req.json();
    const {team_id} = jsonData
    const idPath = req.nextUrl.pathname;
    const user_id = idPath.split('/').pop();
    console.log(user_id);
    console.log(team_id);
    
    if(!user_id){
      throw new Error('Invalid id format');
    }

    await addTeamMember(team_id, user_id);

    return NextResponse.json({ message: '지원자가 성공적으로 승인되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('지원자 승인 중 오류가 발생했습니다:', error);
    return NextResponse.json({ error: '지원자 승인 중 오류가 발생했습니다.' }, { status: 500 });
  } finally {
    await closeConnection();
  }
}

async function addTeamMember(team_id: string, user_id: string) {
  await client.db('eoddb').collection('teams').updateOne(
    { _id: new ObjectId(team_id) },
    { $addToSet: { teamMember: user_id } }
  );
}