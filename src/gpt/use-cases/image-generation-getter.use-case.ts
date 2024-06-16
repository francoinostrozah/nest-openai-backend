import * as path from 'path';
import * as fs from 'fs';
import { NotFoundException } from '@nestjs/common';

export const imageGenerationGetterUseCase = async (fileName: string) => {
  const filePath = path.resolve(
    __dirname,
    '../../../generated/images',
    `${fileName}`,
  );

  const wasFound = fs.existsSync(filePath);

  if (!wasFound) throw new NotFoundException(`File ${fileName} not found`);

  return filePath;
};
