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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileService = void 0;
const common_1 = require("@nestjs/common");
const fast_xml_parser_1 = require("fast-xml-parser");
const fs_1 = require("fs");
const path_1 = require("path");
let TileService = class TileService {
    constructor() { }
    getTile(layer, x, y, z) {
        try {
            const { CacheStorageInfo } = this.getCacheConfFile(layer);
            const { PacketSize, StorageFormat } = CacheStorageInfo;
            const rGroup = Math.floor(y / PacketSize) * PacketSize;
            const cGroup = Math.floor(x / PacketSize) * PacketSize;
            const bundleBase = this.getBundlePath(layer, z, rGroup, cGroup);
            const bundleFileName = bundleBase + '.bundle';
            const context = {
                bundleFileName,
                StorageFormat,
                index: 0,
            };
            context.index = PacketSize * (y - rGroup) + (x - cGroup);
            return this.readTileFromBundle(context);
        }
        catch (err) {
            console.error('Error reading tile:', err);
        }
    }
    readTileFromBundle(context) {
        const bundleFileName = context.bundleFileName;
        const index = context.index;
        const fd = (0, fs_1.openSync)(bundleFileName, 'r');
        const offsetBuffer = Buffer.alloc(4);
        (0, fs_1.readSync)(fd, offsetBuffer, 0, offsetBuffer.length, 64 + 8 * index);
        const dataOffset = offsetBuffer.readInt32LE();
        const lengthOffset = dataOffset - 4;
        const tileData = this.readTile(bundleFileName, lengthOffset);
        return tileData;
    }
    readTile(bundleFileName, offset) {
        try {
            const fd = (0, fs_1.openSync)(bundleFileName, 'r');
            const lengthBytes = Buffer.alloc(4);
            (0, fs_1.readSync)(fd, lengthBytes, 0, lengthBytes.length, offset);
            const length = lengthBytes.readInt32LE();
            const tileData = Buffer.alloc(length);
            const bytesRead = (0, fs_1.readSync)(fd, tileData, 0, tileData.length, offset + 4);
            (0, fs_1.closeSync)(fd);
            return { bytesRead, buffer: tileData };
        }
        catch (err) {
            console.error('Error reading tile:', err);
            throw err;
        }
    }
    getBundlePath(layer, level, rGroup, cGroup) {
        const l = level.toString().padStart(2, '0');
        const r = rGroup.toString(16).padStart(4, '0');
        const c = cGroup.toString(16).padStart(4, '0');
        return (0, path_1.join)(process.cwd(), `resource/tile/${layer}/_alllayers/L${l}/R${r}C${c}`);
    }
    getCacheConfFile(layer) {
        const filePath = (0, path_1.join)(process.cwd(), `resource/tile/${layer}/Conf.xml`);
        const confFile = (0, fs_1.readFileSync)(filePath, { encoding: 'utf8' });
        const parser = new fast_xml_parser_1.XMLParser();
        const options = parser.parse(confFile);
        return options.CacheInfo;
    }
};
exports.TileService = TileService;
exports.TileService = TileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TileService);
//# sourceMappingURL=tile.service.js.map