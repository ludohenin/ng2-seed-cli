import * as program from 'commander';


program
  .version('0.0.0')
  .option('-d, --debug', 'Activate debug mode (default: false)')
  .command('new <tpl_name> <cmp_name>', 'some desc.');

program.parse(process.argv);
