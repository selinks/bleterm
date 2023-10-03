const { goto } = require('./cursor');

/**
 * Clears the screen (does not reset cursor position)
 * @param  {void}
 * @return {void}
 */
function clear() {
  process.stdout.write('\033[2J');
}

/**
 * Clears the screen and resets cursor to origin
 * @param  {void}
 * @return {void}
 */
function reset() {
  goto(0, 0);
  clear();
}

/**
 * Gets the width of the terminal screen
 * @param  {void}
 * @return {number} the width
 */
function getWidth() {
  return process.stdout.columns;
}

/**
 * Gets the height of the terminal screen
 * @param  {void}
 * @return {number} the height
 */
function getHeight() {
  return process.stdout.rows;
}

/**
 * Clears the current line from the cursor position to the end of the screen
 * @param  {void}
 * @return {void}
 */
function clearLineToEnd() {
  process.stdout.write('\033[K');
}

module.exports = {
  clear,
  reset,
  getWidth,
  getHeight,
  clearLineToEnd,
};
