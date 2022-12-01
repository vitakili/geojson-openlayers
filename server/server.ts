import express from 'express';
import cors from 'cors';
import path from 'path';
// const mhdData = require('./assets/mhdzastavky.geojson');
var fs = require('fs');

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api/mhd', cors(), function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  fs.createReadStream('./assets/mhdzastavky.geojson').pipe(res);
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);

// import express from 'express';
// import cors from 'cors';
// const mhdData = require('./assets/mhdzastavky.geojson');

// const app = express();

// app.get('/api/mhd', cors(), (req, res) => {
//   res.json(mhdData);
// });

// const port = 5000;

// app.listen(port, () => `Server running on port ${port}`);