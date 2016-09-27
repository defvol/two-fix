const server = require('../lib/api').server
const request = require('supertest')
const test = require('tape')

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

test('teardown', function (t) {
  server.close()
  t.end()
})
