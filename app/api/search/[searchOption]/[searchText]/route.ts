import { connectDB, closeConnection, client } from '../../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';


interface Query {
  [key: string]: { $regex: string; $options: string };
}

export async function GET(req:NextRequest){
  try{
    await connectDB();
    const path = req.nextUrl.pathname
    console.log(path)
    const searchOption = path.split('/')[2]
    const searchText = path.split('/').pop()

  
    if (searchOption === null) {
      closeConnection();
      return NextResponse.json({ error: 'Invalid search option' }, { status: 400 });
    }

    const query: Query = {};
    
    query[searchOption] = { $regex: searchText || '', $options: 'i' };

    const searchResults = await client.db('eoddb').collection('ideas').find(query).toArray();

    closeConnection();
    return NextResponse.json({searchResults}, {status: 200})
  } catch (error) {
    console.error('Error processing search request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}