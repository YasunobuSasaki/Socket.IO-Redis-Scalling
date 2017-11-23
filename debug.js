const io = require('socket.io-client');
const socket = io('http://localhost:3000', {
  path: ''
});

const key   = process.argv[2];

socket.on('connect', () => {
  console.log(`connected, id: ${socket.id}`);
  socket.emit('join', key);
});
socket.on('message', (data) => {
  console.log(data);
});
socket.on('error', (err) => {
  console.log('Error:', err);
});
socket.on('disconnect', () => {
  console.log('disconnected');
});
