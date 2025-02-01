const express = require('express');
const app = express();
const port = 3000;
const router = require('./router/index');
const cors = require('cors');
require('dotenv').config();

// Mengizinkan semua origin dengan CORS
app.use(cors());

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.warn(`Listening on http://localhost:${port}`);
});
