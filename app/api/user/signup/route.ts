import { connectDB, closeConnection } from '../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';
import User from '../../../models/user'


export async function POST(req:NextRequest) {
 
  const formData = await req.formData()
  const name = formData.get('name');
  const username = formData.get('username');
  const password = formData.get('password');
  const email = formData.get('email');
  const address = formData.get('address');
  const phoneNumber = formData.get('phoneNumber');


  let client;

  try{
    // Connect to MongoDB
    client = await connectDB();

    // Create a new User instance
    const newUser = new User({
      name,
      username,
      password,
      email,
      address,
      phoneNumber,
      activate:true,
    });

    // Save the new user to MongoDB
    await newUser.save();

    // Send a successful response
    return NextResponse.json({ message: '회원가입이 완료되었습니다.' }, {status:200});
  } catch (error) {
    console.error('Error during user registration:', error);
    return NextResponse.json({ message: '회원가입 중 오류가 발생했습니다.' }, { status: 500 });
  } 
}