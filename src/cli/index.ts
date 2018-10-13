#!/usr/bin/env node
"use strict";

import * as program from "commander";
import { readFileSync } from "fs";
import { join, resolve } from "path";
import { VisualRegressionToolConfig } from "../compiler/types";
import Screener from "../core/screener";
import ScreenerConfig from "../core/screener-config";
import packageRoot from "../util/root-directory";

const packageInfo = JSON.parse(readFileSync(join(packageRoot, "package.json"), {encoding: "utf8"}));

program
    .version(packageInfo.version, "-v, --version")
    .description(packageInfo.description)
    .usage("command [options]");

program.command("run")
    .description("Run the ScreenerJS test suite.")
    .option(
        "--step <step>",
        "A single step to run. Defaults to all.",
        /^(all|screenshots|comparisons|compressions|reports)$/i,
        "all",
    )
    .option("-c, --config <config>", "Path to the config.", "screener.json")
    .action((options) => {
        const configAbsolutePath: string = resolve(options.config);
        const step: string = options.step;

        // @todo: Replace with winston logging.
        process.stdout.write("Command: Run\n");
        process.stdout.write(`    Path to config: ${configAbsolutePath}\n`);
        process.stdout.write(`    Step: ${step}\n`);

        let rawConfig = {};
        try {
            rawConfig = JSON.parse(readFileSync(configAbsolutePath, {encoding: "utf8"}));
        } catch (error) {
            if ("ENOENT" === error.code) {
                process.stderr.write(`The config file could not be opened.\n`);
            } else if ("SyntaxError" === error.name) {
                process.stderr.write(`The config is not a valid json file.\n`);
            } else {
                process.stderr.write(`${error.message}\n`);
            }

            process.exit(1);
        }

        const config: VisualRegressionToolConfig = new ScreenerConfig(rawConfig);
        const ScreenerJS = new Screener(config);

        ScreenerJS.run()
            .then((message) => {
                process.stdout.write(`${message}\n`);
            })
            .catch((error) => {
                process.stderr.write(`${error.message}\n`);
            });
    });

program.parse(process.argv);

if (!program.args.length) {
    program.help();
}
