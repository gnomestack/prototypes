import { readFile } from 'node:fs';
import { Platform } from './functions.js';

export function getVersion(): string {
    let version = require('./package.json').version;
    // Node allows for the version to be prefixed by a "v", while semver doesn't.
    // If there is a v, strip it off.
    if (version.indexOf('v') === 0) {
        version = version.slice(1);
    }
    return version;
}

export function getPlatform(): Platform {
    let platform: Platform = 'linux';
    switch(process.platform) {
        case 'win32':
            platform = 'windows';
            break;
        default:
            platform = process.platform as Platform;
            break;
    }
    return platform;
}