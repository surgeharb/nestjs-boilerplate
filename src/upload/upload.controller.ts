import { Controller, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

const UPLOAD_FIELDS = [
  { name: 'chat', maxCount: 1 },
];

@Controller()
export class UploadController {

  constructor(
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor(UPLOAD_FIELDS))
  async uploadFile(@UploadedFiles() files: any) {
    return this.uploadService.handleUploads(files);
  }

}
