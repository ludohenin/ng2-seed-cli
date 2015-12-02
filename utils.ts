import {join} from 'path';
import {CWD, PROJECT_CONFIG, TEMPLATES_DIR} from './config';
require('colors');


const DEBUG = true;

export function log(...args) {
  console.log('error: '.red, ...args);
}

export function debug(...args) {
  if (!DEBUG) return;
  console.log('info: ', ...args);
}

export function getSettings(tpl, path) {
  tpl  = tpl.toLowerCase();
  path = path.toLowerCase();
  let mappedName = mapName(tpl, path);

  const SELECTOR       = mappedName.name;
  const FOLDER_NAME    = SELECTOR.replace('-', '_');
  const ASSET_PATH     = join(mappedName.path, FOLDER_NAME);
  const DEST_PATH      = join(PROJECT_CONFIG.project_base, mappedName.path);
  const DEST_PATH_ABS  = join(CWD, DEST_PATH);
  const FILE_NAME      = `${FOLDER_NAME}_${tpl}`;
  const CLASS_NAME     = classifyName(FILE_NAME);
  const TEMPLATE_SRC   = join(TEMPLATES_DIR, tpl, '**/*');

  debug('SELECTOR: ', SELECTOR);
  debug('FOLDER_NAME: ', FOLDER_NAME);
  debug('ASSET_PATH: ', ASSET_PATH);
  debug('DEST_PATH: ', DEST_PATH);
  debug('DEST_PATH_ABS: ', DEST_PATH_ABS);
  debug('FILE_NAME: ', FILE_NAME);
  debug('CLASS_NAME: ', CLASS_NAME);
  debug('TEMPLATE_SRC: ', TEMPLATE_SRC);

  return {
    SELECTOR,
    FOLDER_NAME,
    ASSET_PATH,
    DEST_PATH,
    DEST_PATH_ABS,
    FILE_NAME,
    CLASS_NAME,
    TEMPLATE_SRC
  };
}

function classifyName(name: string): string {
  return name.toLowerCase()
    .replace(/[-_\.]+/g, ' ')
    .trim()
    .replace(/[^\w\s]/g, '')
    .replace(/^./, $1 => $1.toUpperCase())
    .replace(/ (.)/g, $1 => $1.toUpperCase())
    .replace(/ /g, '' );
}

interface IMappedName {
  name: string;
  path: string;
};

function mapName(tpl: string, _name: string): IMappedName {
  let frags = _name.split('/');
  let name = frags.pop();
  let path = getPath();

  return {name, path};

  function getPath(): string {
    // TODO: Make configurable (do we enforce components structure ?).
    //       enforcement would allow cmd: ng2-seed new cmp blog/pages/menu
    let base = PROJECT_CONFIG['templates']['cmp']['folder_name'];
    if (frags.length < 1) {
      return base;
    } else {
      return join(base, frags.join(`/`));
    }
  }
}
