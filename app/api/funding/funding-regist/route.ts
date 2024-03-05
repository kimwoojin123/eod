import { connectDB, closeConnection, client } from '../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const jsonData = await req.json();
    const { username, title, selectedIdeaId, textEditorContent, imageUrl, quillImageUrl } = jsonData;

    // MongoDB에 저장
    await saveToMongoDB({ username, title, ideaId: selectedIdeaId, textContent: textEditorContent, imageUrl, quillImageUrl });

    return NextResponse.json({ message: '펀딩 정보가 성공적으로 저장되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('MongoDB에 데이터 저장 중 오류 발생:', error);
    return NextResponse.json({ error: '데이터를 저장하는 중에 오류가 발생했습니다.' }, { status: 500 });
  } 
}

async function saveToMongoDB(data: { username: string; title:string; ideaId: string; textContent: string; imageUrl: string; quillImageUrl: string }) { 
  const { username, title, ideaId, textContent, imageUrl, quillImageUrl } = data;
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

  await client.db('eoddb').collection('funding').insertOne({ 
    username, 
    title,
    ideaId, 
    textContent, 
    imageUrl, 
    quillImageUrl,
    addDate: formattedDateTime 
  });
}