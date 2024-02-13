import { NextRequest, NextResponse } from 'next/server';
import { connectDB, closeConnection, client } from '../../../../utills/db'
import { ObjectId } from 'mongodb';

export async function PUT(req: NextRequest) {
  try {
    const path = req.nextUrl.pathname; 
    const ideaId = path.split('/').pop();
    const data = await req.json();
    const approved = data.approved

    console.log(approved)

    await connectDB();

    // 아이디어 업데이트
    await client
      .db('eoddb')
      .collection('ideaApply')
      .updateOne(
        { _id: new ObjectId(ideaId) },
        { $set: { approved: approved } } // 승인 상태 업데이트
      );

    return NextResponse.json({ message : '성공적으로 업데이트 되었습니다'}, {status:200});
  } catch (error) {
    console.error('Error updating idea approval status:', error);
    return NextResponse.error();
  }
}