const { test, after, beforeEach} = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const helper = require('../utils/list_helper')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	let blogObject = new Blog(helper.initialBlogs[0])
	await blogObject.save()
	blogObject = new Blog(helper.initialBlogs[1])
	await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of blogs', async () => {
	const response = await api.get('/api/blogs')

	assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blog has id', async () => {
	const response = await api.get('/api/blogs')

	for (const blog of response.body) {
		assert.strictEqual(blog.hasOwnProperty('id'), true)
	}
})
test('a valid blog can be added', async () => {
	const newBlog = {
		title: "testi4.10tehtava",
		author: "TestaajaTessi",
		url: "www.supertesti.org",
		likes: 52,
	}
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
	const response = await api.get('/api/blogs')

	const contents = response.body.map(res => res.title)
	assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
	assert(contents.includes('testi4.10tehtava'))
})

after(async () => {
  await mongoose.connection.close()
})