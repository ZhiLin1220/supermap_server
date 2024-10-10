import { Injectable } from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';
import { readFileSync, openSync, readSync, closeSync, existsSync } from 'fs';
import { join } from 'path';

interface TileContext {
  bundleFileName: string;
  StorageFormat: string;
  bundlxFileName?: string;
  index: number;
}
@Injectable()
export class TileService {
  constructor() {}

  // 获取瓦片，使用 XYZ 坐标系
  public getTile(layer: string, x: number, y: number, z: number) {
    try {
      const { CacheStorageInfo } = this.getCacheConfFile(layer);
      const { PacketSize, StorageFormat } = CacheStorageInfo;
      const rGroup = Math.floor(y / PacketSize) * PacketSize;
      const cGroup = Math.floor(x / PacketSize) * PacketSize;
      const bundleBase = this.getBundlePath(layer, z, rGroup, cGroup);

      const bundleFileName = bundleBase + '.bundle';

      const context: TileContext = {
        bundleFileName,
        StorageFormat,
        index: 0,
      };
      context.index = PacketSize * (y - rGroup) + (x - cGroup);
      return this.readTileFromBundle(context);
    } catch (err) {
      console.error('Error reading tile:', err);
    }
  }

  /**
   *从bundle读取瓦片
   * @param context
   * @returns
   */
  private readTileFromBundle(context: TileContext) {
    const bundleFileName = context.bundleFileName;
    const index = context.index;
    try {
      if (!existsSync(bundleFileName)) {
        return { bytesRead: 0, buffer: Buffer.alloc(0) };
      }
      // 打开文件
      const fd = openSync(bundleFileName, 'r');
      // 创建一个缓冲区来读取数据
      const offsetBuffer = Buffer.alloc(4);
      // 从文件的指定位置开始读取数据，64 + 8 * index 是偏移量
      readSync(fd, offsetBuffer, 0, offsetBuffer.length, 64 + 8 * index);

      // 读取数据偏移
      const dataOffset = offsetBuffer.readInt32LE();

      // 读取瓦片数据长度（4 字节）
      const lengthBytes = Buffer.alloc(4);
      readSync(fd, lengthBytes, 0, lengthBytes.length, dataOffset - 4);

      const length = lengthBytes.readInt32LE();

      // 读取瓦片数据
      const tileData = Buffer.alloc(length);
      const bytesRead = readSync(fd, tileData, 0, tileData.length, dataOffset);
      // 关闭文件
      closeSync(fd);
      return { bytesRead, buffer: tileData };
    } catch (err) {
      console.error('Error reading tile:', err);
      throw err; // 如果发生错误，抛出异常
    }
  }

  /**
   * 获取构建缓存路径
   * @param root
   * @param level
   * @param rGroup
   * @param cGroup
   * @returns
   */
  private getBundlePath(
    layer: string,
    level: number,
    rGroup: number,
    cGroup: number,
  ): string {
    const l = level.toString().padStart(2, '0');
    const r = rGroup.toString(16).padStart(4, '0');
    const c = cGroup.toString(16).padStart(4, '0');

    return join(
      process.cwd(),
      `resource/tile/${layer}/_alllayers/L${l}/R${r}C${c}`,
    );
  }

  /**
   * 读取缓存信息配置文件
   * @param layer
   * @returns
   */
  private getCacheConfFile(layer: string) {
    const filePath = join(process.cwd(), `resource/tile/${layer}/Conf.xml`);
    const confFile = readFileSync(filePath, { encoding: 'utf8' });
    const parser = new XMLParser();
    const options = parser.parse(confFile);
    return options.CacheInfo;
  }
}
