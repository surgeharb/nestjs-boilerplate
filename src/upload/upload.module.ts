import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { MULTER_CONFIG } from '@core/config/multer.config';
import * as multer from 'multer';

const storage = multer.diskStorage(MULTER_CONFIG);

@Module({
  imports: [MulterModule.register({ storage })],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
