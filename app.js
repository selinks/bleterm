const char = require('./util/characters');
const { sleep, print, randomInt, printDebug } = require('./util/misc');
const screen = require('./util/screen');
const cursor = require('./util/cursor');
const colors = require('./util/colors');
const fileIO = require('./util/fileIO');

const noble = require('@stoprocent/noble');
const bleNusServiceUUID  = '6e400001b5a3f393e0a9e50e24dcca9e';
const bleNusCharRXUUID   = '6e400002b5a3f393e0a9e50e24dcca9e';
const bleNusCharTXUUID   = '6e400003b5a3f393e0a9e50e24dcca9e';
//Connect to d8ad0dc6c2b1

let tx;

// this function is run once at the beginning of your program
async function setup() {
  await sleep(0); // keep this line

  noble.on('discover', (peripheral) => {
    // connect to the first peripheral that is scanned
    noble.stopScanning();
    const name = peripheral.advertisement.localName;
    console.log(`Connecting to '${name}' ${peripheral.id}`);
    connectAndSetUp(peripheral);
  });

  noble.on('stateChange', (state) => {
    if (state === 'poweredOn') {
      console.log('Scanning');
      noble.startScanning([bleNusServiceUUID], false); 
    } else {
      noble.stopScanning();
    }
  });
}

// this function is run repeatedly at the interval chosen
async function loop() {
  await sleep(100); // feel free to change the number
  // but dont get rid of the `sleep` outright
}

// this function will fire anytime a key is pressed
function onKeyPress(key) {
  //print(key);
  const message = Buffer.from(key, 'utf-8');
  tx.write(message);
}

/*
  this function will fire anytime the mouse is clicked on the terminal

  the `event` param is an object with the following properties:
  * row (number) - the row coordinate of the click event
  * col (number) - the column coordinate of the click event
  * scroll (number) - is `1` if scrolling down, `-1` if scrolling up
*/
//function onMouseClick(event) {
//  
//}

function onServicesAndCharacteristicsDiscovered (
  error,
  services,
  characteristics
) {
  if (error) {
    console.error(error);
    return;
  }

  console.log('Discovered services and characteristics');
  const rx = characteristics[0];
  tx = characteristics[1];

  // data callback receives notifications
  rx.on('data', (data, isNotification) => {
    //console.log(`Received: "${data}"`);
    print(`${data}`);
    //console.log(`${data}`);
  });

  // subscribe to be notified whenever the peripheral update the characteristic
  rx.subscribe((error) => {
    if (error) {
      console.error('Error subscribing to rx');
    } else {
      console.log('Subscribed for rx notifications');
    }
  });

  // create an interval to send data to the service
 /* let count = 0;
  setInterval(() => {
    count++;
    const message = Buffer.from(`hello, ble ${count}`, 'utf-8');
    console.log(`Sending:  '${message}'`);
    tx.write(message);
  }, 5000);*/
}

function connectAndSetUp (peripheral) {
  peripheral.connect((error) => {
    if (error) {
      console.error(error);
      return;
    }

    console.log('Connected to', peripheral.id);

    // specify the services and characteristics to discover
    const serviceUUIDs = [bleNusServiceUUID];
    const characteristicUUIDs = [bleNusCharRXUUID, bleNusCharTXUUID];

    peripheral.discoverSomeServicesAndCharacteristics(
      serviceUUIDs,
      characteristicUUIDs,
      onServicesAndCharacteristicsDiscovered
    );
  });

  peripheral.on('disconnect', () => console.log('disconnected'));
}

module.exports = {
  setup,
  loop,
  onKeyPress,
  //onMouseClick,
}
