import { Controller, Post, UseInterceptors, UploadedFiles, HttpCode, HttpStatus } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { throwServerError } from '@core/utils/error.handler';
import to from 'await-to-js';

@Controller()
export class UploadController {

  constructor(
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'chat', maxCount: 1 },
  ]))
  async uploadFile(@UploadedFiles() files: any) {
    const [error, result] = await to(this.uploadService.handleUploads(files));
    if (error) { return throwServerError(error); }
    return result;
  }

}
