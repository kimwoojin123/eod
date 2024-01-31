import { connectDB, closeConnection, client } from '../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const idUrl = req.nextUrl.pathname;
    const id = idUrl.split('/').pop();
    console.log(id)

    if (!id) {
      throw new Error('Invalid id format');
    }
    
    await removeFromMongoDB(id);

    return NextResponse.json({ message: '데이터가 성공적으로 삭제되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting data from MongoDB:', error);
    return NextResponse.json({ error: '데이터를 삭제하는 중에 오류가 발생했습니다.' }, { status: 500 });
  } finally {
    await closeConnection();
  }
}

async function removeFromMongoDB(id: string) {
  await client.db('eoddb').collection('ideas').deleteOne({ _id: new ObjectId(id) });
}