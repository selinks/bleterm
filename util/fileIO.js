const util = require('util');
const fs = require('fs');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

/**
 * Reads the contents of a file
 * @param  {string} fileName the name of the file to read
 * @return {string} the contents of the file
 */
async function readFile(fileName) {
  try {
    const content = await readFileAsync(fileName);
    return content.toString();
  } catch (e) {
    throw e;
  }
}

/**
 * Writes some data to a file (erases previous content)
 * @param  {string} fileName the name of the file to write to
 * @param  {string} content content to be written to the file
 * @return {void}
 */
async function writeFile(fileName, content) {
  try {
    await writeFileAsync(fileName, content);
  } catch(e) {
    throw e;
  }
}

/**
 * Appends to a file (adds to previous content)
 * @param  {string} fileName the name of the file to append to
 * @param  {string} content content to be written to the file
 * @return {void}
 */
async function appendFile(fileName, content) {
  try {
    await appendFileAsync(fileName, content);
  } catch (e) {
    throw e;
  }
}

module.exports = {
  readFile,
  writeFile,
  appendFile,
}
