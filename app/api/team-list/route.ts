import { connectDB, closeConnection, client } from '../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(){
  try{
    await connectDB();
    const teams = await client.db('eoddb').collection('teams').find().toArray();

    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    console.error('Error fetching team data:', error);
    return NextResponse.json({ error: 'Failed to fetch team data' }, { status: 500 });
  } 
}