import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class S3mService {
  private rootPath: string = process.cwd();
  constructor() {
    this.rootPath = process.cwd().includes('dist')
      ? join(process.cwd(), `../resource`)
      : join(process.cwd(), `./resource`);
  }
  /**
   * 获取许可
   * @returns
   */
  getLicense() {
    const license = {
      iServerStandard: true,
      iServerSpatialProcessing: true,
      iServerThreeddesigner: true,
      iServerSpatialStreaming: true,
      iServerPlot: true,
      iServerTrafficTransfer: true,
      iServerSpatial: true,
      iServerProfessional: true,
      iServerSituationEvolution: true,
      iServerBasic: true,
      iServerChart: true,
      iServerServiceNodeAddition: true,
      trialVersion: true,
      iServerGeoBlockchain: true,
      iServerSpaceBasic: true,
      iServerNetwork: true,
      builder: {},
      iServerImage: true,
      iServerEnterprise: true,
      iServerSpace: true,
      productType: 'iServer',
    };
    return license;
  }
  /**
   * 获取登录信息
   * @returns
   */
  getLogin() {
    return { random: '1076950594441511', jsessionID: '1689177580' };
  }

  postLogin() {
    return { postResultType: 'CreateChild', succeed: true };
  }
  /**
   * 获取配置文件
   * @param scene
   * @returns
   */
  getConfig(scene: string): string {
    const filePath = join(this.rootPath, 'S3M', scene, `${scene}.scp`);
    const fileContent = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent); // 返回 JSON 数据
  }
  /**
   * 获取属性表
   * @param scene
   * @returns
   */
  getCacheFile(scene: string, path: string, fileName: string) {
    let filePath: string = '';
    if (scene === path) {
      filePath = join(this.rootPath, 'S3M', scene, fileName);
    } else {
      filePath = join(this.rootPath, 'S3M', scene, path, fileName);
    }

    const file = createReadStream(filePath);
    return new StreamableFile(file);
  }
  /**
   * 获取其他文件
   * @param scene
   * @param fileName
   * @returns
   */
  getOtherFile(scene: string, fileName: string) {
    const filePath = join(this.rootPath, 'S3M', scene, fileName);
    const file = createReadStream(filePath);
    return new StreamableFile(file);
  }
}
