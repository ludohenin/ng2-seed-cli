import {existsSync} from 'fs';
import * as plugins from 'gulp-load-plugins';
import * as gulp from 'gulp';
import {join} from 'path';
import {REPLACE_FILE_PATTERN, REPLACE_FOLDER_PATTERN} from '../config';
import {getSettings, log} from '../utils';
require('colors');

let $ = <any>plugins();

export function CreateNewTemplate(tpl: string, path: string, options: any): void {

  let opts = getSettings(tpl, path);

  if (existsSync(join(opts.DEST_PATH_ABS, opts.FOLDER_NAME))) {
    log(`${opts.DEST_PATH}/${opts.FOLDER_NAME} already exist, add -f (--force) to force override it`.red);
    return;
  }
  if (existsSync(join(opts.DEST_PATH_ABS, opts.FILE_NAME, '.ts'))) {
    log(`${opts.DEST_PATH}/${opts.FILE_NAME}.ts already exist, add -f (--force) to force override it`.red);
    return;
  }

  gulp.src(opts.TEMPLATE_SRC)
    .pipe($.template(opts))
    .pipe(_renamePlugin(opts.FOLDER_NAME, opts.FILE_NAME))
    .pipe(gulp.dest(opts.DEST_PATH));
}

// ----------------
// Utils.
function _renamePlugin(folderName, fileName) {
  let through = require('through2');
  return through.obj(function(file, enc, cb) {
    file.path = file.path.replace(new RegExp(REPLACE_FILE_PATTERN, 'g'), fileName);
    file.path = file.path.replace(new RegExp(REPLACE_FOLDER_PATTERN, 'g'), folderName);
    cb(null, file);
  });
}
