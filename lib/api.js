const express = require('express')
const app = express()
const TaskManager = require('../lib/index')

const host = process.env.ES_HOST
const port = process.env.PORT || 3000
const manager = new TaskManager({ host })

manager.initIndex()

app.get('/', function (req, res) {
  manager.getTasks()
  .then((tasks) => res.send(tasks))
})

app.listen(port, () => console.log(`listening on port ${port}`))
