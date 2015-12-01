import * as program from 'commander';
import {CreateNewTemplate} from '../lib/new';


program
  .option('-f, --force', 'force component installation if already exist.')
  .parse(process.argv);


let args = program.args;
const TEMPLATE_SRC_NAME = args[0];
const TEMPLATE_DEST_NAME = args[1];

CreateNewTemplate(TEMPLATE_SRC_NAME, TEMPLATE_DEST_NAME, program);
