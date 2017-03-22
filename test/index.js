const result = require('../lib');

result.getPort(() => {
  console.log(result.port);
});