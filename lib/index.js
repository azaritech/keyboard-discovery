'use strict';

const spawn = require('child_process').spawn;
const aconnect = spawn('aconnect', ['-l']);
const grepA = spawn('grep', ['client']);
const grepB = spawn('grep', ['Digital Keyboard']);
let result = '';

aconnect.stdout.on('data', (data) => {
  grepA.stdin.write(data);
});

aconnect.stderr.on('data', (data) => {
  console.log(`ps stderr: ${data}`);
});

aconnect.on('close', (code) => {
  if (code !== 0) {
    console.log(`ps process exited with code ${code}`);
  }
  grepA.stdin.end();
});


grepA.stdout.on('data', (data) => {
  grepB.stdin.write(data);
});

grepA.stderr.on('data', (data) => {
  console.log(`grep stderr: ${data}`);
});

grepA.on('close', (code) => {
  if (code !== 0) {
    console.log(`grep process exited with code ${code}`);
  }
  grepB.stdin.end();
});


grepB.stdout.on('data', (data) => {
  result = data.toString();
});

grepB.stderr.on('data', (data) => {
  console.log(`grep stderr: ${data}`);
});

module.exports.port = result; 

exports.getPort = (cb) => {
  grepB.on('close', (code) => {
    //const regex = new RegExp('[0-9]?[0-9]?\:[0-9]?[0-9]?');
    const regex = new RegExp('[0-9][0-9]?');
    result = result.match(regex)[0];
    cb(module.exports.port = result);
    if (code !== 0) {
      console.log(`grep process exited with code ${code}`);
    }
  });
};