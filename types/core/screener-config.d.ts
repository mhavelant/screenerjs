import { ScreenerSteps, VisualRegressionToolConfig } from "../compiler/types";
export default class ScreenerConfig implements VisualRegressionToolConfig {
    protected static validateConfig(config: any): boolean;
    protected static processSteps(steps: any): any;
    id: string;
    type: string;
    baseDir: string;
    steps?: ScreenerSteps;
    constructor(config: any);
}
