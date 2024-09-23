import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TileParamPipe implements PipeTransform {
  transform(value: any) {
    const { x, y, z } = value;
    value.x = Number(x);
    value.y = Number(y);
    value.z = Number(z);
    return value;
  }
}
