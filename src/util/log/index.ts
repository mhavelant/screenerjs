"use strict";

// @todo: Add a way so this is configurable easily.
// const loadLogger = function loadLogger(settings) {
//     if ('winston' === settings.library) {
//         return require('./winston')(settings.config);
//     }
//
//     throw new Error('Invalid log library.');
// };

const level = ((process.env.NODE_ENV !== "production") ? "debug" : "error");

import { createLogger , format, transports } from "winston";

const logger = createLogger({
    exitOnError: false,
    format: format.json(),
    level,
    silent: false,
    transports: [
        new transports.Console(),
    ],
});

module.exports = logger;
