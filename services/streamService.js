import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config(); 

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL:"https://openrouter.ai/api/v1"
});

export async function streamService(req,res) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
     res.setHeader('Cache-Control', 'no-cache');
    try {
        const { message } = req.body;
        const stream = await openai.chat.completions.create({
          model: 'deepseek/deepseek-r1-0528:free',
          messages: [
            { role: 'system', content: 'You are a Cat Expert. Remember to give short concise answers not long texts.' },
            { role: 'user',  content: message }
          ],
          stream: true
        });

        for await ( const part of stream) {
            const chunk = part.choices[0].delta.content;
            chunk ? res.write(chunk) : ""
        }

        res.end();
    }
    catch (error) {
        console.log("Error in GPT Stream")
        res.status(500).json({ error: `Error in GPT Stream ${error}`})
        res.end()
    }

}
