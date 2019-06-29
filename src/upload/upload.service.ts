import { Injectable, UploadedFiles } from '@nestjs/common';

@Injectable()
export class UploadService {

  public async handleUploads(@UploadedFiles() files: any[]) {
    return {};
  }

}
