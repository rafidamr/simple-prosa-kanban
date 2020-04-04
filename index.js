const express = require('express')
const app = express()
const path = require('path')
const layout = require('express-layout')
const routes = require('./routes')
const bodyParser = require('body-parser')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const middleware = [
  layout(),
  express.static(path.join(__dirname, 'public_modules')),
  bodyParser.json({ type: 'application/json' }),
  bodyParser.urlencoded({ extended: false })
]

app.use(middleware)

app.use('/', routes)

app.use((req, res, next) => {
  res.status(404).send("404")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke')
})

app.listen(3000, () => {
  console.log(`App running at port 3000`)
})