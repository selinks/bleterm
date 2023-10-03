const cursor = require('./cursor');
const screen = require('./screen');

/**
 * Waits some time before continuing
 * @param  {number} ms the amount of time to wait before continuing
 * @return {void}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Prints the argument without a newline
 * @param  {string} str the argument to print
 * @return {void}
 */
function print(str) {
  process.stdout.write(String(str));
}

/**
 * Prints at the bottom of the screen (debugging purposes)
 * @param  {any} output the value to be printed
 * @param  {number} atRow (optional) the row to print at (default: 30)
 * @param  {number} length (optional) the number of lines to clear below (default: 10)
 * @return {void}
 */
function printDebug(output, atRow=30, length=10) {
  cursor.save();
  cursor.goto(atRow, 0);
  for (let x = 0; x < length; x++) {
    screen.clearLineToEnd();
    cursor.down(1);
  }

  cursor.goto(atRow, 0);

  if (typeof output === 'object') {
    process.stdout.write(JSON.stringify(output, null, 2));
  } else {
    process.stdout.write(String(output));
  }
  cursor.restore();
}

/**
 * Returns a random integer between low and high inclusive
 * @param  {number} low the lower bound of the random number
 * @param  {number} high the higher bound of the random number
 * @return {number} the randomly generated int
 */
function randomInt(low, high) {
  return Math.floor(Math.random() * high) + low;
}

module.exports = {
  sleep,
  print,
  randomInt,
  printDebug,
}
