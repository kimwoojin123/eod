import { NextRequest, NextResponse } from 'next/server';
import { connectDB, closeConnection, client } from '../../../../../utills/db'
import { ObjectId } from 'mongodb';

export async function PUT(req: NextRequest) {
  try {
    const path = req.nextUrl.pathname; 
    const ideaId = path.split('/').pop();
    const data = await req.json();
    const approved = data.approved

    console.log(approved)
    console.log(ideaId)

    
    await connectDB();

    // 아이디어 업데이트
    await client
      .db('eoddb')
      .collection('ideaApply')
      .updateOne(
        { ideaId: ideaId },
        { $set: { approved: approved } } // 승인 상태 업데이트
      );

      const countApprovedApply = await client
      .db('eoddb')
      .collection('ideaApply')
      .countDocuments({ ideaId: ideaId, approved: true });

    const countApprovedRequest = await client
      .db('eoddb')
      .collection('ideaRequest')
      .countDocuments({ ideaId: ideaId, approved: true });

    const matched = countApprovedApply > 0 || countApprovedRequest > 0;

    // ideas 컬렉션의 matched 필드 업데이트
    await client
      .db('eoddb')
      .collection('ideas')
      .updateOne(
        { _id: new ObjectId(ideaId) },
        { $set: { matched: matched } } // matched 필드 업데이트
      );
      
    return NextResponse.json({ message : '성공적으로 업데이트 되었습니다'}, {status:200});
  } catch (error) {
    console.error('Error updating idea approval status:', error);
    return NextResponse.error();
  }
}