import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class S3mService {
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
    const filePath = join(process.cwd(), 'resource/S3M', scene, `${scene}.scp`);
    const fileContent = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent); // 返回 JSON 数据
  }
  /**
   * 获取属性表
   * @param scene
   * @returns
   */
  getAttribute(scene: string) {
    const filePath = join(
      process.cwd(),
      'resource/S3M',
      scene,
      'attribute.json',
    );
    const fileContent = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent); // 返回 JSON 数据
  }
  /**
   * 获取S3M文件
   * @param scene
   * @param fileName
   * @returns
   */
  getS3MFIle(scene: string, fileName: string) {
    const filePath = join(
      process.cwd(),
      'resource/S3M',
      scene,
      `${fileName}.s3mb`,
    );
    const file = createReadStream(filePath);
    return new StreamableFile(file);
  }
  /**
   * 获取贴图文件
   * @param scene
   * @param fileName
   * @returns
   */
  getTextureFIle(scene: string, fileName: string) {
    const path = join(
      process.cwd(),
      'resource/S3M',
      scene,
      'Texture',
      `${fileName}.dxtz`,
    );
    const file = createReadStream(path);
    return new StreamableFile(file);
  }
}
