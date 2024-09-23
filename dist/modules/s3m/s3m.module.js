"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3mModule = void 0;
const common_1 = require("@nestjs/common");
const s3m_service_1 = require("./s3m.service");
const s3m_controller_1 = require("./s3m.controller");
let S3mModule = class S3mModule {
};
exports.S3mModule = S3mModule;
exports.S3mModule = S3mModule = __decorate([
    (0, common_1.Module)({
        controllers: [s3m_controller_1.S3mController],
        providers: [s3m_service_1.S3mService],
    })
], S3mModule);
//# sourceMappingURL=s3m.module.js.map