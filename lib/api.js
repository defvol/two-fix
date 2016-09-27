const express = require('express')
const app = express()
const TaskManager = require('../lib/index')
const split = require('split')
const through2 = require('through2')

const host = process.env.ES_HOST
const port = process.env.PORT || 3000
const manager = new TaskManager({ host })

manager.initIndex()

app.get('/', function (req, res) {
  manager.getTasks()
  .then((tasks) => res.send(tasks))
})

app.post('/tasks', function (req, res) {
  var count = 0
  var counter = through2(function (chunk, enc, next) {
    this.push(chunk)
    if (chunk.length) count++
    next()
  })

  req.pipe(split()).pipe(counter)
  .on('data', (chunk) => null)
  .on('end', () => res.end(`received ${count} tasks`))
})

app.listen(port, () => console.log(`listening on port ${port}`))
