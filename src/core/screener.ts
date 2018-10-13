"use strict";

import { inspect } from "util";
import { VisualRegressionTool, VisualRegressionToolConfig } from "../compiler/types";

export default class Screener implements VisualRegressionTool {
    public config: VisualRegressionToolConfig;

    public constructor(config) {
       this.config = config;
    }

    public async run() {
        process.stdout.write(`ScreenerJS is running.\n`);
        process.stdout.write(`Configuration:.\n`);
        process.stdout.write(`${inspect(this.config)}\n`);
        return "Hello world.";
    }

}
