import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from 'next';

const openai = new OpenAI({
  apiKey : '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',
  organization: 'org-ecDIbKJfKgK760bFCUKIsBJU',
  dangerouslyAllowBrowser: true,
});

export default async function GptSetting(req: NextApiRequest, res: NextApiResponse) {

    const { question } = req.body;


      const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: question }],
        stream: true,
        temperature : 1.0,
        max_tokens : 100,
      });
      let result = '';
      for await (const chunk of stream) {
        result += chunk.choices[0]?.delta?.content || "";

      res.status(200).json({ response: result });

  }}