"use strict";

import { join } from "path";
import { ScreenerSteps, VisualRegressionToolConfig } from "../compiler/types";
import packageRoot from "../util/root-directory";

export default class ScreenerConfig implements VisualRegressionToolConfig {

    protected static validateConfig(config) {
        let isValid: boolean = true;
        if ("undefined" === typeof config.id) {
            isValid = false;
            process.stderr.write("The config key 'id' is required.\n");
        }

        return isValid;
    }

    protected static processSteps(steps) {
        // @todo: Add processing.
        // @todo: Make ScreenerSteps a class.
        // @todo: Add VisualRegressionToolSteps interface.
        return steps;
    }

    public id: string;
    public type: string;
    public baseDir: string;
    public steps?: ScreenerSteps;

    public constructor(config) {
        if (!ScreenerConfig.validateConfig(config)) {
            process.exit(1);
        }

        this.id = config.id;
        this.type = config.type || "a_b";
        this.baseDir = config.baseDir || join(packageRoot, "runtime");
        this.steps = config.steps && ScreenerConfig.processSteps(config.steps) || undefined;
    }

}
