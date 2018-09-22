'use strict';

import { ScreenerLoggerOptions } from "../../compiler/types"
import { createLogger , format, transports, LoggerOptions } from "winston";

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//

/**
 *
 * @param formatConfig
 */
function configToFormat(formatConfig) {
    switch (formatConfig) {
        case 'json':
            return format.json();

        default:
            throw new Error('Unsupported WinstonJS format.');
    }
}

/**
 *
 * @param transportConfig
 *
 * @return {LoggerOptions.transports}
 */
function configToTransport(transportConfig) {

    return new transports.File();
}

/**
 *
 * @param {ScreenerLoggerOptions} config
 *
 * @return {LoggerOptions}
 */
function screenerToLogger(config) {
    let options: LoggerOptions = {
        level: config.level
    };

    options.format = configToFormat(config.format);
    options.transports = [];

    config.transports.forEach((transport) => {
        // options.transports.push(configToTransport(transport));
    });

    return options;
}

const create = function createWinston(config) {
    const logger = createLogger(screenerToLogger(config));
    if (process.env.NODE_ENV !== 'production') {
        logger.add(new transports.Console({
            format: format.simple()
        }));
    }

    return logger;
};

module.exports = create;