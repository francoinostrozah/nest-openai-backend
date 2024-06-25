import OpenAI from 'openai';
import * as fs from 'fs';

interface Options {
  prompt?: string;
  imageFile: Express.Multer.File;
}

const convertToBase64 = (file: Express.Multer.File) => {
  const data = fs.readFileSync(file.path);
  const base64 = Buffer.from(data).toString('base64');
  return `data:image/${file.mimetype.split('/')[1]};base64,${base64}`;
};

export const imageToTextUseCase = async (
  openai: OpenAI,
  { prompt, imageFile }: Options,
) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo', // 'gpt-4-vision-preview'
    max_tokens: 1000,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: prompt ?? 'Que logras ver en la imagen?',
          },
          // {
          //   type: 'image_url',
          //   image_url: {
          //     url: '',
          //   },
          // },
          {
            type: 'image_url',
            image_url: {
              url: convertToBase64(imageFile),
            },
          },
        ],
      },
    ],
  });

  return { message: response.choices[0].message.content };
};
