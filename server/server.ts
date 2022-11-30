import express from 'express';
import cors from 'cors';
// const mhdData = require('./assets/mhdzastavky.geojson');
var fs = require('fs');

const app = express();

app.get('/api/mhd', cors(), function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  fs.createReadStream('./assets/mhdzastavky.geojson').pipe(res);
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