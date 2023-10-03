/*
Available colors: (e.g. colors.yellow)
=================
  black
  red
  green
  yellow
  blue
  magenta
  cyan
  white

  bg.black
  bg.red
  bg.green
  bg.yellow
  bg.blue
  bg.magenta
  bg.cyan
  bg.white
  
  reset
*/

const bg = require('./bgColors');

/**
 * Gets the color from the 256-bit color palette
 * @param  {number} id color code (0-256)
 * @return {string} the ansi escape sequence for the color
 */
function color256(id) {
  // for more details: https://bit.ly/2Duoi1e
  return '\033[38;5;' + id + 'm';
}

module.exports = {
  black: '\033[30;1m',
  red: '\033[31;1m',
  green: '\033[32;1m',
  yellow: '\033[33;1m',
  blue: '\033[34;1m',
  magenta: '\033[35;1m',
  cyan: '\033[36;1m',
  white: '\033[37;1m',

  reset: '\033[0m',

  color256,

  bg,
};

