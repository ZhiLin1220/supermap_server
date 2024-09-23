export declare class TileService {
    constructor();
    getTile(layer: string, x: number, y: number, z: number): {
        bytesRead: number;
        buffer: Buffer;
    };
    private readTileFromBundle;
    private readTile;
    private getBundlePath;
    private getCacheConfFile;
}
