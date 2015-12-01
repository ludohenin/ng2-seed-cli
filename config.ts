import {join} from 'path';

// Could be configured from the project repo.
export const DEFAULT_FILENAME = '__FILENAME__';
export const APP_SRC = 'app';

export const TEMPLATES = join(__dirname, 'templates');
export const CWD = process.cwd();
export const APP_SRC_ABS = join(CWD, 'APP_SRC');
