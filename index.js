const express = require('express')
const app = express()
const port = 3000
const router = require('./router/index')
require('dotenv').config();

app.use('/', router)

app.listen(port, () => {
  console.warn(`Listening on http://localhost:${port}`)
  console.warn(`We are hacker broo`)
})