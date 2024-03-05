import { connectDB, closeConnection, client } from '../../../../../utills/db'
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

interface Applicant{
  user_id: ObjectId;
}
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const idPath = req.nextUrl.pathname;
    const teamIdString = idPath.split('/').pop();
    const teamId = new ObjectId(teamIdString);

    const applicants = await client.db('eoddb').collection('teamApply').find({ team_id: teamId }).toArray();
      
    const promises = applicants.map(async (applicant : Applicant) => {
      const user = await client.db('eoddb').collection('users').findOne({ _id: applicant.user_id });
      return {
        ...applicant,
        user_info: user // 지원자 정보와 함께 사용자 정보도 반환
       };
     });

      const applicantsWithUserInfo = await Promise.all(promises);

      return NextResponse.json({ applicants: applicantsWithUserInfo }, { status: 200 });
    } catch (error) {
      console.error('지원자 정보 조회 중 오류 발생:', error);
      return NextResponse.json({ error: '지원자 정보를 불러오는 중에 오류가 발생했습니다.' }, { status: 500 });
    } 
  }
