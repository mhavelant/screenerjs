'use strict';

import { ScreenerConfig } from "../compiler/types";
import { readFileSync } from "fs";
import { inspect } from "util";
import { join, resolve } from "path";
import * as program from "commander";

const packageRoot = require('../util/root-directory');
const packageInfo = JSON.parse(readFileSync(join(packageRoot, 'package.json'), {encoding: 'utf8'}));

program
    .version(packageInfo.version, '-v, --version')
    .description(packageInfo.description)
    .usage('command [options]');

program.command('run')
    .description('Run the ScreenerJS test suite.')
    .option('--step <step>', 'A single step to run. Defaults to all.', /^(all|screenshots|comparisons|compressions|reports)$/i, 'all')
    .option('-c, --config <config>', 'Path to the config.', 'screener.json')
    .action((options) => {
        const configAbsolutePath: string = resolve(options.config);
        const step: string = options.step;

        console.log('Command: Run');
        console.log(`    Path to config: ${configAbsolutePath}`);
        console.log(`    Step: ${step}`);

        try {
            let config: ScreenerConfig = JSON.parse(readFileSync(configAbsolutePath, {encoding: 'utf8'}));
            console.log(inspect(config));

            // @todo: Process config.
            // @todo: Run tests.
        }
        catch (error) {
            if ('SyntaxError' === error.name) {
                console.error(`The config is not a valid json file.`);
            }
            else if ('ENOENT' === error.code) {
                console.error(`The config file could not be opened.`);
            }
            else {
                console.error(error.message);
            }

            process.exit(1);
        }
    });

program.parse(process.argv);

if (!program.args.length) {
    program.help();
}
