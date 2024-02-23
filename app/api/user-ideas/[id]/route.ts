import { connectDB, closeConnection, client } from '../../../../utills/db'
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const path = req.nextUrl.pathname
    const username = path.split('/').pop();
    
    const ideas = await client.db('eoddb').collection('ideas').find({ username }).toArray();
    if (!ideas) {
      throw new Error('No ideas found for this user');
    }
    
    return NextResponse.json(ideas);
  } catch (error) {
    console.error('Error fetching user ideas:', error);
    return NextResponse.json({ error: 'Failed to fetch user ideas' }, { status: 500 });
  }
}