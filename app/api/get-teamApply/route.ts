import { connectDB, closeConnection, client } from '../../../utills/db'
import { NextRequest, NextResponse } from 'next/server';

interface TeamApplyCount {
  _id: string;
  count: number;
}


export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const teamApplyCount: TeamApplyCount[] = await client.db('eoddb').collection('teamApply')
      .aggregate([
        { $group: { _id: '$team_id', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 } 
      ]).toArray();

    const popularTeams = [];
    for (const { _id } of teamApplyCount) {
      const teamInfo = await client.db('eoddb').collection('teams').findOne({ _id });
      if (teamInfo) {
        popularTeams.push({ ...teamInfo, applicants: teamApplyCount.find(item => item._id === _id)?.count || 0 });
      }
    }

    return NextResponse.json(popularTeams, { status: 200 });
  } catch (error) {
    console.error('Error fetching popular teams:', error);
    return NextResponse.json({ error: '인기 있는 팀을 가져오는 중에 오류가 발생했습니다.' }, { status: 500 });
  }
}