const es = require('elasticsearch')

module.exports = TaskManager

function TaskManager (opts) {
  var host = opts.host || 'localhost:9200'
  this.client = new es.Client({ host })
  this.index = opts.index || 'to-fix'
}

/**
 * Create default index if it doesn't exist already
 */
TaskManager.prototype.initIndex = function () {
  var client = this.client
  var index = this.index
  return new Promise(function (resolve, reject) {
    client.indices.exists({ index })
    .then((exists) => exists ? resolve() : exists)
    .then(() => client.indices.create({ index }))
    .catch(reject)
  })
}

/**
 * Import a bunch of tasks using bulk operations
 * Tasks added to the 'to-fix' index as type 'tasks' with automatic uids
 * @param {array} tasks
 * @return {promise} bulk
 */
TaskManager.prototype.importTasks = function (tasks) {
  var action = () => ({ index: { _index: this.index, _type: 'tasks' } })
  var body = tasks.reduce((p, c) => p.concat(action(), c), [])
  return this.client.bulk({ body })
}

/**
 * Just get a bunch of tasks
 * @return {array} tasks
 */
TaskManager.prototype.getTasks = function () {
  const client = this.client
  const index = this.index
  const tasks = (results) => results.hits.hits.map((h) => h._source)
  return new Promise(function (resolve, reject) {
    client.search({ index, q: '*' })
    .then((res) => resolve(tasks(res)))
    .catch(reject)
  })
}
