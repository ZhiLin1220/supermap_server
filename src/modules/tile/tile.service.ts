import { Injectable } from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';
import { readFileSync, openSync, readSync, closeSync, existsSync } from 'fs';
import { join } from 'path';
import * as sharp from 'sharp';

interface TileContext {
  bundleFileName: string;
  StorageFormat: string;
  bundlxFileName?: string;
  index: number;
}
@Injectable()
export class TileService {
  private rootPath: string = join(process.cwd(), `./resource`);
  private buffer256: Buffer;
  private buffer512: Buffer;
  constructor() {
    // this.rootPath = process.cwd().includes('dist')
    //   ? join(process.cwd(), `../resource`)
    //   : join(process.cwd(), `./resource`);
    this.createImageBuffer(256);
    this.createImageBuffer(512);
  }

  // 获取瓦片，使用 XYZ 坐标系
  public getTile(layer: string, x: number, y: number, z: number) {
    try {
      const { CacheStorageInfo, TileCacheInfo } = this.getCacheConfFile(layer);
      const { PacketSize, StorageFormat } = CacheStorageInfo;
      const { TileRows } = TileCacheInfo;
      if (StorageFormat === 'esriMapCacheStorageModeCompactV2') {
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
        return this.readTileFromBundleV2(context);
      }
      if (StorageFormat === 'esriMapCacheStorageModeExploded') {
        const tileSize = TileRows;
        return this.readTileFromDisk(layer, x, y, z, tileSize);
      }
    } catch (err) {
      console.error('Error reading tile:', err);
    }
  }

  /**
   *  生成透明图片buffer
   * @param width
   * @param height
   * @returns
   */
  private async createImageBuffer(size: number) {
    const png = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .png()
      .toBuffer();
    if (size === 256) {
      this.buffer256 = png;
    }
    if (size === 512) {
      this.buffer512 = png;
    }
  }

  /**
   * 返回空的瓦片
   * @param size
   * @returns
   */
  private returnEmptyTile(size: number) {
    switch (size) {
      case 256:
        return this.buffer256;
      case 512:
        return this.buffer512;

      default:
        break;
    }
  }

  /**
   * 从磁盘读取读取瓦片
   * @param context
   */
  private readTileFromDisk(
    layer: string,
    x: number,
    y: number,
    z: number,
    tileSize: number,
  ) {
    const tilePath = this.getDiskTilePath(layer, z, x, y);
    if (!tilePath) {
      const tileData = this.returnEmptyTile(tileSize);
      return { bytesRead: tileData.length, buffer: tileData };
    }
    const tileData = readFileSync(tilePath);
    return { bytesRead: tileData.length, buffer: tileData };
  }

  /**
   *从bundleV2读取瓦片
   * @param context
   * @returns
   */
  private readTileFromBundleV2(context: TileContext) {
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

    return join(this.rootPath, `tile/${layer}/_alllayers/L${l}/R${r}C${c}`);
  }

  /**
   * 获取离散瓦片在磁盘上的路径
   * @param layer
   * @param level
   * @param x
   * @param y
   * @returns
   */
  private getDiskTilePath(
    layer: string,
    level: number,
    x: number,
    y: number,
  ): string | null {
    const l = level.toString().padStart(2, '0');
    const r = y.toString(16).padStart(8, '0');
    const c = x.toString(16).padStart(8, '0');
    const tilePath = join(
      this.rootPath,
      `tile/${layer}/_alllayers/L${l}/R${r}/C${c}`,
    );
    if (existsSync(tilePath + '.jpg')) {
      return tilePath + '.jpg';
    }
    if (existsSync(tilePath + '.png')) {
      return tilePath + '.png';
    }
    return null;
  }

  /**
   * 读取缓存信息配置文件
   * @param layer
   * @returns
   */
  private getCacheConfFile(layer: string) {
    const filePath = join(this.rootPath, `tile/${layer}/Conf.xml`);
    const confFile = readFileSync(filePath, { encoding: 'utf8' });
    const parser = new XMLParser();
    const options = parser.parse(confFile);
    return options.CacheInfo;
  }
}
