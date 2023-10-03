/**
 * Goes to a specific location on the screen
 * @param  {number} row the row to move the cursor to
 * @param  {number} col the column to move the cursor to
 * @return {void}
 */
function goto(row, col) {
  process.stdout.write('\033[' + row + ';' + col + 'H');
}
/**
 * Goes to a specific column in the current row
 * @param  {number} col the column to move the cursor to
 * @return {void}
 */
function gotoColumn(col) {
  process.stdout.write('\033[' + col + 'G');
}

/**
 * Moves the cursor some number of characters down
 * @param  {number} amt to move down by
 * @return {void}
 */
function down(amt) {
  process.stdout.write('\033[' + amt + 'B');
}

/**
 * Moves the cursor some number of characters up
 * @param  {number} amt to move up by
 * @return {void}
 */
function up(amt) {
  process.stdout.write('\033[' + amt + 'A');
}

/**
 * Moves the cursor some number of characters right
 * @param  {number} amt to move right by
 * @return {void}
 */
function right(amt) {
  process.stdout.write('\033[' + amt + 'C');
}

/**
 * Moves the cursor some number of characters left
 * @param  {number} amt to move left by
 * @return {void}
 */
function left(amt) {
  process.stdout.write('\033[' + amt + 'D');
}

/**
 * Saves the cursor's position.  Used with `.restore()`
 * @param  {void}
 * @return {void}
 */
function save() {
  process.stdout.write('\033[s');
}

/**
 * Restores the cursor's last saved position.  Used with `.save()`
 * @param  {void}
 * @return {void}
 */
function restore() {
  process.stdout.write('\033[u');
}

/**
 * Hides the cursor
 * @param  {void}
 * @return {void}
 */
function hide() {
  process.stdout.write('\033[?25l');
}

/**
 * Shows the cursor (if hidden)
 * @param  {void}
 * @return {void}
 */
function show() {
  process.stdout.write('\033[?25h');
}

module.exports = {
  goto,
  gotoColumn,
  down,
  up,
  right,
  left,
  save,
  restore,
  hide,
  show,
};
