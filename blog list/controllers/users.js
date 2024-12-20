const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// get
usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).select('name username id blogs').populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  res.json(users)
})

// Crear usuario
usersRouter.post('/', async (req, res) => {
  const body = req.body

  const saltRounds = 10 
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    name: body.name,
    username: body.username,
    passwordhash: passwordHash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

module.exports = usersRouter
