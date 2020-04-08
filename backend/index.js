const express = require('express')
const app = express()
const routes = require('./routes.js')

app.use(routes)
app.use(express.json())

const port = 3333
app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`)
})

