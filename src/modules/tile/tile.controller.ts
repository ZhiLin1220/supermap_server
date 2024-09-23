import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { TileService } from './tile.service';
import { Response } from 'express';
import { TileParamPipe } from '../tileParam.pipe';

interface TileParam {
  x: number;
  y: number;
  z: number;
}

@Controller()
export class TileController {
  constructor(private readonly tileService: TileService) {}

  @Get('getTile/:layer')
  getTile(
    @Query(TileParamPipe) tileParam: TileParam,
    @Param() param: Record<string, any>,
    @Res() res: Response,
  ) {
    const { x, y, z } = tileParam;
    const { layer } = param;
    const { bytesRead, buffer } = this.tileService.getTile(layer, x, y, z)!;
    // 返回图片数据
    res.setHeader('Content-Type', 'image/png'); // 根据你的实际图片类型设置
    res.setHeader('Content-Length', bytesRead);
    res.send(buffer); // 直接发送二进制数据
  }
}
