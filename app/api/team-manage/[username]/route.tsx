import { connectDB, closeConnection, client } from '../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
  try{
    await connectDB();
    const path = req.nextUrl.pathname
    const username = path.split('/').pop();
    const teams = await client.db('eoddb').collection('teams').find({ username: username }).toArray();

    return NextResponse.json(teams, {status:200});
  } catch (error) {
    console.error('팀 데이터 조회 중 오류 발생:', error);
    return NextResponse.json({ error: '데이터를 저장하는 중에 오류가 발생했습니다.' }, { status: 500 });
  }
}