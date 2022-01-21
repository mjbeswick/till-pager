const express = require('express');
const gun = require('gun');

const app = express();
var port = process.env.PORT || 8090;
app.use(gun.serve);

const server = app.listen(port, () => {
  console.log('Listening at: http://localhost://' + port);
});

gun({ web: server, radisk:false });
