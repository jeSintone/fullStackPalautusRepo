const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of blogs', async () => {
	const response = await api.get('/api/blogs')

	assert.strictEqual(response.body.length, 2)
})

test('blog has id', async () => {
	const response = await api.get('/api/blogs')

	for (const blog of response.body) {
		assert.strictEqual(blog.hasOwnProperty('id'), true)
	}
})

after(async () => {
  await mongoose.connection.close()
})