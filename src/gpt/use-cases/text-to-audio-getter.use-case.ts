import * as path from 'path';
import * as fs from 'fs';
import { NotFoundException } from '@nestjs/common';

export const textToAudioGetterUseCase = async (fileId: string) => {
  const filePath = path.resolve(
    __dirname,
    '../../../generated/audio',
    `${fileId}.mp3`,
  );

  const wasFound = fs.existsSync(filePath);

  if (!wasFound) throw new NotFoundException(`File ${fileId} not found`);

  return filePath;
};
