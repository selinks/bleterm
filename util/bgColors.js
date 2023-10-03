
/**
 * Gets the background color from the 256-bit color palette
 * @param  {number} id color code (0-256)
 * @return {string} the ansi escape sequence for the color
 */
function color256(id) {
  // for more details: https://bit.ly/2Frk4JR
  return '\033[48;5;' + id + 'm';
}

module.exports = {
  black: '\033[40;1m',
  red: '\033[41;1m',
  green: '\033[42;1m',
  yellow: '\033[43;1m',
  blue: '\033[44;1m',
  magenta: '\033[45;1m',
  cyan: '\033[46;1m',
  white: '\033[47;1m',

  color256,
}
