import { StreamableFile } from '@nestjs/common';
export declare class S3mService {
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
        random: string;
        jsessionID: string;
    };
    postLogin(): {
        postResultType: string;
        succeed: boolean;
    };
    getConfig(scene: string): string;
    getAttribute(scene: string): any;
    getS3MFIle(scene: string, fileName: string): StreamableFile;
    getTextureFIle(scene: string, fileName: string): StreamableFile;
}
