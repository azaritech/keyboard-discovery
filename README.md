# keyboard-discovery
Discover ALSA Digital Keyboard connection port.

## Install

```bash
npm install keyboard-discovery
```

## Usage example

```bash
const result = require('keyboard-discovery');

result.getPort(() => {
  console.log(result.port);
});
```