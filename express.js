const express = require('express'),
  http = require('http'),
  port = 4343,
  app = express();

app.use('/react-dropdown-now/', express.static(__dirname + '/docs'));

http.createServer(app).listen(port);

console.log(`[...] http://localhost:${port}/react-dropdown-now/`);
