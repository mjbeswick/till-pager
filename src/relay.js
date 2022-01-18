const express = require('express');
const gun = require('gun');

const app = express();
var port = process.env.PORT || 8081;
app.use(gun.serve);

const server = app.listen(port, () => {
  console.log('Listening at: http://localhost://' + port);
});

gun({ web: server, localStorage: false, radisk: false });
