import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('upload')
export class UploadController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Thư mục lưu trữ hình ảnh
        filename: (req, file, callback) => {
          const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File, @Body('name') name: string) {
    if (!file) {
      throw new BadRequestException('Không có tệp nào được tải lên.');
    }

    return {
      url: `/uploads/${file.filename}`, // Trả về URL của hình ảnh
    };
  }
}
