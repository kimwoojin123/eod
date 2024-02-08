import { connectDB, closeConnection, client } from '../../../../utills/db'
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const path = req.nextUrl.pathname
    const username = path.split('/').pop();
    console.log(username)
    
    const user = await client.db('eoddb').collection('users').findOne({ username });
    if (!user) {
      throw new Error('Invalid ID format');
    }
    
    return NextResponse.json({ userId: user._id });
  } catch (error) {
    console.error('Error fetching user ID:', error);
    return NextResponse.json({ error: 'Failed to fetch approval status' }, { status: 500 });
  } finally {
    await closeConnection();
  }
}