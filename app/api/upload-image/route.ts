import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export async function POST(req: NextRequest) {
  try {
    const jsonData = await req.json(); // Parse JSON data from the request

    const { dataURL } = jsonData;
    const base64Data = dataURL.split(',')[1];
    const binaryData = Buffer.from(base64Data, 'base64');

    const params = {
      Bucket: process.env.S3_BUCKET_NAME || '',
      Key: `images/${uuidv4()}`, // S3에 저장될 파일 이름
      Body: binaryData,
      ContentType: 'image/jpeg', // 이미지 형식에 따라 조절
    };

    const uploadedImage = await s3.upload(params).promise();
    const imageUrl = uploadedImage.Location;
    
    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    return NextResponse.json({ error: 'Failed to upload image to S3' }, { status: 500 });
  }
}