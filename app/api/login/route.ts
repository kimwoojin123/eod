import { connectDB, closeConnection, client } from '../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
const secretKey = crypto.randomBytes(32).toString('hex');

export async function POST(req:NextRequest) {
  const formData = await req.formData()
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  await connectDB();

  try {
    const user = await getUserByUsername(username);
    const tokenPayload = {
      username : username
    }
    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });
    if (user && password === user.password) {
      return NextResponse.json({ message: '로그인이 완료되었습니다.', token }, { status: 200 });
    } else {
      return NextResponse.json({ message: '로그인 실패. 사용자 정보를 확인하세요.' }, { status: 401 });
    }
  } catch (error) {
    console.error('로그인 중 오류:', error);
    return NextResponse.json({ message: '로그인 중 오류가 발생했습니다.' }, { status: 500 });
  } finally {
    await closeConnection();
  }
}

export async function getUserByUsername(username: string) {
const user = await client.db('eoddb').collection('users').findOne({ username });
return user;
}