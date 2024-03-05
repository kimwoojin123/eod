import { connectDB, closeConnection, client } from '../../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const path = req.nextUrl.pathname; // Assuming the id is part of the URL parameters
    const id = path.split('/').pop();
    const jsonData = await req.json();
    const { title, textContent, imageUrl } = jsonData;

    if (!id) {
      throw new Error('Invalid id format');
    }
    // MongoDB에서 해당 아이디에 해당하는 문서를 찾아 업데이트
    await updateToMongoDB(id, { title, textContent, imageUrl });

    return NextResponse.json({ message: '데이터가 성공적으로 업데이트되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('Error updating data in MongoDB:', error);
    return NextResponse.json({ error: '데이터를 업데이트하는 중에 오류가 발생했습니다.' }, { status: 500 });
  }
}

async function updateToMongoDB(id: string, data: { title: string; textContent: string; imageUrl: string }) {
  const { title, textContent, imageUrl } = data;

  const currentDate = new Date();
  const timeZone = 'Asia/Seoul';

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

  await client.db('eoddb').collection('ideas').updateOne(
    { _id: new ObjectId(id) }, // 해당 id에 해당하는 문서를 찾아 업데이트
    {
      $set: {
        title,
        textContent,
        imageUrl,
        addDate: formattedDateTime,
      },
    }
  );
}