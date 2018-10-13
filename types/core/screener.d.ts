import { VisualRegressionTool, VisualRegressionToolConfig } from "../compiler/types";
export default class Screener implements VisualRegressionTool {
    config: VisualRegressionToolConfig;
    constructor(config: any);
    run(): Promise<string>;
}
