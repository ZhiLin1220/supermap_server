import { Controller, Get, Param, Post } from '@nestjs/common';
import { S3mService } from './s3m.service';
const commonPath: string = 'rest/realspace';
@Controller()
export class S3mController {
  constructor(private readonly s3mService: S3mService) {}

  @Get(`manager/license.json`)
  getLicense() {
    return this.s3mService.getLicense();
  }

  @Get(`${commonPath}/login.json`)
  getLogin() {
    return this.s3mService.getLicense();
  }
  @Post(`${commonPath}/login.json`)
  postLogin() {
    return this.s3mService.postLogin();
  }

  @Get(`${commonPath}/:scene/config`)
  getConfig(@Param() param: any): string {
    const { scene } = param;
    return this.s3mService.getConfig(scene);
  }

  @Get(`${commonPath}/:scene/data/path/attribute.json`)
  getAttribute(@Param() param: any) {
    const { scene } = param;
    return this.s3mService.getAttribute(scene);
  }

  @Get(`${commonPath}/:scene/data/path/:S3MPath1/:S3MPath2.s3mb`)
  getS3MFIle(@Param() param: any) {
    const { scene, S3MPath1, S3MPath2 } = param;
    return this.s3mService.getS3MFIle(scene, S3MPath1 + `/` + S3MPath2);
  }
  @Get(`${commonPath}/:scene/data/path/Texture/:fileName.dxtz`)
  getTextureFIle(@Param() param: any) {
    const { scene, fileName } = param;
    return this.s3mService.getTextureFIle(scene, fileName);
  }
}
