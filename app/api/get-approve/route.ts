import { connectDB, closeConnection, client } from '../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const jsonData = await req.json();
    const { team_id } = jsonData;

    if (!team_id) {
      throw new Error('Invalid team ID format');
    }

    const approvedState = await getApprovalStatus(team_id);

    return NextResponse.json({ approvedState }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch approval status:', error);
    return NextResponse.json({ error: 'Failed to fetch approval status' }, { status: 500 });
  }
}

async function getApprovalStatus(team_id: string) {
  const teamApply = await client.db('eoddb').collection('teamApply').findOne(
    { team_id: new ObjectId(team_id) }
  );

  return teamApply ? teamApply.approved : false; // 팀에 대한 승인 상태 반환
}