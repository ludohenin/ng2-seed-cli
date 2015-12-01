import {existsSync} from 'fs';
import * as plugins from 'gulp-load-plugins';
import * as gulp from 'gulp';
import {join, resolve} from 'path';
import {CWD, DEFAULT_FILENAME} from '../config';

// Force typescript to emit this module call.
require('colors');

let $ = <any>plugins();

export function newTemplate(tpl: string, name: string) {
  name = name.trim().toLowerCase();
  let target = getTargetInfo(name);
  const TARGET_NAME = target.targetname;
  const FILENAME = TARGET_NAME.replace('-', '_');
  const PATH = join(CWD, target.path);

  // specific to components.
  const TARGET_CLASS = classifyName(`${FILENAME}-${tpl}`);
  const SRC = resolve(__dirname,  '..', 'templates', tpl, '**/*');

  console.log('CWD: ' + CWD);
  console.log('SRC: ' + SRC);
  console.log('TARGET_NAME: ' + TARGET_NAME);
  console.log('PATH: ' + PATH);
  console.log('FILENAME: ' + FILENAME);
  console.log('TARGET_CLASS: ' + TARGET_CLASS);

  if (existsSync(join(PATH, FILENAME))) {
    console.log(`Component ${FILENAME} already exist, add -f to force override`.red);
    return;
  }

  gulp.src(SRC)
    .pipe($.template({
      TARGET_NAME,
      TARGET_CLASS,
      FILENAME
    }))
    .pipe(_renamePlugin(FILENAME))
    .pipe(gulp.dest(PATH));
}

/**
 * Tansform a string into PascalCase.
 * #example: my.string-to_transfrom => MyStringToTransfrom
 */
function classifyName(name: string): string {
  return name.toLowerCase()
    .replace(/[-_\.]+/g, ' ')
    .trim()
    .replace(/[^\w\s]/g, '')
    .replace(/^./, $1 => $1.toUpperCase())
    .replace(/ (.)/g, $1 => $1.toUpperCase())
    .replace(/ /g, '' );
}

function getTargetInfo(name: string): {
  targetname: string;
  path: string;
} {
  let frags: string[] = name.split('/');
  let targetname: string = frags.pop();
  let path: string = getPath(frags);

  return {targetname, path};

  function getPath(pathFrags: string[]): string {
    if (frags.length < 1) {
      return '';
    } else {
      return join(...frags);
    }
  }
}

function _renamePlugin(name) {
  console.log('--------------------');
  let through = require('through2');
  return through.obj(function(file, enc, cb) {
    file.path = file.path.replace(new RegExp(DEFAULT_FILENAME, 'g'), name);
    cb(null, file);
  });
}
