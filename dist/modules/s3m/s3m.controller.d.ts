import { S3mService } from './s3m.service';
export declare class S3mController {
    private readonly s3mService;
    constructor(s3mService: S3mService);
    getLicense(): {
        iServerStandard: boolean;
        iServerSpatialProcessing: boolean;
        iServerThreeddesigner: boolean;
        iServerSpatialStreaming: boolean;
        iServerPlot: boolean;
        iServerTrafficTransfer: boolean;
        iServerSpatial: boolean;
        iServerProfessional: boolean;
        iServerSituationEvolution: boolean;
        iServerBasic: boolean;
        iServerChart: boolean;
        iServerServiceNodeAddition: boolean;
        trialVersion: boolean;
        iServerGeoBlockchain: boolean;
        iServerSpaceBasic: boolean;
        iServerNetwork: boolean;
        builder: {};
        iServerImage: boolean;
        iServerEnterprise: boolean;
        iServerSpace: boolean;
        productType: string;
    };
    getLogin(): {
        iServerStandard: boolean;
        iServerSpatialProcessing: boolean;
        iServerThreeddesigner: boolean;
        iServerSpatialStreaming: boolean;
        iServerPlot: boolean;
        iServerTrafficTransfer: boolean;
        iServerSpatial: boolean;
        iServerProfessional: boolean;
        iServerSituationEvolution: boolean;
        iServerBasic: boolean;
        iServerChart: boolean;
        iServerServiceNodeAddition: boolean;
        trialVersion: boolean;
        iServerGeoBlockchain: boolean;
        iServerSpaceBasic: boolean;
        iServerNetwork: boolean;
        builder: {};
        iServerImage: boolean;
        iServerEnterprise: boolean;
        iServerSpace: boolean;
        productType: string;
    };
    postLogin(): {
        postResultType: string;
        succeed: boolean;
    };
    getConfig(param: any): string;
    getAttribute(param: any): any;
    getS3MFIle(param: any): import("@nestjs/common").StreamableFile;
    getTextureFIle(param: any): import("@nestjs/common").StreamableFile;
}
