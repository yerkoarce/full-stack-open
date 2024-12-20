const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const { body, user } = req

  if (!user) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  // Se guarda el blog
  const savedBlog = await blog.save()
  // También se debe guardar el ID de la nota que recién se guardó en el array del usuario
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()


  res.status(201).json(savedBlog)
})

blogsRouter.patch('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(updatedBlog)
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    if (blog) {
      res.json(blog)
    } else {
      res.status(404).end()
    }
})

blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if(!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  if(blog.user.toString() !== decodedToken.id) {
    return res.status(401).json({
      error: 'user not authorized to delete this blog'
    })
  }

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()

  
})

module.exports = blogsRouter