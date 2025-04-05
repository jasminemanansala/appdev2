const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('start', () => {
  console.log('Application Started!');
});
emitter.on('data', (data) => {
  console.log('Data received:', data);
});

emitter.emit('start');
emitter.emit('data', { name: 'John Doe', age: 25 });


emitter.on('error', (error) => {
  console.log('Error occurred:', error);
});

emitter.emit('error', 'Unable to connect to database.');
