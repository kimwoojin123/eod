import OpenAI from "openai";


const openai = new OpenAI({
    apiKey : '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',
    organization: 'org-ecDIbKJfKgK760bFCUKIsBJU',
    dangerouslyAllowBrowser: true,
});

export async function gptSetting(question: string) {
    try {
      const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
        stream: true,
      });
  
      let result = '';
      for await (const chunk of stream) {
        result += chunk.choices[0]?.message?.content || '';
      }
  
      return result;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

