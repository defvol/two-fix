const fs = require('fs')
const path = require('path')
const request = require('supertest')
const server = require('../lib/api').server
const test = require('tape')

var unconnected = path.join(__dirname, 'fixtures/unconnected-highways.json')

test('GET /', function (t) {
  request(server)
  .get('/')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function (err, res) {
    t.deepEqual(res.body, [], 'empty array')
    t.end()
  })
})

test('POST /tasks', function (t) {
  request(server)
  .post('/tasks')
  .send(fs.readFileSync(unconnected).toString())
  .expect(200)
  .end(function (err, res) {
    t.error(err, 'no error')
    t.deepEqual(res.body, 'received 5573 tasks', 'returns count')
    t.end()
  })
})

test('teardown', function (t) {
  server.close()
  t.end()
})
