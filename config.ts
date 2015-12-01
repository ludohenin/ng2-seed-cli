import * as extend from 'extend';
import {existsSync, readFileSync} from 'fs';
import {join} from 'path';
import {debug, log} from './utils';
require('colors');


export let DEBUG = false;
export const CWD                      = process.cwd();
export const PROGRAM_DIR              = __dirname;
export const REPLACE_FILE_PATTERN     = '__FILENAME__';
export const REPLACE_FOLDER_PATTERN   = '__FOLDERNAME__';
export const PACKAGE_NAME             = 'ng2-seed-cli';
export const PROJECT_CONFIG_FILENAME  = 'package.json';
export const PROJECT_CONFIG_FILE      = join(CWD, PROJECT_CONFIG_FILENAME);
export const PROJECT_CONFIG_NAMESPACE = 'ng2-seed-cli';
export const TEMPLATES_DIR            = join(PROGRAM_DIR, 'templates');

export const DEFAULT_CONFIG = {
  project_base : 'app',
  templates: {
    cmp: {
      folder_name: 'components',
      suffix_name: 'cmp'
    },
    service: {
      folder_name: 'services',
      suffix_name: 'service'
    },
    directive: {
      folder_name: 'directives',
      suffix_name: 'directive'
    }
  }
};

export const PROJECT_CONFIG: any = (function initConfig(): void {
  const CUSTOM_CONFIG = loadProjectConfig();
  return extend(true, PROJECT_CONFIG, DEFAULT_CONFIG, CUSTOM_CONFIG);
}());


// ----------------
// Utils.
function loadProjectConfig(): any {
  isCwdProjectRoot();
  let config = readFileSync(PROJECT_CONFIG_FILE).toString();
  return JSON.parse(config)[PROJECT_CONFIG_NAMESPACE];
}

function isCwdProjectRoot() {
  if (!existsSync(PROJECT_CONFIG_FILE)) {
    log(`Project configuration file '${PROJECT_CONFIG_FILENAME}' doesn't exist.`.red);
    debug(`Trying to load ${PROJECT_CONFIG_FILE}`);
    process.exit(1);
  }
}
