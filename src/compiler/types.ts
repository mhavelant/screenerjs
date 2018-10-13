"use strict";

export interface ScreenerConfig {
    id: string;
    baseDir?: string;
    type?: string;
    steps?: ScreenerSteps;
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
    transports?: [];
}
