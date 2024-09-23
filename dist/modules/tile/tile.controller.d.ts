import { TileService } from './tile.service';
import { Response } from 'express';
interface TileParam {
    x: number;
    y: number;
    z: number;
}
export declare class TileController {
    private readonly tileService;
    constructor(tileService: TileService);
    getTile(tileParam: TileParam, param: Record<string, any>, res: Response): void;
}
export {};
