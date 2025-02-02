const express = require('express');
const app = express();
const port = 3000;
const router = require('./router/index');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use('/image', express.static('public/image'));
app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.warn(`Listening on http://localhost:${port}`);
});
