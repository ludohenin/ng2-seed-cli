import {existsSync} from 'fs';
import * as plugins from 'gulp-load-plugins';
import * as gulp from 'gulp';
import {join} from 'path';
import {
  PROJECT_CONFIG,
  CWD,
  REPLACE_FILE_PATTERN,
  REPLACE_FOLDER_PATTERN,
  TEMPLATES_DIR
} from '../config';
import {debug, log} from '../utils';
require('colors');


let $ = <any>plugins();

export function CreateNewTemplate(tpl: string, path: string, options: any): void {
  path = path.toLowerCase();
  tpl  = tpl.toLowerCase();
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

  if (existsSync(join(DEST_PATH_ABS, FOLDER_NAME))) {
    log(`${DEST_PATH}/${FOLDER_NAME} already exist, add -f (--force) to force override it`.red);
    return;
  }
  if (existsSync(join(DEST_PATH_ABS, FILE_NAME, '.ts'))) {
    log(`${DEST_PATH}/${FILE_NAME}.ts already exist, add -f (--force) to force override it`.red);
    return;
  }

  gulp.src(TEMPLATE_SRC)
    .pipe($.template({
      ASSET_PATH,
      CLASS_NAME,
      DEST_PATH,
      DEST_PATH_ABS,
      FOLDER_NAME,
      FILE_NAME,
      SELECTOR
    }))
    .pipe(_renamePlugin(FOLDER_NAME, FILE_NAME))
    .pipe(gulp.dest(DEST_PATH));
}

// ----------------
// Utils.

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

function _renamePlugin(folderName, fileName) {
  let through = require('through2');
  return through.obj(function(file, enc, cb) {
    file.path = file.path.replace(new RegExp(REPLACE_FILE_PATTERN, 'g'), fileName);
    file.path = file.path.replace(new RegExp(REPLACE_FOLDER_PATTERN, 'g'), folderName);
    cb(null, file);
  });
}
