import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from "fs";

dotenv.config(); 

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL:"https://openrouter.ai/api/v1"
});

const systemPrompt = fs.readFileSync("./prompts/catExpert.md",'utf8')

export async function chatService(req,res) {
  
    try {
        const { message } = req.body;
        const response = await openai.chat.completions.create({
          model: 'deepseek/deepseek-r1-0528:free',
          messages: [
            { role: 'system', content: systemPrompt},
            { role: 'user',  content: message }
          ]
        });

        const reply = response.choices[0].message.content;
        return res.json({reply});
    }
    catch (error) {
        console.log("Error in GPT Call")
        return res.status(500).json({ error: `Something went wrong while generating chat reply ${error}`})
    }

}
