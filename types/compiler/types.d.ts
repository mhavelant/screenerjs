import * as Transport from "winston-transport";
export interface VisualRegressionToolConfig {
    id: string;
    baseDir: string;
    type: string;
    steps?: ScreenerSteps;
}
export interface VisualRegressionTool {
    config: VisualRegressionToolConfig;
}
export interface ScreenerSteps {
    screenshots?: ScreenerScreenshots;
    comparisons?: ScreenerComparisons;
    compressions?: ScreenerCompressions;
    reports?: ScreenerReports[];
}
export interface ScreenerScreenshots {
    engine: string;
}
export interface ScreenerComparisons {
    engine: string;
}
export interface ScreenerCompressions {
    engine: string;
}
export interface ScreenerReports {
    engine: string;
}
export interface ScreenerLoggerOptions {
    level: string;
    format?: string;
    transports?: Transport[];
}
