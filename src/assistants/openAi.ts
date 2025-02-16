import 'dotenv/config'
import OpenAI from "openai";

const openai = new OpenAI();

export const query = async (context: string, prompt: string) => await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
        {
            "role": "system",
            "content": [
                {
                    "type": "text",
                    "text": context
                }
            ]
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": prompt
                }
            ]
        }
    ],
    response_format: {
        "type": "json_object"
    },
    temperature: 1,
    max_completion_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
});

export async function image(prompt: string) {
    const start = new Date()
    console.log('Generating image...')
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: '1792x1024',
        style: 'vivid',
        quality: 'hd'
        //  response_format: 'b64_json'
    });
    console.log(`Generated image, took ${(new Date().getTime() - start.getTime()) / 1000}s`)
    return response.data[0].url
}

