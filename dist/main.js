"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const express_1 = require("express");
async function bootstrap() {
    const nestApp = await core_1.NestFactory.create(app_module_1.AppModule);
    nestApp.enableCors();
    nestApp.use((0, express_1.json)({ limit: '50mb' }));
    nestApp.use((0, express_1.urlencoded)({
        limit: '50mb',
        extended: false,
    }));
    nestApp.useStaticAssets('resource', { prefix: '/' });
    nestApp.listen(3000).then(() => {
        common_1.Logger.log(`服务已经启动,接口请访问:http://wwww.localhost:${3000}`, 'NestApplication');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map