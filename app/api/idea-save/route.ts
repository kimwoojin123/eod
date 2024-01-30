import { connectDB, closeConnection, client } from '../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const jsonData = await req.json();
    const { username, title, textContent, imageUrl } = jsonData;

    // MongoDB에 저장
    await saveToMongoDB({ username, title, textContent, imageUrl });

    return NextResponse.json({ message: '데이터가 성공적으로 저장되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
    return NextResponse.json({ error: '데이터를 저장하는 중에 오류가 발생했습니다.' }, { status: 500 });
  } finally {
    await closeConnection();
  }
}



async function saveToMongoDB(data: { username:string; title:string; textContent: string; imageUrl: string }) {
  const { username, title, textContent, imageUrl } = data;
  const currentDate = new Date();
  const timeZone = 'Asia/Seoul'; // 선택적으로 'Asia/Seoul' 또는 'Asia/Korea'를 사용할 수 있습니다.

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const [
    { value: month },,
    { value: day },,
    { value: year },,
    { value: hour },,
    { value: minute },,
    { value: second },
  ] = formatter.formatToParts(currentDate);
  const formattedHour = hour === '24' ? '00' : hour;
  const formattedDateTime = `${year}-${month}-${day} ${formattedHour}:${minute}:${second}`;


  await client.db('eoddb').collection('ideas').insertOne({ username, title, textContent, imageUrl, addDate:formattedDateTime });
}