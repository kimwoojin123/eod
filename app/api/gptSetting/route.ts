import OpenAI from "openai";
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey : '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',
  organization: 'org-ecDIbKJfKgK760bFCUKIsBJU',
  dangerouslyAllowBrowser: true,
});

export async function POST(req:NextRequest) {
      const formData = await req.formData()
      const question = formData.get('question')

      const userQuestion = question ? String(question) : '';

      const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userQuestion }],
        stream: true,
        temperature : 1.0,
        max_tokens : 100,
      });

      let result = '';
      for await (const chunk of stream) {
        result += chunk.choices[0]?.delta?.content || "";
      }
      console.log('OpenAI 응답:', result); // 응답을 로그에 출력

      return NextResponse.json({result}, {status:200})
  }