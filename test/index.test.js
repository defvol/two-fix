const TaskManager = require('../lib/index')
const test = require('tape')

const host = process.env.ES_HOST
const manager = new TaskManager({ host })

test('importTasks', function (t) {
  var tasks = [{ a: 1 }, { b: 2 }]
  manager.initIndex()
    .then(() => manager.importTasks(tasks))
    .then((res) => t.equal(res.items.length, 2, '2 tasks were imported'))
    .then(t.end)
    .catch(t.end)
})
