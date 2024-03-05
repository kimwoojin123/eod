import { connectDB, closeConnection, client } from '../../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const jsonData = await req.json();
    const {team_id} = jsonData
    const idPath = req.nextUrl.pathname;
    const user_id = idPath.split('/').pop();

    if(!user_id){
      throw new Error('Invalid id format');
    }

    await addTeamMember(team_id, user_id);
    const approvedState= await approveApplicant(team_id, user_id)

    return NextResponse.json({ approvedState }, { status: 200 });
  } catch (error) {
    console.error('지원자 승인 중 오류가 발생했습니다:', error);
    return NextResponse.json({ error: '지원자 승인 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

async function addTeamMember(team_id: string, user_id: string) {
  await client.db('eoddb').collection('teams').updateOne(
    { _id: new ObjectId(team_id) },
    { $addToSet: { teamMember: user_id } }
  );
}

async function approveApplicant(team_id: string, user_id: string) {
  await client.db('eoddb').collection('teamApply').updateOne(
    { team_id: new ObjectId(team_id), user_id: new ObjectId(user_id) },
    { $set: { approved: true } }
  );
}