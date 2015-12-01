import * as program from 'commander';
import {newTemplate} from './cmd/new';

program
  .version('0.0.0');


program
  .command('new <tpl_name> <cmp_name>')
  .action(newTemplate);


program.parse(process.argv);
