const TaskManager = require('../lib/index')
const test = require('tape')

const host = process.env.ES_HOST
const manager = new TaskManager({ host })

test('setup', function (t) {
  manager.initIndex()
  .then(delay)
  .then(t.end)
})

test('import tasks', function (t) {
  var tasks = [ { a: 1 }, { b: 2 } ]
  manager.importTasks(tasks)
  .then(delay)
  .then((res) => t.equal(res.items.length, 2, '2 tasks were imported'))
  .then(t.end)
  .catch(t.end)
})

test('finds tasks', function (t) {
  manager.getTasks()
  .then((tasks) => t.equal(tasks.length, 2, '2 tasks were found'))
  .then(t.end)
  .catch(t.end)
})

test('teardown', function (t) {
  var params = { index: manager.index }
  manager.client.indices.delete(params)
  .then(t.pass)
  .catch(t.fail)
  .then(t.end)
})

/**
 * Add a small delay during initialization
 * Sometimes all tests will fail (apparently) due to cluster
 * resharding on the Elasticsearch local container.
 * This delay is a temp patch.
 */
function delay (args) {
  console.log('delay...')
  return new Promise(function (resolve) {
    setTimeout(() => resolve(args), 1500)
  })
}
