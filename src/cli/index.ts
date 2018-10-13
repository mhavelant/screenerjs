#!/usr/bin/env node
"use strict";

import * as program from "commander";
import { readFileSync } from "fs";
import { join, resolve } from "path";
import { inspect } from "util";
import { ScreenerConfig } from "../compiler/types";
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

        process.stdout.write("Command: Run");
        process.stdout.write(`    Path to config: ${configAbsolutePath}`);
        process.stdout.write(`    Step: ${step}`);

        try {
            const config: ScreenerConfig = JSON.parse(readFileSync(configAbsolutePath, {encoding: "utf8"}));
            process.stdout.write(inspect(config));

            // @todo: Process config.
            // @todo: Run tests.
        } catch (error) {
            if ("SyntaxError" === error.name) {
                process.stderr.write(`The config is not a valid json file.`);
            } else if ("ENOENT" === error.code) {
                process.stderr.write(`The config file could not be opened.`);
            } else {
                process.stderr.write(error.message);
            }

            process.exit(1);
        }
    });

program.parse(process.argv);

if (!program.args.length) {
    program.help();
}
