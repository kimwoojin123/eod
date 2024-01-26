import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from 'next';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env' });

const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY,
    organization: 'org-ecDIbKJfKgK760bFCUKIsBJU',
    dangerouslyAllowBrowser: true,
});

export default async function GptSetting(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { question } = req.body;

    try {
      const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: question }],
        stream: true,
      });

      let result = '';
      for await (const chunk of stream) {
        result += chunk.choices[0]?.message?.content || '';
      }

      res.status(200).json({ response: result });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}