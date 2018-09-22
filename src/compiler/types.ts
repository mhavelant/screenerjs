'use strict';

export interface ScreenerConfig {
    id: string,
    baseDir?: string,
    type?: string,
    steps?: ScreenerSteps
}

export interface ScreenerSteps {
    screenshots?: ScreenerScreenshots,
    comparisons?: ScreenerComparisons,
    compressions?: ScreenerCompressions,
    reports?: ScreenerReports
}

export interface ScreenerScreenshots {
}

export interface ScreenerComparisons {
}

export interface ScreenerCompressions {
}

export interface ScreenerReports {
}

export interface ScreenerLoggerOptions {
    level: string,
    format?: string,
    transports?: []
}
