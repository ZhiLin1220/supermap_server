"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3mService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let S3mService = class S3mService {
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
    getLogin() {
        return { random: '1076950594441511', jsessionID: '1689177580' };
    }
    postLogin() {
        return { postResultType: 'CreateChild', succeed: true };
    }
    getConfig(scene) {
        const filePath = (0, path_1.join)(process.cwd(), 'resource/S3M', scene, `${scene}.scp`);
        const fileContent = (0, fs_1.readFileSync)(filePath, 'utf8');
        return JSON.parse(fileContent);
    }
    getAttribute(scene) {
        const filePath = (0, path_1.join)(process.cwd(), 'resource/S3M', scene, 'attribute.json');
        const fileContent = (0, fs_1.readFileSync)(filePath, 'utf8');
        return JSON.parse(fileContent);
    }
    getS3MFIle(scene, fileName) {
        const filePath = (0, path_1.join)(process.cwd(), 'resource/S3M', scene, `${fileName}.s3mb`);
        const file = (0, fs_1.createReadStream)(filePath);
        return new common_1.StreamableFile(file);
    }
    getTextureFIle(scene, fileName) {
        const path = (0, path_1.join)(process.cwd(), 'resource/S3M', scene, 'Texture', `${fileName}.dxtz`);
        const file = (0, fs_1.createReadStream)(path);
        return new common_1.StreamableFile(file);
    }
};
exports.S3mService = S3mService;
exports.S3mService = S3mService = __decorate([
    (0, common_1.Injectable)()
], S3mService);
//# sourceMappingURL=s3m.service.js.map