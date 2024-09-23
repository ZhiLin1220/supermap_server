import { Module } from '@nestjs/common';
import { S3mService } from './s3m.service';
import { S3mController } from './s3m.controller';

@Module({
  controllers: [S3mController],
  providers: [S3mService],
})
export class S3mModule {}
