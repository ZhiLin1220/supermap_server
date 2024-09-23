"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3mController = void 0;
const common_1 = require("@nestjs/common");
const s3m_service_1 = require("./s3m.service");
const commonPath = 'rest/realspace';
let S3mController = class S3mController {
    constructor(s3mService) {
        this.s3mService = s3mService;
    }
    getLicense() {
        return this.s3mService.getLicense();
    }
    getLogin() {
        return this.s3mService.getLicense();
    }
    postLogin() {
        return this.s3mService.postLogin();
    }
    getConfig(param) {
        const { scene } = param;
        return this.s3mService.getConfig(scene);
    }
    getAttribute(param) {
        const { scene } = param;
        return this.s3mService.getAttribute(scene);
    }
    getS3MFIle(param) {
        const { scene, S3MPath1, S3MPath2 } = param;
        return this.s3mService.getS3MFIle(scene, S3MPath1 + `/` + S3MPath2);
    }
    getTextureFIle(param) {
        const { scene, fileName } = param;
        return this.s3mService.getTextureFIle(scene, fileName);
    }
};
exports.S3mController = S3mController;
__decorate([
    (0, common_1.Get)(`manager/license.json`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], S3mController.prototype, "getLicense", null);
__decorate([
    (0, common_1.Get)(`${commonPath}/login.json`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], S3mController.prototype, "getLogin", null);
__decorate([
    (0, common_1.Post)(`${commonPath}/login.json`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], S3mController.prototype, "postLogin", null);
__decorate([
    (0, common_1.Get)(`${commonPath}/:scene/config`),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], S3mController.prototype, "getConfig", null);
__decorate([
    (0, common_1.Get)(`${commonPath}/:scene/data/path/attribute.json`),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], S3mController.prototype, "getAttribute", null);
__decorate([
    (0, common_1.Get)(`${commonPath}/:scene/data/path/:S3MPath1/:S3MPath2.s3mb`),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], S3mController.prototype, "getS3MFIle", null);
__decorate([
    (0, common_1.Get)(`${commonPath}/:scene/data/path/Texture/:fileName.dxtz`),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], S3mController.prototype, "getTextureFIle", null);
exports.S3mController = S3mController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [s3m_service_1.S3mService])
], S3mController);
//# sourceMappingURL=s3m.controller.js.map