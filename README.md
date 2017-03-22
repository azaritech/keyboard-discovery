# keyboard-discovery
Discover ALSA Digital Keyboard connection port.

## Usage example

```bash
const result = require('keyboard-discovery');

result.getPort(() => {
  console.log(result.port);
});
```