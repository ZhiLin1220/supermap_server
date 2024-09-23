import { Module } from '@nestjs/common';
import { S3mModule } from './modules/s3m/s3m.module';
import { TileModule } from './modules/tile/tile.module';

@Module({
  imports: [S3mModule, TileModule],
})
export class AppModule {}
