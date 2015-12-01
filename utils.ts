require('colors');


const DEBUG = true;

export function log(...args) {
  console.log('error: '.red, ...args);
}

export function debug(...args) {
  if (!DEBUG) return;
  console.log('info: ', ...args);
}
