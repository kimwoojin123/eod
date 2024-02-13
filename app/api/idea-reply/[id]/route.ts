import { connectDB, closeConnection, client } from '../../../../utills/db';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function POST(req:NextRequest){
  try{
    connectDB();
    const path = req.nextUrl.pathname;
    const ideaId = path.split('/').pop();
    if (!ideaId) {
      throw new Error('Invalid id format');
    }
    const jsonData = await req.json();
    const { username, textContent } = jsonData;

    await saveToMongoDB({ideaId, username, textContent})

    return NextResponse.json({ message: '데이터가 성공적으로 저장되었습니다.' }, { status: 200 })
  } catch(error){
    return NextResponse.json({ error: '댓글을 업데이트하는 중에 오류가 발생했습니다.' }, { status: 500 });
  }
}


async function saveToMongoDB(data: { ideaId:string; username:string; textContent: string;}) {
  const { ideaId, username, textContent } = data;
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


  const replyResult = await client.db('eoddb').collection('reply').insertOne({
    ideaId,
    username,
    textContent,
    addDate: formattedDateTime,
  });

  const replyId = replyResult.insertedId;

  // ideas 컬렉션의 해당 아이디어의 replies 필드 업데이트
  await client.db('eoddb').collection('ideas').updateOne(
    { _id: new ObjectId(ideaId) },
    { $push: { replies: replyId } }
  );
}