/*
Edit the app.js file for your app :)
*/

const keypress = require('keypress');
const { sleep, print } = require('./util/misc');
const colors = require('./util/colors');
const screen = require('./util/screen');
const { setup, loop, onKeyPress, onMouseClick } = require('./app');

keypress(process.stdin);

process.stdin.on('keypress', function (ch, key) {
  const char = key ? key.name : ch;

  if (char === 'escape') {
    process.exit()
  }
  
  onKeyPress(key ? key.sequence : ch);
  //console.log(ch);
  //console.log(key);
  //console.log(char);
  //console.log(key.sequence.charCodeAt(0)); 'backspace' - PyTTY 127 works, Termux - 127 doesn't work
  
  if (char === 'return') {
    print('\r');
    print('\n');
    return;
  }  
  
  if (char == 'backspace') {
    print("\b \b");
    return;
  }
  
  print(key ? key.sequence : ch);
});

//keypress.enableMouse(process.stdout);


/*process.stdin.on('mousepress', function ({
  x,
  y,
  scroll,
}) {
  onMouseClick({
    row: y,
    col: x,
    scroll,
  });
});*/

process.on('exit', function () {
  //keypress.disableMouse(process.stdout);
  print('\r');
  print('\n');
});

process.stdin.setRawMode(true);
process.stdin.resume();

(async () => {
  try {
    process.stdout.write(colors.reset)
    screen.reset();
    
    await setup();

    while (true) {
      await loop();
      await sleep(1);
    }
  } catch(e) {
    process.stdout.write(colors.reset)
    console.log(e)
  }
})();

