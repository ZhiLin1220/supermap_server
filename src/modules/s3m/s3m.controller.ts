import { Controller, Get, Param, Post } from '@nestjs/common';
import { S3mService } from './s3m.service';
const commonPath: string = '/rest/realspace/datas';
@Controller()
export class S3mController {
  constructor(private readonly s3mService: S3mService) {}

  /**
   * 获取许可
   * @returns
   */
  @Get(`manager/license.json`)
  getLicense() {
    return this.s3mService.getLicense();
  }

  /**
   * get方法获取login.json
   * @returns
   */
  @Get(`/rest/realspace/login.json`)
  getLogin() {
    return this.s3mService.getLicense();
  }
  /**
   * post方法获取login.json
   * @returns
   */
  @Post(`/rest/realspace/login.json`)
  postLogin() {
    return this.s3mService.postLogin();
  }

  /**
   * 获取配置文件
   * @param param
   * @returns
   */
  @Get(`${commonPath}/:scene/config`)
  getConfig(@Param() param: any): string {
    const { scene } = param;
    return this.s3mService.getConfig(scene);
  }

  /**
   * 获取缓存文件(包含材质)
   * @param param
   * @returns
   */
  @Get(`${commonPath}/:scene/data/path/:path/:fileName`)
  getCacheFile(@Param() param: any) {
    const { scene, path, fileName } = param;
    return this.s3mService.getCacheFile(scene, path, fileName);
  }

  /**
   * 获取根目录下的其他文件
   * @param param
   * @returns
   */
  @Get(`${commonPath}/:scene/data/path/:fileName`)
  getOtherFile(@Param() param: any) {
    const { scene, fileName } = param;
    return this.s3mService.getOtherFile(scene, fileName);
  }
}
