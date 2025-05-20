const noble = require('@stoprocent/noble');

const bleNusServiceUUID  = '6e400001b5a3f393e0a9e50e24dcca9e';
const bleNusCharRXUUID   = '6e400002b5a3f393e0a9e50e24dcca9e';
const bleNusCharTXUUID   = '6e400003b5a3f393e0a9e50e24dcca9e';

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
  const tx = characteristics[1];

  // data callback receives notifications
  rx.on('data', (data, isNotification) => {
    console.log(`Received: "${data}"`);
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
  let count = 0;
  setInterval(() => {
    count++;
    const message = Buffer.from(`hello, ble ${count}`, 'utf-8');
    console.log(`Sending:  '${message}'`);
    tx.write(message);
  }, 5000);
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

noble.on('stateChange', (state) => {
  if (state === 'poweredOn') {
    console.log('Scanning');
    noble.startScanning([bleNusServiceUUID], false); 
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', (peripheral) => {
  // connect to the first peripheral that is scanned
  noble.stopScanning();
  const name = peripheral.advertisement.localName;
  console.log(`Connecting to '${name}' ${peripheral.id}`);
  connectAndSetUp(peripheral);
});




